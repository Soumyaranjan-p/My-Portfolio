"use client";

interface GooeyFilterProps {
  id: string;
  /** Blur strength — higher = more liquid merging */
  blur?: number;
  /** Color matrix cutoff — higher = sharper edges */
  cutoff?: number;
}

/**
 * Invisible SVG that defines a gooey metaball filter.
 * Apply with `filter: url(#<id>)` in CSS / style prop.
 *
 * Pipeline:
 *   1. feGaussianBlur  — blurs alpha channel so nearby blobs bleed together
 *   2. feColorMatrix   — crushes alpha to 0/1, creating the hard "joined" edge
 */
export function GooeyFilter({ id, blur = 12, cutoff = 19 }: GooeyFilterProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", width: 0, height: 0 }}
      aria-hidden="true"
    >
      <defs>
        <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
          {/* Step 1 – expand alpha so nearby shapes bleed */}
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
          {/* Step 2 – threshold: anything with enough alpha becomes opaque */}
          <feColorMatrix
            in="blur"
            mode="matrix"
            values={`1 0 0 0 0
                     0 1 0 0 0
                     0 0 1 0 0
                     0 0 0 ${cutoff} -9`}
            result="goo"
          />
          {/* Step 3 – composite original colours back on top of the threshold mask */}
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}