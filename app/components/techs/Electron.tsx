export default function Electron() {
  return (
    <svg viewBox="0 0 128 128">
      <circle cx="64" cy="64" r="64" fill="#2B2E3B"></circle>
      <g fill="none" stroke="#9FEAF9" strokeWidth="4">
        <ellipse
          cx="64"
          cy="64"
          rx="44"
          ry="18"
          transform="rotate(0 64 64)"
        ></ellipse>
        <ellipse
          cx="64"
          cy="64"
          rx="44"
          ry="18"
          transform="rotate(60 64 64)"
        ></ellipse>
        <ellipse
          cx="64"
          cy="64"
          rx="44"
          ry="18"
          transform="rotate(120 64 64)"
        ></ellipse>
      </g>
      <circle cx="64" cy="64" r="7" fill="#9FEAF9"></circle>
      <path
        fill="url(#electronGradient)"
        d="M106.317 112.014 49.167 38.4H38.4v51.179h8.614v-40.24l52.54 67.884a64.216 64.216 0 0 0 6.763-5.209z"
        opacity="0.15"
      ></path>
      <defs>
        <linearGradient
          id="electronGradient"
          x1="109"
          x2="144.5"
          y1="116.5"
          y2="160.5"
          gradientTransform="scale(.71111)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}