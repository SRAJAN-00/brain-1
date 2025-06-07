const mianIcon = () => {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <defs>
        {" "}
        <linearGradient id="purpleGradient" x1="0" y1="0" x2="1" y2="1">
          {" "}
          <stop offset="0%" stop-color="#A855F7" />{" "}
          <stop offset="100%" stop-color="#7C3AED" />{" "}
        </linearGradient>{" "}
      </defs>{" "}
      <circle
        cx="60"
        cy="60"
        r="55"
        fill="url(#purpleGradient)"
        stroke="#fff"
        stroke-width="5"
      />{" "}
      <path
        d="M60 25C52 38 45 47 45 55C45 66 52.5 75 60 75C67.5 75 75 66 75 55C75 47 68 38 60 25Z"
        fill="white"
      />{" "}
      <rect x="52" y="78" width="16" height="20" rx="3" fill="white" />{" "}
      <line x1="56" y1="83" x2="64" y2="83" stroke="#A855F7" stroke-width="2" />{" "}
      <line x1="56" y1="88" x2="64" y2="88" stroke="#A855F7" stroke-width="2" />
    </svg>
  );
};

export default mianIcon;
