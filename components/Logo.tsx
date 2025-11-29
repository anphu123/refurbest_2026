"use client";

import Image from "next/image";

interface LogoProps {
  variant?: 'horizontal' | 'white' | 'blue' | 'black';
  className?: string;
}

export default function Logo({ variant = 'horizontal', className = "" }: LogoProps) {
  const getLogoSrc = () => {
    switch (variant) {
      case 'horizontal':
        return '/Refurbest.png';
      case 'white':
        return '/Refurbest.png';
      case 'blue':
        return '/Refurbest.png';
      case 'black':
        return '/Refurbest.png';
      default:
        return '/Refurbest.png';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Image
        src={getLogoSrc()}
        alt="Refurbest Logo"
        width={200}
        height={60}
        className="h-auto w-auto max-w-full"
        priority
        onError={(e) => {
          console.log('Logo load error:', e);
          // Fallback to text if image fails
        }}
      />
    </div>
  );
}

// Component for bubbles decoration
export function Bubbles({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/font/Bong bóng.svg"
        alt="Bubbles decoration"
        width={100}
        height={100}
        className="h-auto w-auto max-w-full"
      />
    </div>
  );
}
