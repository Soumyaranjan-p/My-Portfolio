import React from 'react';

export default function Container({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-2xl px-6 ${className}`}>
      {children}
    </div>
  );
}
