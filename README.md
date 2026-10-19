# KEXART — Contemporary Art Portfolio & Gallery (Web + Mobile App)

Inspired by [kexart.com](https://kexart.com), this repository contains a complete, production-grade contemporary art portfolio and gallery ecosystem designed for contemporary artists, painters, and art galleries.

## Key Features

1. **Ambient Soundscape & Audio Guide Integration:**
   - **Web:** Ambient background music player with live soundwave animation and volume slider.
   - **Mobile App:** Background audio support, persistent bottom audio control pill, and dedicated per-artwork commentary audio player.
   - **Per-Artwork Audio Guide:** Each exhibited painting features an interactive audio commentary where the artist or curator narrates the vision, technique, and emotional dialogue behind the piece.

2. **Web Application (`/web`):**
   - **Framework:** Next.js (App Router, Turbopack, React 19).
   - **Typography & Styling:** Tailwind CSS with Google Fonts (*Playfair Display* for luxury serif headings, *Inter* for crisp body typography).
   - **Curated Sections:**
     - Hero Section with ambient gradients & scroll indicators.
     - Selected Works showcase.
     - The Artist (Mayank Parmar biography, milestones, and career metrics).
     - Art Gallery with category filters (*All, Abstract, Contemporary, Landscape, Minimalist*).
     - Interactive Artwork Modal with high-res viewer & audio commentary player.
     - Creative Process (4-step visual journey with Edgar Degas quote).
     - Commission & Contact section with bespoke request form & direct studio info.
     - **Admin Portal (`/admin`):** Dashboard to manage artworks, upload new paintings with audio guide links, and review commission inquiries.

3. **Mobile Application (`/mobile`):**
   - **Framework:** Flutter 3.x (Dart 3.x).
   - **Platform Support:** Android & iOS.
   - **Screens:**
     - `HomeScreen`: Hero artwork banner, ambient soundbar, featured horizontal carousel, artist spotlight.
     - `GalleryScreen`: Category chips, masonry-style card grid, audio badges.
     - `ArtworkDetailScreen`: Pinch-to-zoom interactive viewer, audio commentary player with scrubber, dimensions & medium specs, acquisition inquiry button.
     - `ArtistScreen`: Artist journey, 4-step creative process, milestone counters, quote card.
     - `CommissionScreen`: Direct commission request form with feedback dialog.
     - `MainNavigationScreen`: Bottom navigation bar with persistent floating audio player.

---

## Getting Started

### 1. Web Application (`web/`)

```bash
cd web
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public gallery.
Access the admin portal at [http://localhost:3000/admin](http://localhost:3000/admin).

To build for production:
```bash
npm run build
npm start
```

### 2. Mobile Application (`mobile/`)

```bash
cd mobile
flutter pub get
flutter run
```
Run tests and static analysis:
```bash
flutter analyze
flutter test
```
