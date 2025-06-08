export function BrainIcon() {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 260 240"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="brainIconTitle"
      role="img"
    >
      <title id="brainIconTitle">Brain Icon</title>
      <defs>
        {/* Purple gradient for the droplet */}
        <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D946EF" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* Droplet shape */}
      <path
        d="M120 12 C 90 66, 48 126, 48 168 C 48 210, 80 228, 120 228 C 160 228, 192 210, 192 168 C 192 126, 150 66, 120 12 Z"
        fill="url(#purpleGrad)"
      />

      {/* White “post/document” inside droplet */}
      <rect x="92" y="104" width="56" height="70" rx="6" ry="6" fill="#FFFFFF" />

      {/* Purple lines in the document */}
      <line x1="104" y1="118" x2="148" y2="118" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" />
      <line x1="104" y1="138" x2="148" y2="138" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" />
      <line x1="104" y1="158" x2="132" y2="158" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" />

    
    </svg>
  );
}
