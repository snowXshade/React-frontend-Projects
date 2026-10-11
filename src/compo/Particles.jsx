
import "./BackgroundAnimation.css";

export default function BackgroundAnimation() {
  return (
    <div className="animated-bg" aria-hidden="true">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="aurora aurora-three" />
      <div className="aurora-glow" />
      <div className="bg-grain" />
    </div>
  );
}
