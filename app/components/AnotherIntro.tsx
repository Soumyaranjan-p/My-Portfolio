'use client';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function IntroLoader() {
  const [show, setShow] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => setShow(false),
    });

    tl.set(containerRef.current, { opacity: 1 })
     .set(logoWrapRef.current, { opacity: 1 })
      .set([imageRef.current, textRef.current], {
        scale: 0,
        opacity: 0,
      })
      .set(logoWrapRef.current, {
        y: 40,
      })

      // IMAGE enters first
      .to(imageRef.current, {
        duration: 0.8,
        scale: 1,
        opacity: 1,
        ease: 'back.out(1.7)',
      })

      // TEXT enters after image
      .to(
        textRef.current,
        {
          duration: 0.8,
          scale: 1,
          opacity: 1,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      )

      // Exit animation
      .to(logoWrapRef.current, {
        duration: 0.8,
        scale: 3,
        y: -200,
        opacity: 0,
        ease: 'power2.in',
      });

  }, []);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black"
    >
      <div
        ref={logoWrapRef}
        className="flex items-center gap-4 opacity-0"
      >
        {/* IMAGE (LEFT) */}
        <div ref={imageRef}>
          <Image
            src="/assets/logo.png"   // put image in 
            alt="Logo"
            width={80}
            height={80}
            priority
          />
        </div>

        {/* TEXT */}
        <div
          ref={textRef}
          className="text-sm md:text-6xl font-black
          bg-linear-to-r from-blue-400 via-purple-500 to-pink-500
          bg-clip-text text-transparent"
        >
          SR
        </div>
      </div>
    </div>
  );
}
