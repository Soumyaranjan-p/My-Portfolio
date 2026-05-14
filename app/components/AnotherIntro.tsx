// 'use client';
// import { useEffect, useState, useRef } from 'react';
// import { gsap } from 'gsap';
// import Image from 'next/image';

// export default function IntroLoader() {
//   const [show, setShow] = useState(true);

//   const wrapRef       = useRef<HTMLDivElement>(null);
//   const counterRef    = useRef<HTMLDivElement>(null);
//   const topPanelRef   = useRef<HTMLDivElement>(null);
//   const bottomPanelRef = useRef<HTMLDivElement>(null);
//   const logoRef       = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {

//       // Both panels start at scaleY: 0 from their OWN edges
//       // Top panel grows downward  → transformOrigin: 'top'
//       // Bottom panel grows upward → transformOrigin: 'bottom'
//       gsap.set(topPanelRef.current,    { scaleY: 0, transformOrigin: 'bottom center' });
//       gsap.set(bottomPanelRef.current, { scaleY: 0, transformOrigin: 'top center' });
//       gsap.set(logoRef.current,        { opacity: 0 });

//       const counter = { val: 0 };

//       const tl = gsap.timeline({ onComplete: () => setShow(false) });

//       // ── Phase 1: Counter 0 → 100 ──────────────────────────────────
//       tl.to(counter, {
//         val: 100,
//         duration: 2.8,
//         ease: 'power2.in',
//         onUpdate() {
//           if (counterRef.current) {
//             counterRef.current.textContent = String(Math.round(counter.val));
//           }
//         },
//       })

//       // ── Phase 2: Counter fades out ────────────────────────────────
//       .to(counterRef.current, {
//         opacity: 0,
//         duration: 0.2,
//         ease: 'none',
//       })

//       // ── Phase 3: Both panels grow toward center simultaneously ────
//       // Top panel: anchored at bottom edge, grows upward (scaleY from bottom)
//       // Bottom panel: anchored at top edge, grows downward (scaleY from top)
//       // Together they look like ONE panel expanding from center
//       .to(topPanelRef.current, {
//         scaleY: 1,
//         duration: 0.55,
//         ease: 'expo.inOut',
//       }, '-=0.05')
//       .to(bottomPanelRef.current, {
//         scaleY: 1,
//         duration: 0.55,
//         ease: 'expo.inOut',
//       }, '<') // same time = expands from center illusion

//       // Logo appears in center
//       .to(logoRef.current, {
//         opacity: 1,
//         duration: 0.25,
//         ease: 'power2.out',
//       }, '-=0.2')

//       // ── Phase 4: Hold ─────────────────────────────────────────────
//       .to({}, { duration: 0.4 })

//       // ── Phase 5: Split — logo fades, panels fly apart ─────────────
//       .to(logoRef.current, {
//         opacity: 0,
//         duration: 0.15,
//         ease: 'none',
//       })
//       // Top panel flies UP, bottom panel flies DOWN — fully independent
//       .to(topPanelRef.current, {
//         yPercent: -100,
//         duration: 0.8,
//         ease: 'expo.inOut',
//       }, '+=0.05')
//       .to(bottomPanelRef.current, {
//         yPercent: 100,
//         duration: 0.8,
//         ease: 'expo.inOut',
//       }, '<'); // '<' = starts at exact same time as top

//     }, wrapRef);

//     return () => ctx.revert();
//   }, []);

//   if (!show) return null;

//   return (
//     <div
//       ref={wrapRef}
//       className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
//       style={{ backgroundColor: '#FAFAF8' }}
//     >
//       {/* Counter */}
//       <div
//         ref={counterRef}
//         className="absolute font-bold select-none tabular-nums"
//         style={{ fontSize: '22px', color: '#1a1a1a', letterSpacing: '-0.02em' }}
//       >
//         0
//       </div>

//       {/*
//         TOP PANEL — occupies top half of the viewport center box.
//         transformOrigin: 'bottom center' so scaleY grows upward from the middle.
//         On exit: yPercent -100 moves it fully off the top.
//       */}
//       <div
//         ref={topPanelRef}
//         className="absolute"
//         style={{
//           width: '85vw',
//           height: '37.5vh',          // half of the 75vh total panel height
//           bottom: '50%',             // its bottom edge sits at screen center
//           left: '50%',
//           transform: 'translateX(-50%) scaleY(0)',
//           transformOrigin: 'bottom center',
//           backgroundColor: '#161616',
//           borderRadius: '12px 12px 0 0',
//         }}
//       >
//         {/* Logo anchored to bottom of top panel = visual center of full panel */}
//         <div
//           ref={logoRef}
//           className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0"
//         >
//           <Image
//             src="/assets/logo.png"
//             alt="Logo"
//             width={48}
//             height={48}
//             priority
//             style={{ filter: 'brightness(0) invert(1)' }}
//           />
//           {/* Or use your text brand mark instead of image: */}
//           {/* <span className="text-white text-2xl font-black">SR</span> */}
//         </div>
//       </div>

//       {/*
//         BOTTOM PANEL — occupies bottom half of the viewport center box.
//         transformOrigin: 'top center' so scaleY grows downward from the middle.
//         On exit: yPercent 100 moves it fully off the bottom.
//       */}
//       <div
//         ref={bottomPanelRef}
//         className="absolute"
//         style={{
//           width: '85vw',
//           height: '37.5vh',
//           top: '50%',                // its top edge sits at screen center
//           left: '50%',
//           transform: 'translateX(-50%) scaleY(0)',
//           transformOrigin: 'top center',
//           backgroundColor: '#161616',
//           borderRadius: '0 0 12px 12px',
//         }}
//       />
//     </div>
//   );
// }


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
