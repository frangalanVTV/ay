interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { fontSize: "1.5rem", strokeWidth: "1.2px" },
  md: { fontSize: "2rem", strokeWidth: "1.5px" },
  lg: { fontSize: "4rem", strokeWidth: "2.5px" },
};

export function Logo({ className = "", size = "md" }: LogoProps) {
  const { fontSize, strokeWidth } = sizes[size];
  return (
    <span
      className={`font-black tracking-tighter leading-none select-none ${className}`}
      style={{
        fontSize,
        // WebkitTextFillColor controls the visible fill; color stays as the
        // source for currentColor so the stroke inherits context correctly.
        WebkitTextStroke: `${strokeWidth} currentColor`,
        WebkitTextFillColor: "transparent",
        display: "inline-block",
      }}
      aria-label="Ay!"
    >
      Ay!
    </span>
  );
}
