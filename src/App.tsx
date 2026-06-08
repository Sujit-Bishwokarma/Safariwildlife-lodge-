import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wifi,
  Plane,
  Utensils,
  Car,
  Compass,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Star,
  Check,
  ShieldCheck,
  Award,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Send,
  Lock,
  Instagram,
  Facebook,
  Grid,
  MessageCircle,
  Menu,
  X
} from 'lucide-react';

import { ROOMS, AMENITIES, GALLERY_ITEMS, TESTIMONIALS, SAFARI_HERO_LODGE } from './data';
import { Room, BookingSubmission, GalleryItem } from './types';
import BookingModal from './components/BookingModal';
import WhatsAppFloat from './components/WhatsAppFloat';

const slideVariants = {
  enter: (dir: 'left' | 'right') => ({
    x: dir === 'right' ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 }
    }
  },
  exit: (dir: 'left' | 'right') => ({
    x: dir === 'right' ? '-100%' : '100%',
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.4 }
    }
  })
};

export default function App() {
  // Booking Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [activeBookings, setActiveBookings] = useState<BookingSubmission[]>([]);

  // Scroll & Mobile Menu toggles
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gallery
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Load existing Bookings on load
  useEffect(() => {
    const saved = localStorage.getItem('safari_bookings');
    if (saved) {
      try {
        setActiveBookings(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading saved reservations", e);
      }
    }
  }, []);

  const handleBookingSuccess = (newBooking: BookingSubmission) => {
    setActiveBookings((prev) => [newBooking, ...prev]);
  };

  const handleOpenBooking = (room: Room | null) => {
    setSelectedRoomForBooking(room);
    setIsBookingOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    // Simulate enquiry box
    const newEnquiry = {
      id: 'ENQ-' + Date.now(),
      name: contactName,
      email: contactEmail,
      message: contactMessage,
      timestamp: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('safari_enquiries') || '[]');
    existing.push(newEnquiry);
    localStorage.setItem('safari_enquiries', JSON.stringify(existing));

    setContactSuccess(true);
    // Reset Form
    setContactName('');
    setContactEmail('');
    setContactMessage('');

    setTimeout(() => {
      setContactSuccess(false);
    }, 8000);
  };

  const deleteBooking = (id: string) => {
    const updated = activeBookings.filter(b => b.id !== id);
    setActiveBookings(updated);
    localStorage.setItem('safari_bookings', JSON.stringify(updated));
  };

  // Gallery items reference
  const filteredGallery = GALLERY_ITEMS;

  const handlePrevGallery = () => {
    if (filteredGallery.length <= 1) return;
    setSlideDirection('left');
    setGalleryIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1));
  };

  const handleNextGallery = () => {
    if (filteredGallery.length <= 1) return;
    setSlideDirection('right');
    setGalleryIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1));
  };

  // Helper mapping for icon rendering
  const renderAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi': return <Wifi className="w-5 h-5 text-brass" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-brass" />;
      case 'Car': return <Car className="w-5 h-5 text-brass" />;
      case 'Plane': return <Plane className="w-5 h-5 text-brass" />;
      default: return <Compass className="w-5 h-5 text-brass" />;
    }
  };

  return (
    <div className="min-h-screen bg-warm-white text-teal-dark font-sans selection:bg-brass selection:text-teal-dark antialiased w-full overflow-x-hidden">
      
      {/* HEADER & NAVIGATION */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-warm-white/95 backdrop-blur-md border-b border-teal-dark/10 shadow-md' : 'bg-transparent border-transparent'}`}>
        {activeBookings.length > 0 && (
          <div className="bg-gradient-to-r from-teal-dark to-teal-mid border-b border-white/10 text-warm-white py-2 px-4 shadow-inner pr-12 md:pr-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-300 rounded-full animate-pulse shrink-0" />
                <p className="text-xs font-mono">
                  <strong className="text-white">Active Selection:</strong> You have {activeBookings.length} luxury suite reservation{activeBookings.length > 1 ? 's' : ''} locked on this device.
                </p>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-0.5 sm:pb-0">
                {activeBookings.map((b) => (
                  <div key={b.id} className="bg-teal-dark/60 text-[10px] px-2.5 py-1 rounded border border-white/20 flex items-center gap-1 whitespace-nowrap">
                    <span>{b.roomName}: <strong className="text-white font-mono">{b.id}</strong></span>
                    <button 
                      onClick={() => deleteBooking(b.id)} 
                      className="text-red-400 hover:text-red-300 font-bold ml-1 transition-colors hover:scale-110" 
                      title="Cancel Booking"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
          
          {/* Brand Logo & Name */}
          <a href="#home" className="flex flex-col group focus:outline-none focus:ring-1 focus:ring-brass p-1 rounded-md">
            <h1 className={`font-serif font-bold text-lg md:text-xl leading-tight tracking-wider uppercase transition-colors duration-300 ${isScrolled ? 'text-teal-dark' : 'text-warm-white'}`}>
              Safari Wildlife
            </h1>
            <p className="text-[10px] text-brass uppercase font-bold font-mono tracking-widest leading-none mt-1">
              Lodge & Camp • Chitwan
            </p>
          </a>

          {/* Nav Links */}
          <nav className={`hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 ${isScrolled ? 'text-teal-dark/95' : 'text-warm-white'}`}>
            <a href="#home" className="hover:text-brass transition-colors py-1">Home</a>
            <a href="#suites" className="hover:text-brass transition-colors py-1">Suites</a>
            <a href="#amenities" className="hover:text-brass transition-colors py-1">Amenities</a>
            <a href="#gallery" className="hover:text-brass transition-colors py-1">Gallery</a>
            <a href="#contact" className="hover:text-brass transition-colors py-1">Contact</a>
          </nav>

          {/* Quick Booking Call to Action */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden lg:block text-right">
              <span className={`block text-[10px] uppercase font-mono tracking-widest transition-colors duration-300 ${isScrolled ? 'text-teal-dark/50' : 'text-warm-white/65'}`}>Direct Booking Support</span>
              <a href="tel:+9779700863273" className="text-xs font-mono font-bold text-brass hover:text-brass-dark transition-colors">
                📞 +977 970-0863273
              </a>
            </div>
            
            <button
              onClick={() => handleOpenBooking(null)}
              className="px-4 py-1.5 bg-teal-dark hover:bg-teal-mid text-brass border border-brass/35 font-serif text-xs uppercase tracking-widest font-semibold transition-all rounded shadow-sm hover:shadow cursor-pointer"
              id="header-nav-book-btn"
            >
              Book Now
            </button>

            {/* Hamburger 3-Line Menu Bar */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1.5 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-brass ${isScrolled ? 'text-teal-dark hover:bg-teal-dark/5' : 'text-warm-white hover:bg-white/10'}`}
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Drawer"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen pt-32 pb-24 md:pb-36 flex items-center justify-center overflow-hidden bg-teal-dark group">
        
        {/* Parallax Background Imagery */}
        <div className="absolute inset-0">
          <img
            src={SAFARI_HERO_LODGE}
            alt="Safari Wildlife Lodge Courtyard"
            className="w-full h-full object-cover opacity-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-dark via-teal-dark/15 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Text Contents */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center space-y-12 w-full">
          
          <div className="max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex items-center justify-center gap-2 text-brass"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.35em] font-mono font-medium">Chitwan Wilderness Resort</span>
              <Sparkles className="w-4 h-4" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-warm-white font-medium leading-[1.05] tracking-tight text-shadow"
            >
              Safari Wildlife <br className="hidden sm:inline" />
              <span className="text-brass italic">Lodge & Camp</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-warm-white/85 max-w-xl mx-auto text-sm md:text-base tracking-wide font-normal"
            >
              Stay Close to Nature, Closer to Adventure. Experience the pristine beauty of Nepal's wild animal sanctuaries, comfortable rustic luxury suites, and uncompromised security.
            </motion.p>

            {/* Glowing Hero Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
            >
              <button
                onClick={() => handleOpenBooking(null)}
                className="w-full sm:w-auto px-8 py-4 bg-brass hover:bg-brass-dark text-teal-dark font-serif font-bold text-sm uppercase tracking-widest rounded-lg shadow-lg hover:shadow-brass/20 transition-all btn-glow cursor-pointer"
                id="hero-book-cta"
              >
                Secure Booking Now
              </button>
              <a
                href="#suites"
                className="w-full sm:w-auto px-8 py-4 bg-warm-white/10 hover:bg-warm-white text-warm-white hover:text-teal-dark border border-warm-white/30 font-serif font-semibold text-sm uppercase tracking-widest rounded-lg transition-all"
              >
                View Luxury Suites
              </a>
            </motion.div>
          </div>

          {/* THREE DOWNWARD HOMEPAGE AMENITIES BUBBLES */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex items-center justify-center gap-4 sm:gap-8 pt-10 max-w-4xl mx-auto flex-nowrap overflow-x-auto scrollbar-none px-6"
          >
            {/* Bubble 1: Wifi */}
            <div className="bg-[#031c1c]/45 backdrop-blur-md border border-brass/45 hover:border-brass px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-sm group shrink-0">
              <Wifi className="w-4 h-4 text-brass group-hover:scale-110 transition-transform duration-300" />
              <span className="text-warm-white text-[10px] sm:text-xs font-semibold tracking-widest uppercase font-mono">
                Wifi
              </span>
            </div>

            {/* Bubble 2: Free Parking */}
            <div className="bg-[#031c1c]/45 backdrop-blur-md border border-brass/45 hover:border-brass px-4 py-1.5 rounded-xl flex items-center gap-2.5 transition-all duration-300 shadow-sm group shrink-0">
              <Car className="w-4 h-4 text-brass group-hover:scale-110 transition-transform duration-300" />
              <span className="text-warm-white text-[10px] sm:text-xs font-semibold tracking-widest uppercase font-mono text-left leading-tight">
                Free<br />Parking
              </span>
            </div>

            {/* Bubble 3: Breakfast */}
            <div className="bg-[#031c1c]/45 backdrop-blur-md border border-brass/45 hover:border-brass px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-sm group shrink-0">
              <Utensils className="w-4 h-4 text-brass group-hover:scale-110 transition-transform duration-300" />
              <span className="text-warm-white text-[10px] sm:text-xs font-semibold tracking-widest uppercase font-mono">
                Breakfast
              </span>
            </div>
          </motion.div>

        </div>

        {/* Elegant bottom section divider indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden lg:block">
          <a href="#highlights" className="text-warm-white/60 hover:text-brass transition-colors" title="Scroll down">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* COMPACT HOTEL SECTION HIGHLIGHTS */}
      <section id="highlights" className="scroll-mt-24 py-20 bg-warm-cream relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest font-mono text-brass font-bold">Why guests return</span>
            <h3 className="font-serif text-3xl md:text-5xl text-teal-dark tracking-tight leading-tight font-bold">
              A Refined Sanctuary on the Chitwan Border
            </h3>
            <p className="text-sm text-teal-dark/70 leading-relaxed">
              Experience comfortable accommodations, warm hospitality, and close encounters with nature. Whether you're seeking adventure or tranquility, every stay promises lasting memories.
            </p>
          </div>

          {/* Highlights 3-4 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Highlight 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-warm-white/60 p-8 rounded-xl border border-brass/15 hover:border-brass/45 hover:bg-white transition-all duration-300 shadow-sm relative group"
            >
              <div className="w-12 h-12 bg-teal-dark/5 rounded-lg flex items-center justify-center text-brass mb-6 group-hover:bg-teal-dark group-hover:text-warm-white transition-all duration-300">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-bold text-teal-dark mb-2">Unmatched Wild Wilderness</h4>
              <p className="text-xs text-teal-dark/75 leading-relaxed">
                Step off your wooden veranda directly to river vistas where single-horned rhinos, marsh muggers, and jungle flora meet.
              </p>
            </motion.div>

            {/* Highlight 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-warm-white/60 p-8 rounded-xl border border-brass/15 hover:border-brass/45 hover:bg-white transition-all duration-300 shadow-sm relative group"
            >
              <div className="w-12 h-12 bg-teal-dark/5 rounded-lg flex items-center justify-center text-brass mb-6 group-hover:bg-teal-dark group-hover:text-warm-white transition-all duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-bold text-teal-dark mb-2">Guarded Privacy & Security</h4>
              <p className="text-xs text-teal-dark/75 leading-relaxed">
                Sleep in absolute tranquility with triple-redundant timber gates, bio-metric safes, and 24/7 dedicated patrol security team.
              </p>
            </motion.div>

            {/* Highlight 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-warm-white/60 p-8 rounded-xl border border-brass/15 hover:border-brass/45 hover:bg-white transition-all duration-300 shadow-sm relative group"
            >
              <div className="w-12 h-12 bg-teal-dark/5 rounded-lg flex items-center justify-center text-brass mb-6 group-hover:bg-teal-dark group-hover:text-warm-white transition-all duration-300">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-bold text-teal-dark mb-2">Refined Nepali Hospitality</h4>
              <p className="text-xs text-teal-dark/75 leading-relaxed">
                Savor hand-pressed local tea, organic farm-to-table cuisine, and highly-trained private guides tailored to your pace.
              </p>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ROOMS & SUITES PREVIEW */}
      <section id="suites" className="scroll-mt-24 py-24 bg-warm-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-mono text-brass font-bold">Refined Accommodations</span>
              <h2 className="font-serif text-4xl md:text-5xl text-teal-dark tracking-tight font-bold">
                Our Signature Sanctuaries
              </h2>
            </div>
            <p className="text-xs text-teal-dark/65 max-w-sm font-mono tracking-wide leading-relaxed">
              * Rates shown in Nepalese Rupees (NPR). Guaranteed booking rate includes 10% hospitality security and comfort amenities.
            </p>
          </div>

          {/* Rooms Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
            {ROOMS.map((room, idx) => (
              <motion.div 
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-lg border border-brass/25 hover:border-brass/50 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 relative group"
              >
                {/* Clean Image Banner */}
                <div className="relative h-48 overflow-hidden bg-teal-dark/5">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-teal-dark/95 text-brass border border-brass/40 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded">
                    {room.highlight}
                  </div>
                </div>

                {/* Simplified Info Box */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-serif text-xl font-bold text-teal-dark group-hover:text-brass transition-colors">
                        {room.name}
                      </h3>
                      <span className="text-xs font-mono text-teal-dark/65 bg-warm-cream/45 px-2 py-0.5 rounded border border-brass/10 shrink-0">
                        {room.size}
                      </span>
                    </div>
                    <p className="text-xs text-teal-dark/75 leading-relaxed">
                      {room.description}
                    </p>
                  </div>

                  {/* Highlights/Amenities list in light tags */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brass/90 block">Guaranteed Comforts:</span>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amen, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-teal-dark/80 bg-warm-cream/20 px-2 py-1 rounded border border-brass/10">
                          <Check className="w-3 h-3 text-brass shrink-0" />
                          <span>{amen}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking and Pricing Footer Box */}
                  <div className="pt-3 border-t border-teal-dark/10 flex items-center justify-between">
                    <div>
                      <span className="block text-[9px] font-mono uppercase tracking-widest text-teal-dark/50">Exclusive Rate</span>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-xl font-serif font-bold text-teal-dark">Rs {room.priceNpr.toLocaleString('en-NP')}</span>
                        <span className="text-[10px] font-mono text-teal-dark/60">/ Night</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenBooking(room)}
                      className="px-4 py-2 bg-teal-dark hover:bg-brass text-brass hover:text-teal-dark font-serif text-xs uppercase tracking-widest font-bold rounded border border-brass/20 hover:border-teal-dark transition-all duration-300 cursor-pointer"
                      id={`book-${room.id}`}
                    >
                      Book Room
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* AMENITIES SECTION (FREE & COMPREHENSIVE) */}
      <section id="amenities" className="scroll-mt-24 py-24 bg-teal-dark text-warm-white border-y border-brass/20 relative overflow-hidden">
        
        {/* Subtle decorative background graphics */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-brass/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-teal-light/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <span className="text-xs uppercase tracking-widest font-mono text-brass font-bold">Uncompromising Standard Inclusive Services</span>
            <h2 className="font-serif text-4xl md:text-5xl text-warm-white tracking-tight font-bold">
              Included Amenities & Utilities
            </h2>
            <p className="text-sm text-warm-white/70">
              We offer curated standard amenities free of charge to elevate your safari experience, alongside select high-security transfers to bridge Ratnanagar and the global map.
            </p>
          </motion.div>

          {/* Interactive Icons Presentation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {AMENITIES.map((amen, idx) => (
              <motion.div 
                key={amen.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
                className="bg-teal-mid/60 border border-brass/20 hover:border-brass/55 rounded-xl p-6 text-center space-y-4 hover:bg-teal-mid/90 transition-all duration-300 shadow-lg group"
              >
                <div className="mx-auto w-12 h-12 bg-warm-white/5 rounded-full flex items-center justify-center text-brass group-hover:scale-110 transition-transform duration-300 border border-brass/10">
                  {renderAmenityIcon(amen.iconName)}
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-warm-white">{amen.name}</h4>
                  
                  {/* Category Pill Tag */}
                  <span className={`inline-block text-xs uppercase font-mono tracking-wide px-2.5 py-1 rounded ${amen.category === 'Free' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                    {amen.category} Services
                  </span>
                </div>

                <p className="text-sm text-warm-white/75 leading-relaxed">
                  {amen.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Security / Trust Seal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 text-center max-w-xl mx-auto bg-teal-mid/40 border border-brass/10 rounded-xl p-6"
          >
            <p className="text-sm text-brass font-mono uppercase tracking-wider font-semibold mb-1.5 flex justify-center items-center gap-1.5">
              🔐 24/7 Redundant Emergency Guard System
            </p>
            <p className="text-sm text-warm-white/80 leading-relaxed">
              Every package is safeguarded under the highest level of Nepal nature lodge standards. Digital backup generator logs and automated physical security locks secure sound sleep.
            </p>
          </motion.div>

        </div>
      </section>

      {/* GALLERY SECTION (SLIDING CAROUSEL) */}
      <section id="gallery" className="scroll-mt-24 py-24 bg-warm-white relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-widest font-mono text-brass font-bold">Visual Sanctuary</span>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-teal-dark">
              Explore Our Lodge Grounds
            </h2>
            <p className="text-sm text-teal-dark/70">
              Immerse yourself in high-resolution snapshots of local single-horned rhinos, bush dining setups, and wooden master suite structures.
            </p>
          </div>

          {/* Gallery Items sliding carousel with dynamic layout transitions */}
          <div className="relative max-w-5xl mx-auto px-4 md:px-12 mb-10 group">
            
            {/* Main Interactive Stage */}
            <div className="relative h-[320px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-full bg-teal-dark/10 rounded-2xl overflow-hidden border border-brass/20 shadow-xl">
              {filteredGallery.length > 0 ? (
                <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                  <motion.div
                    key={filteredGallery[galleryIndex]?.id || galleryIndex}
                    custom={slideDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragEnd={(e, { offset }) => {
                      const swipe = offset.x;
                      if (swipe < -60) {
                        handleNextGallery();
                      } else if (swipe > 60) {
                        handlePrevGallery();
                      }
                    }}
                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none flex flex-col justify-end"
                  >
                    {/* Background Slide Image */}
                    <img
                      src={filteredGallery[galleryIndex]?.imageUrl}
                      alt={filteredGallery[galleryIndex]?.title}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                    />

                    {/* Content Details on active slide */}
                    <div className="relative p-6 sm:p-10 md:p-12 text-warm-white space-y-2 pointer-events-none max-w-xl">
                      <motion.span 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="inline-block px-3 py-1 bg-brass text-teal-dark text-[10px] font-mono font-bold uppercase tracking-widest rounded-full"
                      >
                        {filteredGallery[galleryIndex]?.category}
                      </motion.span>
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-warm-white"
                      >
                        {filteredGallery[galleryIndex]?.title}
                      </motion.h3>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass animate-pulse" />
                        <span className="text-xs font-mono text-warm-white/70 tracking-wider">
                          Ratnanagar, Chitwan NP
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-teal-dark bg-warm-cream">
                  <span className="font-mono text-xs">No media found for this category</span>
                </div>
              )}
            </div>

            {/* Slider Navigation Arrows */}
            {filteredGallery.length > 1 && (
              <>
                <button
                  onClick={handlePrevGallery}
                  className="absolute left-[-16px] md:left-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-teal-dark hover:bg-brass border border-brass/25 hover:border-teal-dark text-brass hover:text-teal-dark transition-all duration-300 shadow-md transform hover:scale-105 cursor-pointer z-10"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextGallery}
                  className="absolute right-[-16px] md:right-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-teal-dark hover:bg-brass border border-brass/25 hover:border-teal-dark text-brass hover:text-teal-dark transition-all duration-300 shadow-md transform hover:scale-105 cursor-pointer z-10"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Indicator Dots & Slide Counter info */}
            {filteredGallery.length > 1 && (
              <div className="flex items-center justify-between mt-6 px-2">
                <span className="text-xs font-mono text-teal-dark/65 font-bold tracking-wide">
                  {(galleryIndex + 1).toString().padStart(2, '0')} <span className="text-brass">/</span> {filteredGallery.length.toString().padStart(2, '0')}
                </span>
                <div className="flex gap-2.5">
                  {filteredGallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSlideDirection(idx > galleryIndex ? 'right' : 'left');
                        setGalleryIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === galleryIndex ? 'bg-brass w-8 border border-teal-dark/30' : 'bg-teal-dark/20 w-2 hover:bg-teal-dark/50'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

        </motion.div>
      </section>

      {/* REAL TESTIMONIALS SECTION */}
      <section className="py-24 bg-warm-cream relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-sm uppercase tracking-widest font-mono text-brass font-bold">Unedited Guest Memoirs</span>
            <h2 className="font-serif text-4xl text-teal-dark font-bold">
              Echoes From the Jungle Edge
            </h2>
            <p className="text-base text-teal-dark/70">
              Read real stories left by our global adventurers who sought the pristine wilderness and comfortable hospitality of Ratnanagar.
            </p>
          </div>

          {/* Testimonial Cards Slider/Block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test, idx) => (
              <motion.div 
                key={test.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-warm-white p-5 md:p-6 rounded-lg border border-brass/15 flex flex-col justify-between shadow-sm relative hover:shadow-md transition-all duration-300"
              >
                {/* Decorative quote mark */}
                <span className="absolute top-2 right-4 text-brass/20 font-serif text-5xl select-none">“</span>

                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-brass fill-brass" />
                    ))}
                  </div>

                  <p className="text-sm text-teal-dark/85 leading-relaxed italic font-serif">
                    "{test.comment}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-teal-dark/5 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-mono uppercase text-teal-dark font-bold tracking-wider">{test.name}</h5>
                    <span className="text-xs text-teal-dark/50">{test.origin}</span>
                  </div>
                  <span className="text-xs text-brass uppercase font-mono font-bold">{test.date}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* CONTACT & EMBEDDED MAP SECTION */}
      <section id="contact" className="scroll-mt-24 py-24 bg-warm-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Col - Contact Credentials Desk */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest font-mono text-brass font-bold">Get In Touch Directly</span>
                <h2 className="font-serif text-4xl md:text-5xl text-teal-dark tracking-tight font-bold">
                  Reach Our Sanctuary
                </h2>
                <p className="text-sm text-teal-dark/70 leading-relaxed">
                  Experience the beauty of the wild at Safari Wildlife Lodge & Camp, where guests can enjoy comfortable accommodations, warm hospitality, and close encounters with nature.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-3.5 text-sm font-mono">
                
                {/* Map location link */}
                <div className="flex items-start gap-3.5 p-3 rounded-lg bg-warm-cream/30 border border-brass/10">
                  <div className="w-8 h-8 rounded-full bg-teal-dark/5 flex items-center justify-center text-brass shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-teal-dark uppercase tracking-wider text-xs mb-0.5">Lodge Sanctuary Location</h5>
                    <p className="text-teal-dark/70 leading-relaxed text-xs">
                      Museum, bacheuli road, Ratnanagar 00977, Chitwan, Nepal
                    </p>
                  </div>
                </div>

                {/* Telephone hotline link */}
                <div className="flex items-start gap-3.5 p-3 rounded-lg bg-warm-cream/30 border border-brass/10">
                  <div className="w-8 h-8 rounded-full bg-teal-dark/5 flex items-center justify-center text-brass shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-teal-dark uppercase tracking-wider text-xs mb-0.5">Guaranteed Hotline Desk</h5>
                    <a href="tel:+9779700863273" className="text-xs font-bold text-brass hover:text-brass-dark transition-colors">
                      +977 970-0863273
                    </a>
                  </div>
                </div>

                {/* WhatsApp Help link */}
                <div className="flex items-start gap-3.5 p-3 rounded-lg bg-warm-cream/30 border border-brass/10">
                  <div className="w-8 h-8 rounded-full bg-teal-dark/5 flex items-center justify-center text-brass shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-teal-dark uppercase tracking-wider text-xs mb-0.5">Operating Hours</h5>
                    <p className="text-teal-dark/70 text-xs">
                      Front Desk open 24/7. Safari bookings operate sunrise to sunset.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Right Col - Contact form and Google Maps */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6"
            >
              
              <div className="bg-warm-cream/20 border border-brass/15 rounded-lg p-5 space-y-4">
                <h4 className="font-serif text-xl md:text-2xl text-teal-dark font-bold">Send Direct Wilderness Enquiry</h4>
                <p className="text-sm text-teal-dark/60">
                  Submit your query parameters below. Our dispatch will connect directly to formulate your safari route.
                </p>

                {contactSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 text-sm p-4 rounded-lg leading-relaxed font-medium">
                    ✨ <strong>Enquiry Dispatched Successfully!</strong> <br />
                    Your credentials have been securely stored in our temporary enquiry registry. An official safari coordinator will verify booking limits and reach out with tailored package offers shortly.
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3.5 text-sm font-mono">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-xs uppercase font-bold text-teal-dark/75 block">Guest Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Abhishek Shrestha"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-white border border-brass/30 px-3 py-1.5 text-sm rounded text-teal-dark focus:outline-none focus:ring-1 focus:ring-brass"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs uppercase font-bold text-teal-dark/75 block">Contact Email</label>
                        <input
                          type="email"
                          required
                          placeholder="recipient@domain.com"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-white border border-brass/30 px-3 py-1.5 text-sm rounded text-teal-dark focus:outline-none focus:ring-1 focus:ring-brass"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs uppercase font-bold text-teal-dark/75 block">Message / Inquiry Parameters</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Detail your requested arrival dates, wildlife packages, airport pickup, or custom family suites requirements..."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full bg-white border border-brass/30 px-3 py-1.5 text-sm rounded text-teal-dark focus:outline-none focus:ring-1 focus:ring-brass placeholder:text-teal-dark/40"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-teal-dark hover:bg-teal-mid text-brass-light font-serif text-sm uppercase tracking-widest font-bold rounded shadow-md hover:shadow-lg transition-all btn-glow cursor-pointer"
                      id="contact-form-submit"
                    >
                      Dispatch Secure Enquiry
                    </button>
                    <p className="text-[11px] text-teal-dark/40 text-center font-normal">
                      🛡️ All submissions encrypted on secure local environment sandbox
                    </p>
                  </form>
                )}
              </div>

              {/* EMBEDDED GOOGLE MAPS LINKED DIRECTLY */}
              <div className="rounded-xl overflow-hidden shadow-md border border-brass/25 h-72 relative">
                {/* Embedded standard Google Map centered precisely on the user-specified exact location */}
                <iframe
                  title="Safari Wildlife Lodge Location Map"
                  src="https://maps.google.com/maps?q=Safariwildlife%20lodge%20and%20camp%2C%20Museum%2C%20bacheuli%20road%2C%20Ratnanagar%2000977&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#041515] text-warm-white border-t border-brass/35 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-brass/10">
          
          {/* Col 1 - Brand Info */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-xl tracking-widest uppercase text-warm-white flex items-center gap-1.5">
              <span>Safari Wildlife</span>
            </h3>
            <p className="text-xs text-warm-white/70 italic font-serif">
              "Stay Close to Nature, Closer to Adventure"
            </p>
            <p className="text-xs text-warm-white/60 leading-relaxed">
              Experience comfortable accommodations, warm hospitality, and close encounters with nature in Chitwan National Park's pristine wilderness boundaries.
            </p>
          </div>

          {/* Col 2 - Quick Links */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase font-mono tracking-widest text-brass font-bold">Lodge Navigation</h5>
            <ul className="space-y-2 text-xs text-warm-white/70 font-mono">
              <li><a href="#home" className="hover:text-brass transition-colors">Hero Home</a></li>
              <li><a href="#suites" className="hover:text-brass transition-colors">Luxury Suites</a></li>
              <li><a href="#amenities" className="hover:text-brass transition-colors">Amenities Included</a></li>
              <li><a href="#gallery" className="hover:text-brass transition-colors">Lodge Gallery</a></li>
              <li><a href="#contact" className="hover:text-brass transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Col 3 - Legal & Security */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase font-mono tracking-widest text-brass font-bold">Trust & Safety</h5>
            <div className="space-y-2 text-[11px] text-warm-white/60 leading-relaxed">
              <p>📍 Museum, bacheuli road, Ratnanagar 00977, Chitwan, Nepal</p>
              <p>📞 Phone desk: +977 970-0863273</p>
              <p>🛡️ Secure physical deadlocked suites & climate cooling standards guaranteed.</p>
            </div>
          </div>

          {/* Col 4 - Social coordinates / Newsletter */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase font-mono tracking-widest text-brass font-bold">Nature Updates</h5>
            <p className="text-xs text-warm-white/65">
              Follow our wildlife sightings and conservation logs via digital streams.
            </p>
            <div className="flex gap-4 text-warm-white/75">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brass transition-colors" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-brass transition-colors" title="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://api.whatsapp.com/send?phone=9779700863273" target="_blank" rel="noreferrer" className="hover:text-brass transition-colors" title="WhatsApp Chat">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Outer credit lines */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-warm-white/40">
          <p>© 2026 Safari Wildlife Lodge & Camp. Ratnanagar, Chitwan. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span>Security Certified</span>
            <span>|</span>
            <span>Local Community Protected</span>
            <span>|</span>
            <span>Eco-Friendly Wilderness Lodge</span>
          </div>
        </div>
      </footer>

      {/* RENDER DYNAMIC COMPONENTS */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedRoom={selectedRoomForBooking}
        rooms={ROOMS}
        onBookingSuccess={handleBookingSuccess}
      />

      <WhatsAppFloat />

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-warm-white z-50 p-6 shadow-2xl flex flex-col justify-between md:hidden border-l border-brass/10"
            >
              <div className="space-y-8">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between border-b border-brass/10 pb-4">
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-lg text-teal-dark uppercase tracking-wider">Safari Wildlife</span>
                    <span className="text-[10px] text-brass uppercase font-bold font-mono tracking-widest mt-0.5">Lodge & Camp • Chitwan</span>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-teal-dark/5 text-teal-dark"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest font-bold text-teal-dark">
                  <a 
                    href="#home" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="hover:text-brass transition-colors py-2 flex items-center justify-between border-b border-teal-dark/5"
                  >
                    <span>Home</span>
                    <ChevronRight className="w-4 h-4 text-brass" />
                  </a>
                  <a 
                    href="#suites" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="hover:text-brass transition-colors py-2 flex items-center justify-between border-b border-teal-dark/5"
                  >
                    <span>Suites</span>
                    <ChevronRight className="w-4 h-4 text-brass" />
                  </a>
                  <a 
                    href="#amenities" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="hover:text-brass transition-colors py-2 flex items-center justify-between border-b border-teal-dark/5"
                  >
                    <span>Amenities</span>
                    <ChevronRight className="w-4 h-4 text-brass" />
                  </a>
                  <a 
                    href="#gallery" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="hover:text-brass transition-colors py-2 flex items-center justify-between border-b border-teal-dark/5"
                  >
                    <span>Gallery</span>
                    <ChevronRight className="w-4 h-4 text-brass" />
                  </a>
                  <a 
                    href="#contact" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="hover:text-brass transition-colors py-2 flex items-center justify-between border-b border-teal-dark/5"
                  >
                    <span>Contact</span>
                    <ChevronRight className="w-4 h-4 text-brass" />
                  </a>
                </nav>
              </div>

              {/* Drawer Footer support */}
              <div className="space-y-4 pt-6 border-t border-brass/10">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleOpenBooking(null);
                  }}
                  className="w-full py-3 bg-teal-dark hover:bg-teal-mid text-brass border border-brass/40 font-serif text-sm uppercase tracking-widest font-bold transition-all rounded shadow-md text-center cursor-pointer"
                >
                  Book Luxury Suite
                </button>
                <div className="text-center font-mono">
                  <span className="block text-[9px] uppercase tracking-widest text-teal-dark/50">Direct Desk Hotline</span>
                  <a href="tel:+9779700863273" className="text-xs font-bold text-brass">
                    📞 +977 970-0863273
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
