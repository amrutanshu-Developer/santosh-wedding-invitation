import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  MapPin,
  CalendarDays,
  Clock3,
  Heart,
  Navigation,
  Sparkles,
  Flower2,
  Share2,
  ChevronDown,
} from "lucide-react";
import Intro, { Groom, Bride, Toran } from "./Intro.jsx";
import { startScrollVars, startTapBursts, petalShower } from "./effects.js";
import "./styles.css";

const weddingDate = new Date("2026-12-02T09:00:00+05:30");
const mapsUrl = "https://maps.app.goo.gl/wipme7kBL4Uas3Cv8";
const mapEmbedUrl =
  "https://maps.google.com/maps?q=Nilamani%20Convention%20Khordha%20Odisha&z=15&output=embed";
const siteUrl = "https://santosh-wedding-invitation.vercel.app";
const whatsappNumber = "919853487141"; // country code + number, used for "Send your wishes"

const shareMessage =
  `💐 You're invited to the wedding of Santosh & Diptimayee\n\n` +
  `📅 Friday, 4 December 2026\n` +
  `📍 Nilamani Convention, Khordha, Odisha\n` +
  `🗺️ Location: ${mapsUrl}\n\n` +
  `Invitation: ${siteUrl}`;
const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

const wishesMessage =
  "Congratulations! 🙏\n\n" +
  "Heartiest congratulations to Santosh & Diptimayee on their wedding. " +
  "Thank you so much for the warm invitation, it truly means a lot.\n\n" +
  "May Lord Jagannath bless you both with a lifetime of love, understanding and happiness. " +
  "Wishing you a beautiful journey together, filled with laughter, good health and many cherished memories.\n\n" +
  "Looking forward to celebrating with you and the family. 💐";
const wishesUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(wishesMessage)}`;

const external = { target: "_blank", rel: "noreferrer" };

function useCountdown() {
  const [time, setTime] = useState(getTimeLeft);
  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);
  return time;
}
function getTimeLeft() {
  const diff = Math.max(0, weddingDate.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    mins: Math.floor((diff / 60000) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

/* Slowly turning gold mandala behind the names */
function Mandala({ className }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const leaves = Array.from({ length: 32 }, (_, i) => i * 11.25);
  const dots = Array.from({ length: 48 }, (_, i) => i * 7.5);
  return (
    <svg className={className} viewBox="-200 -200 400 400" aria-hidden="true">
      <g fill="none" stroke="currentColor">
        <circle r="196" strokeWidth=".6" strokeDasharray="2 5" />
        <circle r="184" strokeWidth=".8" />
        {dots.map((a) => (
          <circle key={a} r="2" cx="0" cy="-172" transform={`rotate(${a})`} fill="currentColor" stroke="none" />
        ))}
        {leaves.map((a) => (
          <path key={a} d="M0 -160 Q10 -138 0 -116 Q-10 -138 0 -160Z" transform={`rotate(${a})`} strokeWidth=".8" />
        ))}
        <circle r="112" strokeWidth=".8" />
        {petals.map((a) => (
          <path key={a} d="M0 -108 C26 -90 26 -58 0 -40 C-26 -58 -26 -90 0 -108Z" transform={`rotate(${a})`} strokeWidth=".9" />
        ))}
        {petals.map((a) => (
          <path key={`i${a}`} d="M0 -96 C12 -84 12 -66 0 -54 C-12 -66 -12 -84 0 -96Z" transform={`rotate(${a + 11.25})`} strokeWidth=".6" />
        ))}
        <circle r="38" strokeWidth=".8" />
        <circle r="30" strokeWidth=".6" strokeDasharray="1 4" />
      </g>
    </svg>
  );
}

function Sparkle({ style }) {
  return <span className="sparkle" style={style} />;
}

function App() {
  const countdown = useCountdown();
  const [introDone, setIntroDone] = useState(false);
  const [dockVisible, setDockVisible] = useState(false);
  const heroActionsRef = useRef(null);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 22 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 6}s`,
        animationDuration: `${3 + Math.random() * 4}s`,
        "--s": `${2 + Math.random() * 3}px`,
      })),
    [],
  );
  const petals = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 12}s`,
        animationDuration: `${11 + Math.random() * 8}s`,
        "--hue": ["#f2a33a", "#f7c15c", "#e9737a", "#f59e0b"][i % 4],
      })),
    [],
  );

  useEffect(() => {
    const stopScroll = startScrollVars();
    const stopTaps = startTapBursts();
    return () => {
      stopScroll();
      stopTaps();
    };
  }, []);

  const openInvitation = () => {
    setIntroDone(true);
    petalShower();
  };

  // Fade sections in as they scroll into view
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal, .draw");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // Show the floating Directions/Share dock whenever the hero buttons are off-screen
  useEffect(() => {
    const node = heroActionsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) =>
      setDockVisible(!entry.isIntersecting),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <div className="progress" aria-hidden="true" />
      {!introDone && <Intro onOpen={openInvitation} />}

      {/* ───────────── HERO: names, venue, map ───────────── */}
      <section className={`hero${introDone ? " play" : ""}`} id="home">
        <div className="hero-glow" aria-hidden="true" />
        <Mandala className="hero-mandala" />
        <div className="hero-sparkles" aria-hidden="true">
          {sparkles.map((s, i) => (
            <Sparkle key={i} style={s} />
          ))}
          {petals.map((p, i) => (
            <span key={`p${i}`} className="hero-petal" style={p} />
          ))}
        </div>
        <Toran className="hero-toran" />
        <div className="hero-frame" aria-hidden="true">
          <span /> <span /> <span /> <span />
        </div>

        <div className="hero-inner">
          <div className="hero-names">
            <p className="hero-blessing stagger" style={{ "--d": 0 }}>
              ॥ Shree Jagannath ॥
            </p>
            <p className="hero-eyebrow stagger" style={{ "--d": 1 }}>
              <i /> Together with their families <i />
            </p>
            <h1 className="stagger" style={{ "--d": 2 }}>
              <span className="foil name">Santosh</span>
              <span className="amp" aria-label="and">
                <span>&amp;</span>
              </span>
              <span className="foil name">Diptimayee</span>
            </h1>
            <p className="hero-subtitle stagger" style={{ "--d": 3 }}>
              request the honour of your presence
              <br /> as they begin their forever
            </p>

            <div className="hero-dates stagger" style={{ "--d": 4 }}>
              <div className="date-chip">
                <span className="date-label">
                  <Heart size={11} fill="currentColor" /> Wedding
                </span>
                <span className="date-day">
                  <b>02</b>
                  <span>
                    Dec 2026
                    <small>Wednesday</small>
                  </span>
                </span>
              </div>
              <div className="date-chip featured">
                <span className="date-label">
                  <Sparkles size={11} /> Reception
                </span>
                <span className="date-day">
                  <b>04</b>
                  <span>
                    Dec 2026
                    <small>Friday · 7 PM</small>
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="venue-card stagger" style={{ "--d": 5 }}>
            <span className="venue-card-shine" aria-hidden="true" />
            <div className="venue-card-head">
              <span className="pin-pulse">
                <MapPin size={20} fill="currentColor" />
              </span>
              <div>
                <span className="venue-kicker">The Venue</span>
                <strong>Nilamani Convention</strong>
                <small>Khordha, Odisha</small>
              </div>
            </div>
            <div className="venue-map">
              <iframe
                title="Map to Nilamani Convention, Khordha"
                src={mapEmbedUrl}
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a className="venue-map-tag" href={mapsUrl} {...external}>
                <MapPin size={12} fill="currentColor" /> Open in Maps ↗
              </a>
            </div>
            <div className="venue-actions" ref={heroActionsRef}>
              <a className="btn btn-gold" href={mapsUrl} {...external}>
                <Navigation size={17} /> Get Directions
              </a>
              <a className="btn btn-ghost" href={shareUrl} {...external}>
                <Share2 size={16} /> Share
              </a>
            </div>
          </div>
        </div>

        <a href="#blessing" className="scroll-cue" aria-label="Scroll to invitation">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* ───────────── BLESSING ───────────── */}
      <section className="blessing section reveal" id="blessing">
        <Divider />
        <p className="kicker">A note from our families</p>
        <h2>
          Two hearts.
          <br />
          <em>One beautiful journey.</em>
        </h2>
        <p className="lead">
          With the blessings of our elders and the love of our families, we
          invite you to join us as we begin a new chapter filled with laughter,
          togetherness, and countless cherished moments.
        </p>
        <div className="families">
          <div>
            <span>Groom's family</span>
            <strong>Prasanna Kumar Sahoo</strong>
            <small>&amp; Pratima Sahoo</small>
          </div>
          <div className="families-mark">✦</div>
          <div>
            <span>Bride's family</span>
            <strong>Kabindra Sahoo</strong>
            <small>&amp; Sabitri Sahoo</small>
          </div>
        </div>
      </section>

      {/* ───────────── COUPLE ───────────── */}
      <section className="couple section">
        <div className="heading reveal">
          <p className="kicker">The two of us</p>
          <h2>
            Meet the <em>couple</em>
          </h2>
        </div>
        <div className="couple-grid">
          <article className="person reveal">
            <div className="person-arch groom-bg">
              <div className="person-halo" />
              <Groom />
            </div>
            <span className="person-role">The Groom</span>
            <h3>
              Santosh <em>(Chintu)</em>
            </h3>
            <p>Son of Pratima Sahoo &amp; Prasanna Kumar Sahoo</p>
            <p className="person-place">
              <MapPin size={12} /> Paltanpada, Khordha, Odisha
            </p>
          </article>
          <div className="couple-heart reveal" aria-hidden="true">
            <Heart size={22} fill="currentColor" />
          </div>
          <article className="person reveal">
            <div className="person-arch bride-bg">
              <div className="person-halo" />
              <Bride />
            </div>
            <span className="person-role">The Bride</span>
            <h3>
              Diptimayee <em>(Minu)</em>
            </h3>
            <p>Daughter of Sabitri Sahoo &amp; Kabindra Sahoo</p>
            <p className="person-place">
              <MapPin size={12} /> Niabasti, Gopinathpur, Badamba, Cuttack
            </p>
          </article>
        </div>
      </section>

      {/* ───────────── COUNTDOWN ───────────── */}
      <section className="countdown-section section reveal">
        <Mandala className="countdown-mandala" />
        <p className="kicker light">The big day is coming</p>
        <h2>
          Counting down
          <br />
          <em>to forever</em>
        </h2>
        <div className="countdown" aria-label="Countdown to the wedding">
          {Object.entries(countdown).map(([label, value]) => (
            <div className="count" key={label}>
              <strong key={value}>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── EVENTS ───────────── */}
      <section className="events section">
        <div className="heading reveal">
          <p className="kicker">Join the celebration</p>
          <h2>
            Save the <em>dates</em>
          </h2>
        </div>
        <ol className="timeline draw">
          <li className="event reveal">
            <div className="event-date">
              <span>Dec</span>
              <b>01</b>
              <small>Tue</small>
            </div>
            <div className="event-body">
              <span className="event-kicker">Day one · Family rituals</span>
              <h3>Mangalakrutyā</h3>
              <p>A day of auspicious traditions and blessings as the celebrations begin.</p>
              <span className="event-meta">
                <CalendarDays size={14} /> Tuesday, 1 December 2026
              </span>
            </div>
            <Flower2 className="event-icon" size={40} strokeWidth={1} />
          </li>
          <li className="event reveal">
            <div className="event-date">
              <span>Dec</span>
              <b>02</b>
              <small>Wed</small>
            </div>
            <div className="event-body">
              <span className="event-kicker">Day two · The wedding</span>
              <h3>The Wedding Ceremony</h3>
              <p>The moment two lives become one. Your presence will make our day complete.</p>
              <span className="event-meta">
                <CalendarDays size={14} /> Wednesday, 2 December 2026
              </span>
            </div>
            <Heart className="event-icon" size={40} strokeWidth={1} />
          </li>
          <li className="event featured reveal">
            <div className="event-date">
              <span>Dec</span>
              <b>04</b>
              <small>Fri</small>
            </div>
            <div className="event-body">
              <span className="event-kicker">Day three · Reception</span>
              <h3>Reception &amp; Dinner</h3>
              <p>Come share a meal, warm wishes, and a joyful evening with our families.</p>
              <span className="event-meta">
                <Clock3 size={14} /> Friday, 4 December 2026 · 7:00 PM onwards
              </span>
              <span className="event-meta">
                <MapPin size={14} /> Nilamani Convention, Khordha
              </span>
              <a className="event-link" href={mapsUrl} {...external}>
                <Navigation size={14} /> Get directions
              </a>
            </div>
            <Sparkles className="event-icon" size={40} strokeWidth={1} />
          </li>
        </ol>
      </section>

      {/* ───────────── VENUE ───────────── */}
      <section className="venue section">
        <div className="venue-copy reveal">
          <p className="kicker">We'll save you a seat</p>
          <h2>
            Find us <em>here</em>
          </h2>
          <div className="venue-address">
            <MapPin size={22} />
            <div>
              <strong>Nilamani Convention</strong>
              <span>Khordha, Odisha, India</span>
            </div>
          </div>
          <a className="btn btn-wine" href={mapsUrl} {...external}>
            <Navigation size={17} /> Open in Google Maps
          </a>
        </div>
        <a className="venue-art reveal" href={mapsUrl} {...external} aria-label="Open the venue in Google Maps">
          <div className="venue-art-grid" />
          <svg className="venue-art-route" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-10 270 C80 250 90 170 170 160 S260 90 214 92" />
          </svg>
          <span className="venue-art-pin">
            <MapPin size={34} fill="currentColor" />
          </span>
          <span className="venue-art-label">
            <small>Your destination</small>
            <strong>Nilamani Convention</strong>
          </span>
          <span className="venue-art-corner">Tap to navigate ↗</span>
        </a>
      </section>

      {/* ───────────── CLOSING ───────────── */}
      <section className="closing section">
        <Mandala className="closing-mandala" />
        <p className="kicker light">Your presence is our present</p>
        <h2>
          Made more beautiful
          <br />
          <em>because of you</em>
        </h2>
        <p className="closing-sign">
          With love, blessings &amp; heartfelt gratitude —<br />
          <span className="foil script">Santosh &amp; Diptimayee</span>
          <br />& both families
        </p>
        <div className="closing-actions">
          <a className="btn btn-gold" href={wishesUrl} {...external}>
            <Heart size={16} /> Send your wishes
          </a>
          <a className="btn btn-ghost" href={shareUrl} {...external}>
            <Share2 size={16} /> Share invitation
          </a>
        </div>
      </section>
      <footer>
        Made with <Heart size={11} fill="currentColor" /> for Santosh &amp; Diptimayee · December 2026
      </footer>

      {/* ───────────── FLOATING DOCK ───────────── */}
      <nav className={`dock${dockVisible && introDone ? " show" : ""}`} aria-label="Quick actions">
        <a className="dock-main" href={mapsUrl} {...external}>
          <Navigation size={16} /> Directions
        </a>
        <a href={shareUrl} {...external} aria-label="Share invitation on WhatsApp">
          <Share2 size={16} /> Share
        </a>
      </nav>
    </main>
  );
}

function Divider() {
  return (
    <svg className="divider" viewBox="0 0 220 24" aria-hidden="true">
      <path d="M0 12 H86 M134 12 H220" stroke="currentColor" strokeWidth="1" />
      <path d="M110 2 L120 12 L110 22 L100 12Z" fill="none" stroke="currentColor" />
      <circle cx="110" cy="12" r="3" fill="currentColor" />
      <circle cx="92" cy="12" r="2" fill="currentColor" />
      <circle cx="128" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

createRoot(document.getElementById("root")).render(<App />);
