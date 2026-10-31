/**
 * Kinetic Marquee:
 * Infinitely running Geist Pixel marquee with plus signs (matching jithinrp.com).
 */
export function KineticMarquee() {
  const words = [
    "Agent Experience",
    "Design Systems",
    "Platform UX",
    "Human-in-the-Loop",
    "AI-Assisted Workflow",
    "Enterprise AI",
  ];

  return (
    <div className="pixel-marquee" aria-hidden="true">
      <div className="pixel-marquee-track">
        <div className="pixel-marquee-group">
          {words.map((word, idx) => (
            <span key={idx} className="flex items-center gap-6">
              <span>{word}</span>
              <span className="pixel-marquee-plus">+</span>
            </span>
          ))}
        </div>
        <div className="pixel-marquee-group">
          {words.map((word, idx) => (
            <span key={`dup-${idx}`} className="flex items-center gap-6">
              <span>{word}</span>
              <span className="pixel-marquee-plus">+</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
