
export default function Logo() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-pulse"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        fill="url(#logoGradient)"
        d="M50 0C22.38 0 0 22.38 0 50C0 77.62 22.38 100 50 100C77.62 100 100 77.62 100 50C100 22.38 77.62 0 50 0ZM50 88.24C28.76 88.24 11.76 71.24 11.76 50C11.76 28.76 28.76 11.76 50 11.76C71.24 11.76 88.24 28.76 88.24 50C88.24 71.24 71.24 88.24 50 88.24Z"
      />
      <path
        fill="white"
        d="M50 25C36.22 25 25 36.22 25 50C25 63.78 36.22 75 50 75C63.78 75 75 63.78 75 50C75 36.22 63.78 25 50 25Z"
      />
    </svg>
  );
}
