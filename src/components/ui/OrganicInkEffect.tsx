'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_progress;
  uniform float u_drainProgress;

  float hash(vec2 p) {
      p = fract(p * vec2(234.34, 435.345));
      p += dot(p, p + 34.23);
      return fract(p.x * p.y);
  }

  float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
      );
  }

  float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
      }
      return value;
  }

  void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      uv.y = 1.0 - uv.y; // Flip Y so 0 is top
      
      // Domain warping for organic wispy tendrils
      vec2 q = vec2(
          fbm(uv * 3.0 + u_time * 0.1),
          fbm(uv * 3.0 + vec2(5.2, 1.3) - u_time * 0.15)
      );
      
      vec2 r = vec2(
          fbm(uv * 2.0 + 4.0 * q + vec2(1.7, 9.2) + u_time * 0.1),
          fbm(uv * 2.0 + 4.0 * q + vec2(8.3, 2.8) - u_time * 0.12)
      );
      
      // Drain distortion
      vec2 warpedUV = uv;
      if (u_drainProgress > 0.0) {
          float centerX = abs(uv.x - 0.5);
          warpedUV.y -= u_drainProgress * (1.0 - centerX) * 2.5;
          // Pull towards center
          warpedUV.x += (uv.x > 0.5 ? -1.0 : 1.0) * u_drainProgress * 0.4 * uv.y;
      }
      
      float n = fbm(warpedUV * 2.0 + 4.0 * r);
      
      // Base threshold based on u_progress (0 to 1)
      // Scale so ink goes from completely off-screen top to completely covering
      float threshold = (u_progress * 2.0) - 0.5; 
      
      // Calculate ink field
      float inkField = (threshold - warpedUV.y) * 2.0 + n * 1.5;
      
      // Drain logic: subtract density from the bottom center if draining
      if (u_drainProgress > 0.0) {
          float drainMask = smoothstep(1.2, 0.4, uv.y + u_drainProgress * 0.5) * smoothstep(0.5, 0.0, abs(uv.x - 0.5));
          inkField -= drainMask * 5.0 * u_drainProgress;
      }

      // Smooth organic edge
      float alpha = smoothstep(0.1, 0.8, inkField);
      
      // Add extra density variation
      float densityVariation = smoothstep(0.2, 1.0, fbm(warpedUV * 5.0 - u_time * 0.2));
      alpha = min(alpha, alpha * (0.8 + 0.2 * densityVariation));
      
      // Maximum opacity is 0.92 to slightly tint the portrait behind it
      float finalAlpha = clamp(alpha, 0.0, 0.92); 
      
      // Emerald Noir luxury palette
      // Deep jewel-toned emerald: #062e22 -> #0d503f -> #147a5e
      float colorNoise = fbm(warpedUV * 4.0 + u_time * 0.05);
      vec3 deepEmerald  = vec3(0.024, 0.18, 0.13);   // #062e22 — deep noir base
      vec3 richEmerald  = vec3(0.05, 0.31, 0.25);    // #0d503f — jewel core
      vec3 brightEmerald = vec3(0.08, 0.48, 0.37);   // #147a5e — luminous accent
      vec3 inkColor = mix(deepEmerald, mix(richEmerald, brightEmerald, colorNoise * 0.5), colorNoise);
      
      // Pre-multiply alpha for WebGL
      gl_FragColor = vec4(inkColor * finalAlpha, finalAlpha);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function OrganicInkEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // We use alpha: true so the ivory background shows through the transparent parts of the canvas
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true });
    if (!gl) return;

    // Compile Shaders
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup Quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uProgress = gl.getUniformLocation(program, 'u_progress');
    const uDrainProgress = gl.getUniformLocation(program, 'u_drainProgress');

    // State
    const state = {
      progress: 0,
      drainProgress: 0,
    };

    // Resize Handler
    const handleResize = () => {
      // Use devicePixelRatio for crisp rendering on retina
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // GSAP ScrollTrigger Sequence
    // The effect spans the entire AboutHero section. We use a timeline to map scroll to our uniforms.
    const section = canvas.closest('section');
    if (section) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5, // Smooth scrubbing
        },
      });

      // 0% to 70% of the section scroll: Ink spreads and fills (u_progress: 0 -> 1)
      tl.to(state, {
        progress: 1,
        ease: 'power2.inOut',
        duration: 0.7,
      });

      // 70% to 100% of the section scroll: Ink drains (u_drainProgress: 0 -> 1)
      tl.to(state, {
        drainProgress: 1,
        ease: 'power2.inOut',
        duration: 0.3,
      });
    }

    // Render Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const render = (now: number) => {
      const time = (now - startTime) * 0.001; // Seconds

      gl.uniform1f(uTime, time);
      gl.uniform1f(uProgress, state.progress);
      gl.uniform1f(uDrainProgress, state.drainProgress);

      // Clear with transparent
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      ScrollTrigger.getAll().forEach(t => t.trigger === section ? t.kill() : null);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 5, // Behind the text (which we will set to higher z-index)
      }}
    />
  );
}
