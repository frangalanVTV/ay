import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const heights = { sm: 24, md: 32, lg: 56 };

export function Logo({ className = "", size = "md" }: LogoProps) {
  const h = heights[size];
  return (
    <Image
      src="/3D/AY_white.png"
      alt="Ay!"
      width={1990}
      height={946}
      style={{ height: h, width: "auto" }}
      className={className}
      priority
    />
  );
}
