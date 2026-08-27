'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const dotInnerRef = useRef<HTMLDivElement>(null);
  // Use refs instead of state to avoid re-renders on every mouse event
  const isVisibleRef = useRef(false);
  const isHoveringRef = useRef(false);
  // Track elements that already have listeners to prevent leak
  const trackedElements = useRef(new WeakSet<Element>());

  const updateVisibility = useCallback((visible: boolean) => {
    if (isVisibleRef.current === visible) return;
    isVisibleRef.current = visible;
    if (cursorRef.current) {
      cursorRef.current.style.opacity = visible ? '1' : '0';
    }
    if (cursorDotRef.current) {
      cursorDotRef.current.style.opacity = visible ? '1' : '0';
    }
  }, []);

  const updateHoverState = useCallback((hovering: boolean) => {
    if (isHoveringRef.current === hovering) return;
    isHoveringRef.current = hovering;
    if (cursorInnerRef.current) {
      cursorInnerRef.current.style.width = hovering ? '56px' : '36px';
      cursorInnerRef.current.style.height = hovering ? '56px' : '36px';
      cursorInnerRef.current.style.borderWidth = hovering ? '1px' : '1.5px';
      cursorInnerRef.current.style.background = hovering ? 'rgba(13, 79, 79, 0.06)' : 'transparent';
    }
    if (dotInnerRef.current) {
      dotInnerRef.current.style.width = hovering ? '4px' : '5px';
      dotInnerRef.current.style.height = hovering ? '4px' : '5px';
    }
  }, []);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) updateVisibility(true);

      // Dot follows immediately
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Circle follows with delay
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const handleMouseEnterInteractive = () => updateHoverState(true);
    const handleMouseLeaveInteractive = () => updateHoverState(false);
    const handleMouseLeave = () => updateVisibility(false);
    const handleMouseEnter = () => updateVisibility(true);

    const addListenersToElement = (el: Element) => {
      if (trackedElements.current.has(el)) return;
      trackedElements.current.add(el);
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    };

    const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Track interactive elements
    document.querySelectorAll(INTERACTIVE_SELECTOR).forEach(addListenersToElement);

    // MutationObserver — only add listeners to NEW elements, using WeakSet guard
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.matches(INTERACTIVE_SELECTOR)) {
              addListenersToElement(node);
            }
            node.querySelectorAll(INTERACTIVE_SELECTOR).forEach(addListenersToElement);
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
      // Note: listeners on interactive elements are cleaned up automatically
      // when elements are removed from the DOM or when the page unloads
    };
  }, []); // No dependencies — setup once

  return (
    <>
      {/* Outer circle */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
      >
        <div
          ref={cursorInnerRef}
          className="rounded-full border transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 36,
            height: 36,
            borderColor: 'rgba(13, 79, 79, 0.5)',
            borderWidth: 1.5,
            background: 'transparent',
          }}
        />
      </div>
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
      >
        <div
          ref={dotInnerRef}
          className="rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
          style={{
            width: 5,
            height: 5,
            background: 'var(--deep-teal)',
          }}
        />
      </div>
    </>
  );
}
