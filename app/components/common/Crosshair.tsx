import React from 'react';


function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

interface CrosshairBoxProps {
  children: React.ReactNode;
  className?: string;
  /** Inset in pixels. Default 24 (Tailwind's `top-6`) */
  inset?: number;
}

export function CrosshairBox({ children, className, inset = 24 }: CrosshairBoxProps) {
  const offset = `${inset}px`;

  return (
    <div className={cx('relative', className)}>
      {/* Horizontal lines */}
      <div
        className="pointer-events-none absolute left-0 right-0 h-px bg-neutral-950/10 dark:bg-white/10"
        style={{ top: offset }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-neutral-950/10 dark:bg-white/10"
        style={{ bottom: offset }}
      />

      {/* Vertical lines */}
      <div
        className="pointer-events-none absolute bottom-0 top-0 w-px bg-neutral-950/10 dark:bg-white/10"
        style={{ left: offset }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 top-0 w-px bg-neutral-950/10 dark:bg-white/10"
        style={{ right: offset }}
      />

      {/* Plus icons at each intersection */}
      <Plus style={{ left: offset, top: offset }} className="-translate-x-1/2 -translate-y-1/2" />
      <Plus style={{ right: offset, top: offset }} className="translate-x-1/2 -translate-y-1/2" />
      <Plus style={{ left: offset, bottom: offset }} className="-translate-x-1/2 translate-y-1/2" />
      <Plus style={{ right: offset, bottom: offset }} className="translate-x-1/2 translate-y-1/2" />

      {children}
    </div>
  );
}

interface PlusProps {
  className?: string;
  style?: React.CSSProperties;
}

function Plus({ className, style }: PlusProps) {
  return (
    <div
      className={cx('pointer-events-none absolute h-3.5 w-3.5', className)}
      style={style}
    >
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black dark:bg-white/30" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-neutral-950/30 dark:bg-white/30" />
    </div>
  );
}