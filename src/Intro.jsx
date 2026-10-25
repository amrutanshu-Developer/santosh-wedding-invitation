import React, { useEffect, useMemo, useState } from "react";
import "./intro.css";

const petalColors = ["#f59e0b", "#fbbf24", "#f97316", "#f472b6", "#fde68a"];

export function Groom() {
  return (
    <svg viewBox="0 0 120 250" className="intro-figure" aria-hidden="true">
      <ellipse cx="48" cy="242" rx="11" ry="5" fill="#c9a24f" />
      <ellipse cx="72" cy="242" rx="11" ry="5" fill="#c9a24f" />
      <rect x="42" y="200" width="14" height="42" rx="5" fill="#efe2c8" />
      <rect x="64" y="200" width="14" height="42" rx="5" fill="#efe2c8" />
      <path d="M37 86 Q25 122 29 168" stroke="#f3e3c3" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M83 86 Q95 122 91 168" stroke="#f3e3c3" strokeWidth="13" strokeLinecap="round" fill="none" />
      <circle cx="29" cy="173" r="6" fill="#c98d6a" />
      <circle cx="91" cy="173" r="6" fill="#c98d6a" />
      <path d="M38 80 Q60 70 82 80 L86 150 L90 214 L30 214 L34 150 Z" fill="#f6e7c8" stroke="#d8b878" strokeWidth="1.5" />
      <path d="M31 207 L89 207" stroke="#d1a650" strokeWidth="5" />
      <line x1="60" y1="80" x2="60" y2="204" stroke="#d1a650" strokeWidth="1.5" />
      {[94, 108, 122, 136].map((y) => (
        <circle key={y} cx="60" cy={y} r="2" fill="#b88a3a" />
      ))}
      <path d="M43 80 L82 162" stroke="#8e1f35" strokeWidth="9" strokeLinecap="round" />
      <rect x="54" y="63" width="12" height="13" fill="#b97c5b" />
      <path d="M50 77 Q60 85 70 77" stroke="#d1a650" strokeWidth="3" fill="none" />
      <path className="varmala" d="M45 80 Q60 128 75 80" stroke="#f59e0b" strokeWidth="7" strokeDasharray="0.1 7" strokeLinecap="round" fill="none" />
      <circle cx="43" cy="52" r="3.5" fill="#b97c5b" />
      <circle cx="77" cy="52" r="3.5" fill="#b97c5b" />
      <circle cx="60" cy="50" r="17" fill="#c98d6a" />
      <path d="M52 52 q3 2.5 6 0 M62 52 q3 2.5 6 0" stroke="#3a2016" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M54 57.5 q6 -3 12 0" stroke="#2b1a14" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M55.5 61 q4.5 3.5 9 0" stroke="#7a3b2a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M41 47 Q38 24 60 22 Q82 24 79 47 Q70 38 60 40 Q50 38 41 47Z" fill="#a3203a" />
      <path d="M43 40 Q60 30 77 40 M46 33 Q60 25 74 33" stroke="#e3b95c" strokeWidth="2" fill="none" />
      <path d="M60 28 Q66 12 75 7 Q67 18 63 28Z" fill="#f4e6c4" stroke="#e3b95c" />
      <circle cx="60" cy="31" r="4" fill="#e3b95c" />
    </svg>
  );
}

