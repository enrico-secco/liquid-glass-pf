import type { CSSProperties } from "react";

/**
 * Neo-Memphis visual vocabulary (MEMPHIS_SPEC §05) — one reusable
 * primitive per geometric family. Purely presentational; motion and
 * parallax come from the wrapper classes (.m-drift/.m-spin/.m-bob) and
 * pointer CSS vars applied by the caller.
 */

type ShapeProps = {
  size: number;
  color: string;
  className?: string;
  style?: CSSProperties;
};

export function Circle({ size, color, className, style }: ShapeProps) {
  return (
    <div
      aria-hidden
      className={`rounded-full ${className ?? ""}`}
      style={{ width: size, height: size, background: color, ...style }}
    />
  );
}

export function Ring({
  size,
  color,
  thickness = 10,
  className,
  style,
}: ShapeProps & { thickness?: number }) {
  return (
    <div
      aria-hidden
      className={`rounded-full ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        border: `${thickness}px solid ${color}`,
        ...style,
      }}
    />
  );
}

export function Semi({ size, color, className, style }: ShapeProps) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        width: size,
        height: size / 2,
        background: color,
        borderRadius: `${size}px ${size}px 0 0`,
        ...style,
      }}
    />
  );
}

export function Triangle({ size, color, className, style }: ShapeProps) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        width: size,
        height: size,
        background: color,
        clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        ...style,
      }}
    />
  );
}

export function Dots({
  size,
  color,
  className,
  style,
}: ShapeProps) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        width: size,
        height: size * 0.7,
        backgroundImage: `radial-gradient(${color} 2.5px, transparent 3px)`,
        backgroundSize: "22px 22px",
        ...style,
      }}
    />
  );
}

export function ZigZag({
  width = 140,
  color,
  className,
  style,
}: Omit<ShapeProps, "size"> & { width?: number }) {
  return (
    <svg
      aria-hidden
      className={className}
      style={style}
      width={width}
      height={width * 0.22}
      viewBox="0 0 140 30"
      fill="none"
    >
      <path
        d="M2 26 L20 6 L38 26 L56 6 L74 26 L92 6 L110 26 L128 6"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Squiggle({
  width = 160,
  color,
  className,
  style,
}: Omit<ShapeProps, "size"> & { width?: number }) {
  return (
    // viewBox has vertical margin: the curve peaks touch y=0/48 and the
    // 7px stroke extends past them — without the margin the wave tops clip flat.
    <svg
      aria-hidden
      className={className}
      style={style}
      width={width}
      height={width * 0.375}
      viewBox="0 -6 160 60"
      fill="none"
    >
      <path
        d="M4 24 C 20 -8, 44 -8, 60 24 S 100 56, 116 24 S 148 -4, 156 16"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Cross({ size, color, className, style }: ShapeProps) {
  return (
    <svg
      aria-hidden
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path
        d="M12 3 V21 M3 12 H21"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
