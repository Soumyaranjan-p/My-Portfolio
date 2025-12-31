'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from "@/app/lib/utils"

// ✅ Simplified, non-recursive types
type Variant = 'default' | 'outline' | 'ghost' | 'destructive'

interface AnimatedButtonProps {
  children: React.ReactNode
  className?: string
  variant?: Variant
  asChild?: boolean
  disabled?: boolean
  [key: string]: any  // Accepts motion props + HTML attrs
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className = '',
  variant = 'default',
  asChild = false,
  ...props
}) => {
  // ✅ asChild: Wraps children with motion.div
  if (asChild) {
    return (
      <motion.div
        className={cn("inline-flex", className)}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  // ✅ Direct motion.button - NO dynamic lookup
  const variantStyles: Record<Variant, string> = {
    default: "bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800",
    outline: "bg-transparent border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900/50",
    ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 border-transparent",
    destructive: "bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-900/50"
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group inline-flex items-center justify-center px-4 py-2 rounded-md relative overflow-hidden font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50",
        "[--shine:rgba(0,0,0,.66)] dark:[--shine:rgba(255,255,255,.66)]",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Text shine mask */}
      <motion.span
        className="tracking-wide flex items-center justify-center h-full w-full relative z-10"
        style={{
          WebkitMaskImage: 'linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))',
          maskImage: 'linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))',
        }}
        initial={{ ['--mask-x']: '100%' }}
        animate={{ ['--mask-x']: '-100%' }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear', repeatDelay: 1 }}
      >
        {children}
      </motion.span>

      {/* Border shine */}
      <motion.span
        className="block absolute inset-0 rounded-md p-px"
        style={{
          background: 'linear-gradient(-75deg, transparent 30%, var(--shine) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
        }}
        initial={{ backgroundPosition: '100% 0', opacity: 0 }}
        animate={{ backgroundPosition: ['100% 0', '0% 0'], opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
      />
    </motion.button>
  )
}

export default AnimatedButton
