import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import HeroAnimation from './components/HeroAnimation';
import AboutSection from './components/AboutSection';
import TelegramBots from './components/TelegramBots';
import WebProjects from './components/WebProjects';
import MobileApps from './components/MobileApps';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import { PlaygroundProvider } from './context/PlaygroundContext';
import PlaygroundController from './components/PlaygroundController';
import PlaygroundHUD from './components/PlaygroundHUD';

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <PlaygroundProvider>
      <div className="relative min-h-screen bg-[#030407] text-white">
        {/* Global Animated Cosmic & Constellation Background */}
        <AnimatedBackground />

        {/* Physics Playground Interactive Overlay & Marbles */}
        <PlaygroundController />

        {/* Top Navbar */}
        <Navbar onContactClick={openContactModal} />

        {/* Hero Section with Cinematic Intro Animation & Canvas Particles */}
        <HeroAnimation onContactClick={openContactModal} />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <AboutSection onContactClick={openContactModal} />
          <TelegramBots />
          <WebProjects />
          <MobileApps />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Direct Contact Modal */}
        <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />

        {/* Floating Physics Playground HUD Controls */}
        <PlaygroundHUD />
      </div>
    </PlaygroundProvider>
  );
}
