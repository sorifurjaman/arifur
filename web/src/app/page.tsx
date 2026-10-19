'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowDown,
  Headphones,
  Mail,
  Phone,
  MapPin,
  Lightbulb,
  Palette,
  Brush,
  Frame,
  CheckCircle2,
  ExternalLink,
  Bot,
  Globe,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { initialArtworks, artistProfile, Artwork } from '@/data/artworks';
import ArtworkModal from '@/components/ArtworkModal';
import KexartFullscreenTakeover from '@/components/KexartFullscreenTakeover';
import { useAudio } from '@/context/AudioContext';

export default function Home() {
  const [artworks] = useState<Artwork[]>(initialArtworks);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null);
  const [showKexartTakeover, setShowKexartTakeover] = useState<boolean>(false);
  const { playAudio, isPlaying, currentTrack } = useAudio();

  // Commission / Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Commission Request',
    artworkTitle: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = ['All', 'Portrait', 'Creative', 'Tech & Art', 'Visual'];

  const filteredArtworks =
    selectedCategory === 'All'
      ? artworks
      : artworks.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  const featuredArtworks = artworks.filter((a) => a.isFeatured);

  // Restore fullscreen stream if refreshed while watching
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const wasTakeover = sessionStorage.getItem('kexart_takeover_active');
        if (wasTakeover === 'true') {
          setShowKexartTakeover(true);
          playAudio();
        }
      }
    } catch {}
  }, []);

  // When Explore Gallery is pressed, launch KEXART Fullscreen Takeover with audio
  const handleExploreGalleryClick = (e?: React.MouseEvent | React.TouchEvent) => {
    console.log('>>> handleExploreGalleryClick fired! <<<');
    if (e) {
      e.stopPropagation();
    }
    setShowKexartTakeover(true);
    if (typeof window !== 'undefined' && (window as any).kexartRunTakeover) {
      (window as any).kexartRunTakeover();
    }
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('kexart_takeover_active', 'true');
        localStorage.setItem('kexart_audio_persist', 'true');
      }
    } catch {}
    try {
      playAudio();
    } catch (err) {
      console.warn('Audio play error:', err);
    }
    try {
      if (typeof document !== 'undefined' && !document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch {}
  };

  const handleInquireFromArtwork = (artwork: Artwork) => {
    setFormData((prev) => ({
      ...prev,
      inquiryType: 'Purchase Inquiry',
      artworkTitle: artwork.title,
      message: `I am interested in acquiring "${artwork.title}" (${artwork.medium}). Please share details.`,
    }));

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* 1. HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-16"
      >
        {/* Subtle Ambient Gradients */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-200/30 blur-3xl animate-pulse" />
          <div className="absolute top-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-amber-200/30 blur-3xl" />
          <div className="absolute bottom-[-15%] left-[25%] w-[55vw] h-[55vw] rounded-full bg-indigo-200/30 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-white/80 backdrop-blur-md mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-gray-700">
              Official Creative Portfolio
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-black tracking-tight leading-none mb-4">
            ARIFUR
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-gray-600 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Exploring the frontiers of contemporary art, computational aesthetics, and high-velocity digital architectures.
          </p>

          {/* Action CTAs with Instant Touch Response */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 relative z-20 w-full sm:w-auto">
            <button
              id="explore-gallery-btn"
              type="button"
              onClick={handleExploreGalleryClick}
              onTouchStart={handleExploreGalleryClick}
              onTouchEnd={handleExploreGalleryClick}
              className="px-8 py-4 bg-black text-white text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-black/20 font-semibold flex items-center justify-center gap-2 cursor-pointer touch-manipulation group"
            >
              <Headphones className="w-4 h-4 text-amber-300 group-hover:animate-pulse" />
              <span>Explore Gallery</span>
            </button>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent border border-black/20 text-black text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:bg-black/5 active:scale-95 font-semibold text-center touch-manipulation"
            >
              Connect & Commission
            </a>
          </div>

          {isPlaying && (
            <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Ambient Audio Active: {currentTrack.title}</span>
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1 opacity-60">
          <span className="text-[9px] tracking-[0.3em] uppercase text-gray-500 font-medium">
            Scroll Down
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-gray-400 animate-bounce" />
        </div>
      </section>

      {/* 2. SELECTED WORKS SECTION */}
      <section id="works" className="py-28 bg-[#fafafa] border-t border-black/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="text-gray-400 tracking-[0.3em] uppercase text-xs mb-3 font-semibold">
                Curated Collection
              </p>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-black">
                Selected Works
              </h2>
            </div>
            <a
              href="#gallery"
              onClick={handleExploreGalleryClick}
              className="hidden md:flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-black transition-colors font-medium group"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {featuredArtworks.map((artwork, idx) => (
              <div
                key={artwork.id}
                onClick={() => setActiveArtwork(artwork)}
                className={`group cursor-pointer flex flex-col ${
                  idx === 1 ? 'md:mt-16' : ''
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-gray-100 shadow-md border border-black/5">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center">
                    <span className="border border-black/20 bg-white/90 backdrop-blur-md text-black px-6 py-2.5 text-xs tracking-[0.2em] uppercase rounded-full shadow-lg font-medium">
                      View Details & Audio
                    </span>
                  </div>

                  {/* Audio badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-black/80 backdrop-blur-md text-white rounded-full text-[10px] tracking-wider uppercase shadow-md">
                    <Headphones className="w-3 h-3 text-amber-300" />
                    <span>Audio Commentary</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-serif font-bold text-black group-hover:text-gray-600 transition-colors">
                    {artwork.title}
                  </h3>
                  <div className="flex justify-between items-center text-gray-400 text-xs tracking-widest uppercase mt-1">
                    <span>{artwork.medium}</span>
                    <span>{artwork.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OWNER SPOTLIGHT — 20251203_160322.jpg SPECIAL LUXURY DESIGN */}
      <section id="owner" className="py-32 bg-white border-t border-black/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-100/40 via-emerald-100/30 to-transparent blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* The Masterpiece Portrait Frame for 20251203_160322.jpg */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-md w-full">
                {/* Luxury Multi-layer Frame */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 rounded-3xl opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative rounded-2xl overflow-hidden bg-black p-1 shadow-2xl border border-white/20">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                    <img
                      src="/images/20251203_160322.jpg"
                      alt="Arifur Jaman - Owner & Creator"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Bottom Tag inside photo */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-300">
                          Original Creator & Owner
                        </span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold tracking-wide">
                        Arifur Jaman
                      </h3>
                      <p className="text-xs text-white/70">
                        Founder • Arifur Hackworld & K
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Verified Badge */}
                <div className="absolute -bottom-6 -right-4 bg-white/95 backdrop-blur-xl border border-black/10 py-3 px-5 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Verified Owner</p>
                    <p className="text-xs font-bold text-black">Arifur Jaman</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Owner Details & Journey */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 text-black text-xs font-semibold tracking-widest uppercase">
                <span>The Visionary</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-serif font-bold text-black leading-tight">
                Arifur Jaman
              </h2>
              <p className="text-lg font-medium text-gray-700">
                Architect of Digital Innovations, Automation Systems & Contemporary Expression
              </p>

              <div className="space-y-4 text-gray-600 font-light leading-relaxed text-base pt-2">
                <p>
                  Welcome to my personal studio space. I am <strong>Arifur Jaman</strong>, founder of Arifur Hackworld. Over the years, I have architected high-impact Telegram bot ecosystems, robust web platforms, and mobile media utilities that empower creators and communities.
                </p>
                <p>
                  For me, programming and art share identical creative DNA: both demand bold vision, deliberate discipline, and the pursuit of uncompromising elegance.
                </p>
              </div>

              {/* Social Connect Pills */}
              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href={artistProfile.telegramGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neutral-100 hover:bg-black hover:text-white rounded-full text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Telegram Community</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a
                  href={artistProfile.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neutral-100 hover:bg-black hover:text-white rounded-full text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
                >
                  <span>Facebook Profile</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a
                  href={artistProfile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neutral-100 hover:bg-black hover:text-white rounded-full text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a
                  href={artistProfile.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-neutral-100 hover:bg-black hover:text-white rounded-full text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
                >
                  <span>Discord Server</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-black/10">
                {artistProfile.stats.map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-serif font-bold text-black">{stat.value}</p>
                    <p className="text-[10px] tracking-widest uppercase text-gray-500 font-bold mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DIGITAL ECOSYSTEM (BOTS, WEB & APPS FROM INFO.TXT) */}
      <section id="projects" className="py-28 bg-[#fafafa] border-t border-black/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-gray-400 tracking-[0.3em] uppercase text-xs mb-3 font-semibold">
              Software & Innovation
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
              Featured Creations by Arifur
            </h2>
            <div className="w-16 h-[1.5px] bg-black/20 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Telegram Bots */}
            <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-black/5">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-black">Telegram Bots</h3>
                  <p className="text-xs text-gray-500">Automation & Security</p>
                </div>
              </div>
              <ul className="space-y-4">
                {artistProfile.bots.slice(0, 5).map((bot, idx) => (
                  <li key={idx} className="group">
                    <a
                      href={bot.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-black group-hover:text-blue-600 transition-colors">
                          {bot.name}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-black" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{bot.desc}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Web Portals */}
            <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-black/5">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-black">Web Platforms</h3>
                  <p className="text-xs text-gray-500">Live Streaming & Tools</p>
                </div>
              </div>
              <ul className="space-y-4">
                {artistProfile.webProjects.slice(0, 5).map((proj, idx) => (
                  <li key={idx} className="group">
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-black group-hover:text-emerald-600 transition-colors">
                          {proj.name}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-black" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{proj.desc}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Mobile Apps */}
            <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-black/5">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-black">Mobile Apps</h3>
                  <p className="text-xs text-gray-500">Media, AI & Utilities</p>
                </div>
              </div>
              <ul className="space-y-4">
                {artistProfile.apps.map((app, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-neutral-50/70 border border-black/5">
                    <span className="font-semibold text-sm text-black block">
                      {app.name}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{app.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ART GALLERY SECTION */}
      <section id="gallery" className="py-28 bg-white border-t border-black/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-gray-400 tracking-[0.3em] uppercase text-xs mb-3 font-semibold">
              Visual Exhibition
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-black mb-4">
              Art Gallery
            </h2>
            <div className="w-16 h-[1.5px] bg-black/20 mx-auto" />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 text-xs tracking-[0.2em] uppercase rounded-full border transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-white border-black/10 text-gray-600 hover:border-black/30 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Artworks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtworks.map((artwork) => (
              <div
                key={artwork.id}
                onClick={() => setActiveArtwork(artwork)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] tracking-widest uppercase text-amber-300 mb-1">
                      {artwork.category}
                    </span>
                    <h3 className="text-2xl font-serif font-bold">{artwork.title}</h3>
                    <p className="text-xs text-white/80 mt-1">
                      {artwork.medium} • {artwork.year}
                    </p>
                  </div>

                  {/* Audio badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-black/80 backdrop-blur-md text-white rounded-full text-[10px] tracking-wider uppercase shadow-md">
                    <Headphones className="w-3 h-3 text-amber-300" />
                    <span>{artwork.audioDuration}</span>
                  </div>
                </div>

                <div className="p-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-black group-hover:text-gray-600 transition-colors">
                      {artwork.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{artwork.dimensions}</p>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-black font-semibold border-b border-black">
                    Audio Guide
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CREATIVE PROCESS SECTION */}
      <section id="process" className="py-28 bg-[#fafafa] border-t border-black/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <p className="text-gray-400 tracking-[0.3em] uppercase text-xs mb-3 font-semibold">
              Philosophy & Method
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-black mb-4">
              Creative Process
            </h2>
            <div className="w-16 h-[1.5px] bg-black/20 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: '01',
                title: 'Concept & Architecture',
                icon: Lightbulb,
                desc: 'Every project begins with a crystal-clear intent. Merging algorithmic precision with aesthetic balance.',
              },
              {
                num: '02',
                title: 'Color & Resonance',
                icon: Palette,
                desc: 'Selecting high-contrast chromatic harmonies and tonal moods that evoke deep focus and wonder.',
              },
              {
                num: '03',
                title: 'Craft & Execution',
                icon: Brush,
                desc: 'Iterative craftsmanship, whether sculpting code or refining high-resolution photography and canvas layers.',
              },
              {
                num: '04',
                title: 'Release & Legacy',
                icon: Frame,
                desc: 'Publishing polished, verified works that stand the test of time and provide genuine utility to communities.',
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="relative p-8 rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <span className="absolute top-6 right-6 text-4xl font-serif font-bold text-black/10 group-hover:text-black/20 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 mb-6 rounded-full bg-neutral-50 border border-black/10 flex items-center justify-center text-black shadow-sm group-hover:bg-black group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-black mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Quote Card */}
          <div className="mt-24 text-center max-w-3xl mx-auto p-10 bg-white rounded-2xl border border-black/5 shadow-sm">
            <blockquote className="text-2xl md:text-3xl font-serif text-gray-800 italic leading-relaxed">
              &quot;{artistProfile.quote.text}&quot;
            </blockquote>
            <p className="text-gray-500 mt-4 tracking-[0.2em] uppercase text-xs font-semibold">
              — {artistProfile.quote.author}
            </p>
          </div>
        </div>
      </section>

      {/* 7. COMMISSION & CONTACT SECTION */}
      <section id="contact" className="py-28 bg-white border-t border-black/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <p className="text-gray-400 tracking-[0.3em] uppercase text-xs mb-3 font-semibold">
              Direct Communication
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-black mb-4">
              Connect with Arifur
            </h2>
            <div className="w-16 h-[1.5px] bg-black/20 mx-auto mb-6" />
            <p className="text-gray-500 max-w-xl mx-auto font-light text-sm md:text-base">
              Have a bespoke project, bot request, or gallery inquiry? Reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            {/* Form */}
            <div className="bg-[#fafafa] p-8 md:p-10 rounded-2xl border border-black/5 shadow-sm">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-serif font-bold text-black">Message Delivered</h3>
                  <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Your message has reached Arifur Jaman. You can also message directly on Telegram @{artistProfile.telegramUser}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        inquiryType: 'Commission Request',
                        artworkTitle: '',
                        message: '',
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full border border-black text-xs uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all font-medium"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formData.artworkTitle && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 font-medium flex items-center justify-between">
                      <span>Inquiring about: <strong>{formData.artworkTitle}</strong></span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, artworkTitle: '' })}
                        className="text-amber-700 hover:text-black ml-2"
                      >
                        Clear
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors cursor-pointer"
                    >
                      <option value="Commission Request">Commission Request</option>
                      <option value="Telegram Bot Development">Telegram Bot Development</option>
                      <option value="Web / App Project">Web / App Project</option>
                      <option value="Purchase Inquiry">Purchase Inquiry</option>
                      <option value="Collaboration">Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Telegram Username or Phone
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="@username or phone"
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your requirements or idea..."
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 transition-all shadow-lg active:scale-[0.98]"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>

            {/* Direct Contact Card */}
            <div className="flex flex-col justify-between">
              <div className="bg-[#fafafa] border border-black/5 p-8 md:p-10 rounded-2xl shadow-sm space-y-8">
                <h3 className="text-2xl font-serif font-bold text-black">Official Channels</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center flex-shrink-0 bg-white">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Telegram Direct</p>
                      <a href={`https://t.me/${artistProfile.telegramUser}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-black hover:underline">
                        @{artistProfile.telegramUser}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center flex-shrink-0 bg-white">
                      <Globe className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Telegram Community</p>
                      <a href={artistProfile.telegramGroup} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-black hover:underline">
                        t.me/ArifurHackworld
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center flex-shrink-0 bg-white">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Email</p>
                      <a href={`mailto:${artistProfile.email}`} className="text-sm font-semibold text-black hover:underline">
                        {artistProfile.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-black/10">
                  <div className="flex gap-4">
                    <a
                      href={artistProfile.telegramGroup}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors bg-white shadow-sm"
                      title="Telegram"
                    >
                      <Bot className="w-4 h-4" />
                    </a>
                    <a
                      href={artistProfile.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors bg-white shadow-sm"
                      title="Facebook"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                    <a
                      href={artistProfile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors bg-white shadow-sm"
                      title="GitHub"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-xs uppercase tracking-widest font-semibold text-gray-700">
                      Open for Commissions & Collaborations 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-white border-t border-black/10 py-16 text-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <span className="text-3xl font-serif font-bold tracking-widest">ARIFUR</span>
              <p className="text-sm text-gray-500 max-w-sm mt-4 font-light leading-relaxed">
                Contemporary art, bot development, and digital architecture. Built with passion, discipline, and uncompromising aesthetic vision.
              </p>
              <p className="text-xs text-gray-400 mt-6 uppercase tracking-widest">
                Owner: <span className="text-black font-semibold">Arifur Jaman</span>
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Navigation
              </h4>
              <ul className="space-y-3 text-xs uppercase tracking-wider text-gray-600">
                <li><a href="#works" className="hover:text-black transition-colors">Selected Works</a></li>
                <li><a href="#owner" className="hover:text-black transition-colors">The Owner</a></li>
                <li><a href="#gallery" className="hover:text-black transition-colors">Art Gallery</a></li>
                <li><a href="#projects" className="hover:text-black transition-colors">Digital Projects</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Ecosystem
              </h4>
              <ul className="space-y-3 text-xs uppercase tracking-wider text-gray-600">
                <li><a href="#contact" className="hover:text-black transition-colors">Direct Inquiries</a></li>
                <li><span className="text-emerald-700 font-medium">● Mobile App (Non-Exit Cycle Mode)</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
            <p>© 2026 ARIFUR. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Artwork Modal with Audio Guide */}
      <ArtworkModal
        artwork={activeArtwork}
        onClose={() => setActiveArtwork(null)}
        onInquire={handleInquireFromArtwork}
      />

      {/* KEXART Rapid Image & Audio Fullscreen Takeover */}
      <KexartFullscreenTakeover
        isOpen={showKexartTakeover}
        onClose={() => {
          setShowKexartTakeover(false);
          try {
            if (typeof window !== 'undefined') {
              sessionStorage.removeItem('kexart_takeover_active');
            }
          } catch {}
        }}
      />
    </main>
  );
}
