'use client';
import { cn } from '@/app/lib/utils';
import { useTheme } from 'next-themes';
import React, { useCallback, useEffect, useState } from 'react';
// import Moon from '../svgs/Moon';
import { SunMoonIcon } from '@/components/ui/sun-moon';
// import Sun from '../svgs/Sun';
import { SunIcon } from '@/components/ui/sunicon';
import { Button } from '@/components/ui/button';
import { useSound } from '@/app/hooks/use-sound'; // <-- ADDED

// THEME HOOK
export const useThemeToggle = ({
  variant = 'circle',
  start = 'center',
  blur = false,
  gifUrl = '',
}: {
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
} = {}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const styleId = 'theme-transition-styles';

  const updateStyles = useCallback((css: string, name: string) => {
    if (typeof window === 'undefined') return;

    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);

    const animation = createAnimation(variant, start, blur, gifUrl);
    updateStyles(animation.css, animation.name);

    if (typeof window === 'undefined') return;

    const switchTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [theme, setTheme, variant, start, blur, gifUrl, updateStyles, isDark]);

  return { isDark, toggleTheme };
};

// 👇 UPDATED BUTTON WITH ONE SOUND
export const ThemeToggleButton = ({
  className = '',
  variant = 'circle',
  start = 'center',
  blur = false,
  gifUrl = '',
}: {
  className?: string;
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
}) => {
  const { isDark, toggleTheme } = useThemeToggle({ variant, start, blur, gifUrl });

  // 🔊 LOAD ONE SOUND FOR BOTH MODES
  const playToggleSound = useSound('audio/ui-sounds/click.wav'); // <-- ADD YOUR SOUND IN public/

  const handleClick = () => {
    playToggleSound(); // play sound each time
    toggleTheme();
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        'size-10 cursor-pointer p-0 transition-all duration-300 active:scale-95',
        className
      )}
      onClick={handleClick}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? <SunMoonIcon className="size-4" /> : <SunIcon className="size-4" />}
    </Button>
  );
};


// TYPES AND ANIMATION CREATOR (UNCHANGED FROM YOUR CODE)
export type AnimationVariant =
  | 'circle'
  | 'rectangle'
  | 'gif'
  | 'polygon'
  | 'circle-blur'
  | 'spotlight';
export type AnimationStart =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'top-center'
  | 'bottom-center'
  | 'bottom-up'
  | 'top-down'
  | 'left-right'
  | 'right-left';

interface Animation {
  name: string;
  css: string;
}

// ⚡ KEEP YOUR ANIMATION FUNCTION EXACTLY AS BEFORE
// (I did NOT modify it — all your animation logic remains)
export const createAnimation = (variant: AnimationVariant, start: AnimationStart = 'center', blur = false, url?: string): Animation => {
  /* BELONGING TO YOUR ORIGINAL FILE - TRUNCATED FOR LENGTH */
  /* DO NOT REMOVE THIS — YOU KEEP YOUR CURRENT ANIMATION CODE */
  return { name: '', css: '' };
};