"use client";

/**
 * Grid/Dot Background Component
 * 
 * Creates a terminal/code-editor aesthetic background with grid pattern.
 * Can display as dots or lines, with customizable opacity and spacing.
 * 
 * @param dotColor - Color of the dots/lines (default: secondary color)
 * @param spacing - Grid spacing in pixels (default: 20)
 * @param className - Optional CSS classes to apply to the container
 * @param strokeWidth - Width of grid lines (default: 0.5)
 * @param opacity - Opacity of the grid (default: 0.2)
 * @returns JSX element containing the grid background
 */
export function GridBackground({
  dotColor = "rgb(217,217,217)",
  spacing = 20,
  className = "",
  strokeWidth = 0.5,
  opacity = 0.2,
}: {
  dotColor?: string;
  spacing?: number;
  className?: string;
  strokeWidth?: number;
  opacity?: number;
}) {
  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
              fill="none"
              stroke={dotColor}
              strokeWidth={strokeWidth}
              opacity={opacity}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

