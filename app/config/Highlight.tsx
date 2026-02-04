type HighlightProps = {
  children: React.ReactNode;
};

export default function Highlight({ children }: HighlightProps) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10 px-1 font-medium text-neutral-900 dark:text-neutral-100">
        {children}
      </span>
      <span className="absolute inset-x-0 bottom-1 h-2 bg-yellow-300 dark:bg-yellow-400/60 -z-10 rounded-sm" />
    </span>
  );
}
