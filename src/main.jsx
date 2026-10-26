import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  MapPin,
  CalendarDays,
  Clock3,
  Heart,
  ArrowDown,
  Navigation,
  Sparkles,
  Flower2,
  Share2,
} from "lucide-react";
import Intro, { Groom, Bride } from "./Intro.jsx";
import "./styles.css";

const weddingDate = new Date("2026-12-02T09:00:00+05:30");
const mapsUrl = "https://maps.app.goo.gl/wipme7kBL4Uas3Cv8";
const whatsappNumber = "919853487141"; // Add a phone number with country code, e.g. 919876543210

function useCountdown() {
  const [time, setTime] = useState(() => getTimeLeft());
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
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function App() {
  const countdown = useCountdown();
  const [introDone, setIntroDone] = useState(false);
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const rsvpText = encodeURIComponent(
    "Congratulation! 🙏\n\n" +
      "Heartiest congratulations to Santosh & Dipti Mayee on their wedding. " +
      "Thank you so much for the warm invitation, it truly means a lot.\n\n" +
      "May Lord Jagannath bless you both with a lifetime of love, understanding and happiness. " +
      "Wishing you a beautiful journey together, filled with laughter, good health and many cherished memories.\n\n" +
      "Looking forward to celebrating with you and the family. 💐",
  );
  const rsvpUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${rsvpText}`
    : `https://wa.me/?text=${rsvpText}`;
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(
    `💐 You're invited to the wedding of Santosh & Dipti Mayee\n\n` +
      `📅 Wednesday, 2 December 2026\n` +
      `📍 Nilamani Convention, Khordha, Odisha\n` +
      `🗺️ Location: ${mapsUrl}\n\n` +
      `Invitation: ${window.location.origin}`,
  )}`;

  return (
    <main>
      {!introDone && <Intro onOpen={() => setIntroDone(true)} />}
      <div className="topline">
        <span className="topline-date">
          <span className="topline-flower">✳</span> 02 · 12 · 2026
        </span>
        <div className="topline-actions">
          <a href={mapsUrl} target="_blank" rel="noreferrer">
            <MapPin size={14} /> Location
          </a>
          <a href={shareUrl} target="_blank" rel="noreferrer">
            <Share2 size={14} /> Share
          </a>
        </div>
      </div>
      <section className="hero" id="home">
        <div className="hero-shade" />
        <div className="hero-content" key={introDone ? "shown" : "hidden"}>
          <div className="eyebrow">
            <span /> A CELEBRATION OF LOVE <span />
          </div>
          <p className="invite-line">Together with our families</p>
          <h1>
            Santosh <em>&</em>
            <br />
            Dipti Mayee
          </h1>
          <p className="hero-subtitle">
            invite you to be part of the beginning
            <br className="desktop-break" /> of their forever.
          </p>
          <div className="hero-events">
            <div>
              <span>
                <Heart size={12} /> WEDDING
              </span>
              <strong>Wed, 2 Dec 2026</strong>
            </div>
            <div>
              <span>
                <Sparkles size={12} /> RECEPTION
              </span>
              <strong>Fri, 4 Dec 2026</strong>
              <small>7:00 PM onwards</small>
            </div>
          </div>
          <div className="hero-venue">
            <div className="hero-venue-name">
              <MapPin size={18} />
              <div>
                <span>VENUE</span>
                <strong>Nilamani Convention</strong>
                <small>Khordha, Odisha</small>
              </div>
            </div>
            <iframe
              className="hero-map"
              title="Map to Nilamani Convention, Khordha"
              src="https://maps.google.com/maps?q=Nilamani%20Convention%20Khordha%20Odisha&z=15&output=embed"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              className="hero-directions"
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Navigation size={15} /> GET DIRECTIONS
            </a>
          </div>
          <a
            href="#celebration"
            className="scroll-cue"
            aria-label="Scroll to invitation"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={16} />
          </a>
        </div>
        <div className="hero-stamp" aria-hidden="true">
          <span>LOVE</span>
          <Heart size={20} fill="currentColor" />
          <span>FOREVER</span>
        </div>
      </section>

      <section className="blessing section-pad reveal" id="celebration">
        <div className="ornament">❦</div>
        <p className="eyebrow dark">A NOTE FROM OUR FAMILIES</p>
        <h2>
          Two hearts.
          <br />
          <em>One beautiful journey.</em>
        </h2>
        <p className="blessing-copy">
          With the blessings of our elders and the love of our families, we
          invite you to join us as we begin a new chapter filled with laughter,
          togetherness, and countless cherished moments.
        </p>
        <div className="family-names">
          <div>
            <span>GROOM'S FAMILY</span>
            <strong>Prasanna Kumar Sahoo</strong>
            <small>& Pratima Sahoo</small>
          </div>
          <div className="family-divider">✦</div>
          <div>
            <span>BRIDE'S FAMILY</span>
            <strong>Kabindra Sahoo</strong>
            <small>& Sabitri Sahoo</small>
          </div>
        </div>
      </section>

      <section className="couple-section section-pad">
        <div className="section-heading reveal">
          <p className="eyebrow dark">THE TWO OF US</p>
          <h2>
            Meet the <em>couple</em>
          </h2>
          <p>A new chapter, made even more special with you by our side.</p>
        </div>
        <div className="couple-grid">
          <article className="person-card groom reveal">
            <div className="person-art groom-art">
              <div className="sun-disc" />
              <Groom />
            </div>
            <div className="person-info">
              <span className="person-role">GROOM</span>
              <h3>
                Santosh <em>(Chintu)</em>
              </h3>
              <p>Son of Pratima Sahoo & Prasanna Kumar Sahoo</p>
              <span className="fine-line" />
              <p className="address-small">Paltanpada, Khordha, Odisha</p>
            </div>
          </article>
          <div className="between-heart reveal">
            <Heart size={25} strokeWidth={1.2} />
            <span>together</span>
          </div>
          <article className="person-card bride reveal">
            <div className="person-art bride-art">
              <div className="sun-disc" />
              <Bride />
            </div>
            <div className="person-info">
              <span className="person-role">BRIDE</span>
              <h3>
                Dipti Mayee <em>(Minu)</em>
              </h3>
              <p>Daughter of Sabitri Sahoo & Kabindra Sahoo</p>
              <span className="fine-line" />
              <p className="address-small">
                Niabasti, Gopinathpur, Badamba, Cuttack
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="countdown-section section-pad reveal">
        <div className="countdown-inner">
          <div className="countdown-copy">
            <p className="eyebrow">THE BIG DAY IS COMING</p>
            <h2>
              Counting down
              <br />
              <em>to forever.</em>
            </h2>
            <p>Save the date and come celebrate with us.</p>
          </div>
          <div className="countdown" aria-label="Countdown to the wedding">
            {Object.entries(countdown).map(([label, value]) => (
              <div className="count-unit" key={label}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="events section-pad">
        <div className="section-heading reveal">
          <p className="eyebrow dark">JOIN THE CELEBRATION</p>
          <h2>
            Save the <em>dates</em>
          </h2>
          <p>Three days of family, rituals, and beautiful memories.</p>
        </div>
        <div className="event-list">
          <article className="event-card reveal">
            <div className="event-date">
              <span>DEC</span>
              <strong>01</strong>
              <small>TUE</small>
            </div>
            <div className="event-detail">
              <span className="event-kicker">DAY ONE · FAMILY RITUALS</span>
              <h3>Mangalakrutyā</h3>
              <p>
                A day of auspicious traditions and blessings as the celebrations
                begin.
              </p>
              <div className="event-meta">
                <CalendarDays size={15} /> Tuesday, 1 December 2026
              </div>
            </div>
            <Flower2 className="event-flower" size={42} strokeWidth={1} />
          </article>
          <article className="event-card featured reveal">
            <div className="event-date">
              <span>DEC</span>
              <strong>02</strong>
              <small>WED</small>
            </div>
            <div className="event-detail">
              <span className="event-kicker">DAY TWO · THE WEDDING</span>
              <h3>The Wedding Ceremony</h3>
              <p>
                The moment two lives become one. Your presence will make our day
                complete.
              </p>
              <div className="event-meta">
                <CalendarDays size={15} /> Wednesday, 2 December 2026
              </div>
            </div>
            <Heart className="event-flower" size={42} strokeWidth={1} />
          </article>
          <article className="event-card reveal">
            <div className="event-date">
              <span>DEC</span>
              <strong>04</strong>
              <small>FRI</small>
            </div>
            <div className="event-detail">
              <span className="event-kicker">DAY THREE · RECEPTION</span>
              <h3>Reception & Dinner</h3>
              <p>
                Come share a meal, warm wishes, and a joyful evening with our
                families.
              </p>
              <div className="event-meta">
                <Clock3 size={15} /> Friday, 4 December 2026 · 7:00 PM
              </div>
              <a
                className="event-directions"
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Navigation size={14} /> Get directions to the venue
              </a>
            </div>
            <Sparkles className="event-flower" size={42} strokeWidth={1} />
          </article>
        </div>
      </section>

      <section className="venue-section section-pad reveal">
        <div className="venue-copy">
          <p className="eyebrow">WE'LL SAVE YOU A SEAT</p>
          <h2>
            Find us <em>here.</em>
          </h2>
          <p className="venue-intro">
            We can't wait to welcome you and celebrate together.
          </p>
          <div className="venue-name">
            <MapPin size={19} />
            <div>
              <strong>Nilamani Convention</strong>
              <span>Khordha, Odisha, India</span>
            </div>
          </div>
          <p className="venue-note">
            Please confirm the exact venue spelling and pin before sharing this
            invitation publicly.
          </p>
          <a
            className="map-button"
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Navigation size={17} /> OPEN IN GOOGLE MAPS <span>↗</span>
          </a>
        </div>
        <a
          className="map-art"
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open venue search in Google Maps"
        >
          <div className="map-grid" />
          <div className="map-route route-one" />
          <div className="map-route route-two" />
          <div className="map-pin">
            <MapPin size={28} fill="currentColor" />
          </div>
          <div className="map-label">
            <span>YOUR DESTINATION</span>
            <strong>Nilamani Convention</strong>
            <small>Khordha, Odisha</small>
          </div>
          <div className="map-corner">OPEN MAP ↗</div>
        </a>
      </section>

      <section className="closing section-pad">
        <div className="closing-ornament">✳</div>
        <p className="eyebrow">YOUR PRESENCE IS OUR PRESENT</p>
        <h2>
          Made more beautiful
          <br /> <em>because of you.</em>
        </h2>
        <p>
          With love, blessings, and heartfelt gratitude —<br />
          Santosh, Dipti Mayee & both families
        </p>
        <a
          className="rsvp-button"
          href={rsvpUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Heart size={16} /> SEND YOUR WISHES
        </a>
        <a
          className="rsvp-button share-button"
          href={shareUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Share2 size={16} /> SHARE INVITATION
        </a>
        <span className="closing-date">01 · 02 · 04 DECEMBER 2026</span>
      </section>
      <footer>
        <span>MADE WITH LOVE</span>
        <span className="footer-heart">♥</span>
        <span>SANTOSH & DIPTI MAYEE</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
