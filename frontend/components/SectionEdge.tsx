/**
 * Blurry section transition.
 *
 * Stacks two layers at a section edge:
 *  1. backdrop-filter blur — blurs whatever is behind, revealed gradually via CSS mask
 *  2. color fade — transitions to the page background (#1A1110)
 *
 * Result: content dissolves into a frosted-glass blur before fading to the base color.
 */

interface SectionEdgeProps {
  position: "top" | "bottom";
  /** Tailwind height class, e.g. "h-48" */
  height?: string;
  /** Extra z-index class if needed */
  zIndex?: string;
}

export const SectionEdge = ({
  position,
  height = "h-52",
  zIndex = "z-20",
}: SectionEdgeProps) => {
  const isBottom = position === "bottom";

  const maskDir = isBottom
    ? "linear-gradient(to bottom, transparent 0%, black 55%)"
    : "linear-gradient(to top,   transparent 0%, black 55%)";

  const colorDir = isBottom
    ? "linear-gradient(to bottom, transparent 15%, rgba(26,17,16,0.75) 55%, #1A1110 100%)"
    : "linear-gradient(to top,   transparent 15%, rgba(26,17,16,0.75) 55%, #1A1110 100%)";

  return (
    <div
      className={`absolute ${isBottom ? "bottom-0" : "top-0"} left-0 right-0 ${height} ${zIndex} pointer-events-none overflow-hidden`}
    >
      {/* Layer 1 — progressive blur via CSS mask */}
      <div
        className="absolute inset-0 backdrop-blur-2xl"
        style={{
          maskImage: maskDir,
          WebkitMaskImage: maskDir,
        }}
      />

      {/* Layer 2 — color fade to marevo-umber */}
      <div
        className="absolute inset-0"
        style={{ background: colorDir }}
      />
    </div>
  );
};