export function Bride() {
  return (
    <svg viewBox="0 0 120 250" className="intro-figure" aria-hidden="true">
      <path d="M38 50 Q36 20 60 18 Q84 20 82 50 L98 206 L22 206 Z" fill="#c21d3a" stroke="#e3b95c" strokeWidth="2" />
      <path d="M39 86 Q29 122 33 166" stroke="#c98d6a" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M81 86 Q91 122 87 166" stroke="#c98d6a" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M40 84 L35 104 M80 84 L85 104" stroke="#9e1229" strokeWidth="12" strokeLinecap="round" />
      <path d="M28 156 h10 M28 161 h10 M82 156 h10 M82 161 h10" stroke="#e3b95c" strokeWidth="2.5" />
      <circle cx="33" cy="170" r="5.5" fill="#a55a3c" />
      <circle cx="87" cy="170" r="5.5" fill="#a55a3c" />
      <path d="M44 120 Q60 116 76 120 Q98 188 102 238 L18 238 Q22 188 44 120Z" fill="#b5172f" />
      <path d="M20 229 Q60 240 100 229" stroke="#e3b95c" strokeWidth="6" fill="none" />
      {[[40, 170], [60, 182], [80, 170], [50, 205], [70, 205], [32, 210], [88, 210]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" fill="#e3b95c" />
      ))}
      <path d="M40 82 Q60 74 80 82 L78 124 L42 124Z" fill="#9e1229" />
      <path d="M40 82 L54 79 L82 128 L66 130 Z" fill="#d6455a" stroke="#e3b95c" strokeWidth="2" />
      <rect x="54" y="63" width="12" height="13" fill="#b97c5b" />
      <path d="M50 76 Q60 90 70 76" stroke="#e3b95c" strokeWidth="3.5" fill="none" />
      <circle cx="60" cy="87" r="3" fill="#e3b95c" />
      <path className="varmala" d="M45 80 Q60 128 75 80" stroke="#f59e0b" strokeWidth="7" strokeDasharray="0.1 7" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="50" r="17" fill="#c98d6a" />
      <path d="M43 47 Q44 30 60 30 Q76 30 77 47 Q70 38 60 39 Q50 38 43 47Z" fill="#2b1712" />
      <path d="M60 30 V40" stroke="#e3b95c" strokeWidth="1.5" />
      <circle cx="60" cy="41" r="2.5" fill="#e3b95c" />
      <circle cx="60" cy="46" r="1.5" fill="#b5172f" />
      <path d="M52 52 q3 2.5 6 0 M62 52 q3 2.5 6 0" stroke="#3a2016" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="57" r="3" fill="#e9737a" opacity=".45" />
      <circle cx="70" cy="57" r="3" fill="#e9737a" opacity=".45" />
      <circle cx="55" cy="56" r="3" stroke="#e3b95c" strokeWidth="1.2" fill="none" />
      <path d="M55.5 60 q4.5 3.5 9 0" stroke="#8c3a2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M38 52 Q36 20 60 18 Q84 20 82 52 Q80 34 60 29 Q40 34 38 52Z" fill="#c21d3a" stroke="#e3b95c" strokeWidth="2" />
    </svg>
  );
}

function Toran() {
  const swags = Array.from({ length: 12 }, (_, i) => i * 60);
  return (
    <svg className="intro-toran" viewBox="0 0 720 54" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path d="M0 3 H720" stroke="#d6b579" strokeWidth="2" />
      {swags.map((x) => (
        <g key={x}>
          <path d={`M${x} 4 Q${x + 30} 40 ${x + 60} 4`} stroke="#f59e0b" strokeWidth="7" strokeDasharray="0.1 7" strokeLinecap="round" fill="none" />
          <path d={`M${x + 6} 4 Q${x + 30} 30 ${x + 54} 4`} stroke="#fde047" strokeWidth="5" strokeDasharray="0.1 6" strokeLinecap="round" fill="none" />
          <path d={`M${x} 4 q-5 18 0 30 q5 -12 0 -30Z`} fill="#4d7c3a" />
        </g>
      ))}
    </svg>
  );
}

export default function Intro({ onOpen }) {
  const [leaving, setLeaving] = useState(false);
  const petals = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 7,
        duration: 6 + Math.random() * 5,
        size: 8 + Math.random() * 8,
        color: petalColors[i % petalColors.length],
      })),
    [],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const open = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onOpen, 900);
  };

  return (
    <div className={`intro${leaving ? " leaving" : ""}`} role="dialog" aria-label="Wedding invitation">
      <Toran />
      <button className="intro-skip" onClick={open}>
        Skip ›
      </button>
      {petals.map((p, i) => (
        <span
          key={i}
          className="intro-petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <p className="intro-blessing">॥ Shree Ganeshaya Namah ॥</p>

      <div className="intro-stage">
        <svg className="intro-arch" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          <path d="M40 300 V135 Q40 22 200 22 Q360 22 360 135 V300" stroke="#d6b579" strokeWidth="3" fill="none" />
          <path d="M58 300 V140 Q58 42 200 42 Q342 42 342 140 V300" stroke="#f59e0b" strokeWidth="7" strokeDasharray="0.1 9" strokeLinecap="round" fill="none" opacity=".8" />
          <circle cx="200" cy="22" r="7" fill="#d6b579" />
        </svg>
        <div className="intro-hearts" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} style={{ "--i": i }}>♥</span>
          ))}
        </div>
        <div className="intro-person groom-in">
          <div className="intro-walk">
            <Groom />
          </div>
          <p className="intro-caption">
            <em>Here comes the groom</em>
            <strong>Santosh</strong>
          </p>
        </div>
        <div className="intro-person bride-in">
          <div className="intro-walk">
            <Bride />
          </div>
          <p className="intro-caption">
            <em>Here comes the bride</em>
            <strong>Dipti Mayee</strong>
          </p>
        </div>
      </div>

      <div className="intro-message">
        <p className="intro-folded">🙏</p>
        <p>With folded hands and joyful hearts,</p>
        <p>
          we humbly invite <strong>you & your family</strong>
        </p>
        <p>to bless the couple with your presence.</p>
      </div>
      <button className="intro-open" onClick={open}>
        Open Invitation
      </button>
    </div>
  );
}
