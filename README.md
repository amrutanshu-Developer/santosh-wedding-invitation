# 💐 Santosh & Dipti Mayee — Wedding Invitation

A mobile-first digital wedding invitation built with **React** and **Vite**. Guests open one link on their phone and get the couple, the dates, a countdown, the venue on Google Maps, and buttons to send wishes or share the invitation on WhatsApp.

![Link preview](public/og-image.jpg)

## ✨ Features

- **Animated opening:** under a mandap arch and marigold toran, the groom walks in, then the bride. Garlands and hearts appear when they meet, petals fall, and a humble invitation message ends with an **Open Invitation** button. It's drawn with SVG and CSS, so there's no video to download.
- **Meet the couple:** arched portrait cards with illustrations of the bride and groom, plus family details.
- **Live countdown** to the wedding day.
- **Event timeline:** Mangalakrutyā (1 Dec), the Wedding (2 Dec) and the Reception (4 Dec).
- **Venue directions:** a Location button stays at the top of the screen, and Google Maps links sit in the venue section and on the Reception card.
- **WhatsApp:**
  - *Send your wishes* opens a chat with the family, with a ready-written wish.
  - *Share invitation* sends the date, venue, a Google Maps link and the invitation link.
- **Link preview:** a preview card (title, date, venue, image) appears when the link is pasted into WhatsApp, Facebook or Telegram.
- **Accessibility:** responsive layout, scroll-reveal animations, and support for the phone's "reduce motion" setting.

## 🚀 Getting started

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install
npm run dev
```

Then open the URL that Vite prints. To open the site on a phone on the same Wi-Fi, use the **Network** address (e.g. `http://192.168.x.x:5173`).

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the development server              |
| `npm run build`   | Build the production site into `dist/`    |
| `npm run preview` | Serve the production build locally        |

## 🛠️ Customising

| What                               | Where                                                       |
| ---------------------------------- | ----------------------------------------------------------- |
| Names, families, events, venue     | `src/main.jsx`                                              |
| Wedding date for the countdown     | `weddingDate` in `src/main.jsx`                             |
| Google Maps link                   | `mapsUrl` in `src/main.jsx`                                 |
| WhatsApp number for wishes         | `whatsappNumber` in `src/main.jsx` (country code, digits only) |
| Wish and share message text        | `rsvpText` / `shareUrl` in `src/main.jsx`                   |
| Opening animation and illustrations | `src/Intro.jsx`, `src/intro.css`                           |
| Colours, layout, page animations   | `src/styles.css`                                            |
| Link-preview title and description | `og:*` meta tags in `index.html`                            |
| Link-preview image (1200×630)      | `public/og-image.jpg`                                       |

## 🌐 Deploying

1. Set the public address of the site in `.env`, without a trailing slash:

   ```env
   VITE_SITE_URL=https://your-site.netlify.app
   ```

   WhatsApp only shows the preview image when its URL is absolute, and this value is used to build it.

2. Build and deploy the `dist/` folder to any static host, for example [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), or GitHub Pages.

   - **Netlify / Vercel:** import the repo, set the build command to `npm run build` and the output directory to `dist`, and add `VITE_SITE_URL` as an environment variable.

3. **Test the preview:** paste the link into WhatsApp. WhatsApp keeps old previews, so to see changes, add a query string such as `?v=2`.

### Sharing a local preview with ngrok

`vite.config.js` already allows outside hosts, so you can share the dev server like this:

```bash
npm run dev
ngrok http 5173
```

Use your free static ngrok domain (`ngrok http --url=your-name.ngrok-free.app 5173`) so the link stays the same. Put that domain in `VITE_SITE_URL` too.

## 📁 Project structure

```
├── index.html          # Page shell + link-preview (Open Graph) meta tags
├── public/
│   └── og-image.jpg    # Preview image for WhatsApp / social sharing
├── src/
│   ├── main.jsx        # Invitation page (all sections and content)
│   ├── Intro.jsx       # Opening animation + groom/bride illustrations
│   ├── intro.css       # Opening animation styles
│   └── styles.css      # Page styles
├── vite.config.js      # Vite config (network access, allowed hosts)
└── .env                # VITE_SITE_URL for absolute preview URLs
```

## 🧰 Built with

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [lucide-react](https://lucide.dev/) icons
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) and [DM Sans](https://fonts.google.com/specimen/DM+Sans) fonts

---

<p align="center">Made with ♥ for Santosh & Dipti Mayee · 2 December 2026</p>
