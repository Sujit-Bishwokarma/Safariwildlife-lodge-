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
  X,
  Trash2,
  Plus,
  Edit3,
  Download,
  Upload,
  Unlock,
  Settings,
  Database,
  RefreshCw,
  History
} from 'lucide-react';

import { ROOMS, AMENITIES, GALLERY_ITEMS, TESTIMONIALS, SAFARI_HERO_LODGE, SAFARI_LODGE_LOGO } from './data';
import { Room, BookingSubmission, GalleryItem, Testimonial, Amenity } from './types';
import BookingModal from './components/BookingModal';
import WhatsAppFloat from './components/WhatsAppFloat';
import backupData from '../safari_lodge_database_backup_2026-06-10.json';

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
  // Admin Token & Control Panel state
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Dynamic state loaded on mount, using local storage or fallback to static data
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('safari_dynamic_rooms');
    if (saved) {
      try {
        const parsed: Room[] = JSON.parse(saved);
        // Auto-repair stale paths stored in user's browser localStorage cache
        return parsed.map(room => {
          const fallback = ROOMS.find(r => r.id === room.id);
          if (fallback) {
            const isStale = !room.imageUrl || 
                            room.imageUrl.includes('localhost:') || 
                            room.imageUrl.includes('127.0.0.1:') || 
                            room.imageUrl.includes('0.0.0.0:') ||
                            room.imageUrl.includes('/src/assets/images/') ||
                            room.imageUrl === '[object Object]';
            if (isStale) {
              return { ...room, imageUrl: fallback.imageUrl };
            }
          }
          return room;
        });
      } catch (e) {
        console.error(e);
      }
    }
    return ROOMS;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('safari_dynamic_gallery');
    if (saved) {
      try {
        const parsed: GalleryItem[] = JSON.parse(saved);
        // Auto-repair stale paths stored in user's browser localStorage cache
        return parsed.map(item => {
          const fallback = GALLERY_ITEMS.find(g => g.id === item.id);
          if (fallback) {
            const isStale = !item.imageUrl || 
                            item.imageUrl.includes('localhost:') || 
                            item.imageUrl.includes('127.0.0.1:') || 
                            item.imageUrl.includes('0.0.0.0:') ||
                            item.imageUrl.includes('/src/assets/images/') ||
                            item.imageUrl === '[object Object]';
            if (isStale) {
              return { ...item, imageUrl: fallback.imageUrl };
            }
          }
          return item;
        });
      } catch (e) {
        console.error(e);
      }
    }
    return GALLERY_ITEMS;
  });

  const [amenities, setAmenities] = useState<Amenity[]>(() => {
    const saved = localStorage.getItem('safari_dynamic_amenities');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return AMENITIES;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('safari_dynamic_testimonials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return TESTIMONIALS;
  });

   const [heroBgImage, setHeroBgImage] = useState<string>(() => {
    const saved = localStorage.getItem('safari_dynamic_hero_bg');
    if (saved && saved !== 'undefined' && saved !== 'null' && saved.trim() !== '' && saved !== '[object Object]') {
      const isStale = saved.includes('localhost:') || 
                      saved.includes('127.0.0.1:') || 
                      saved.includes('0.0.0.0:') ||
                      saved.includes('/src/assets/images/');
      if (!isStale) {
        return saved;
      }
    }
    // Pull the gorgeous hero background from backupData if available
    if (backupData && typeof backupData === 'object' && Array.isArray((backupData as any).galleryItems)) {
      const gallery = (backupData as any).galleryItems;
      const viewItem = gallery.find((item: any) => item.title === 'View' || item.id === 'g-1781021834340');
      if (viewItem && viewItem.imageUrl) {
        return viewItem.imageUrl;
      }
      if (gallery[0] && gallery[0].imageUrl) {
        return gallery[0].imageUrl;
      }
    }
    // Deep fallback to a gorgeous, premium Unsplash resort courtyard image if SAFARI_HERO_LODGE fails or is falsy
    return SAFARI_HERO_LODGE || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80';
  });

  const [brandLogoImage, setBrandLogoImage] = useState<string>(() => {
    const saved = localStorage.getItem('safari_dynamic_logo');
    if (saved && saved !== 'undefined' && saved !== 'null' && saved.trim() !== '' && saved !== '[object Object]') {
      const isStale = saved.includes('localhost:') || 
                      saved.includes('127.0.0.1:') || 
                      saved.includes('0.0.0.0:') ||
                      saved.includes('/src/assets/images/');
      if (!isStale) {
        return saved;
      }
    }
    return SAFARI_LODGE_LOGO;
  });

  const [instagramUrl, setInstagramUrl] = useState<string>(() => {
    return localStorage.getItem('safari_social_instagram') || 'https://instagram.com';
  });
  const [facebookUrl, setFacebookUrl] = useState<string>(() => {
    return localStorage.getItem('safari_social_facebook') || 'https://facebook.com';
  });
  const [whatsappPhone, setWhatsappPhone] = useState<string>(() => {
    return localStorage.getItem('safari_social_whatsapp') || '9779700863273';
  });

  const [gmailEnquiryTarget, setGmailEnquiryTarget] = useState<string>(() => {
    return localStorage.getItem('safari_enquiry_gmail') || 'safarilodgechitwan@gmail.com';
  });

  // Auto-apply the uploaded backup JSON file if first time loading
  useEffect(() => {
    const backupApplied = localStorage.getItem('safari_applied_backup_2026-06-16');
    if (!backupApplied && backupData && typeof backupData === 'object') {
      try {
        let applied = false;
        if (Array.isArray((backupData as any).rooms)) {
          setRooms((backupData as any).rooms);
          localStorage.setItem('safari_dynamic_rooms', JSON.stringify((backupData as any).rooms));
          applied = true;
        }
        if (Array.isArray((backupData as any).galleryItems)) {
          setGalleryItems((backupData as any).galleryItems);
          localStorage.setItem('safari_dynamic_gallery', JSON.stringify((backupData as any).galleryItems));
          applied = true;
          
          // Extrapolate the custom hero background from the backup database
          const gallery = (backupData as any).galleryItems;
          const viewItem = gallery.find((item: any) => item.title === 'View' || item.id === 'g-1781021834340');
          if (viewItem && viewItem.imageUrl) {
            setHeroBgImage(viewItem.imageUrl);
            localStorage.setItem('safari_dynamic_hero_bg', viewItem.imageUrl);
          } else if (gallery[0] && gallery[0].imageUrl) {
            setHeroBgImage(gallery[0].imageUrl);
            localStorage.setItem('safari_dynamic_hero_bg', gallery[0].imageUrl);
          }
        }
        if (Array.isArray((backupData as any).testimonials)) {
          setTestimonials((backupData as any).testimonials);
          localStorage.setItem('safari_dynamic_testimonials', JSON.stringify((backupData as any).testimonials));
          applied = true;
        }
        if (Array.isArray((backupData as any).amenities)) {
          setAmenities((backupData as any).amenities);
          localStorage.setItem('safari_dynamic_amenities', JSON.stringify((backupData as any).amenities));
          applied = true;
        }
        if (Array.isArray((backupData as any).activeBookings)) {
          setActiveBookings((backupData as any).activeBookings);
          localStorage.setItem('safari_bookings', JSON.stringify((backupData as any).activeBookings));
          applied = true;
        }
        if (Array.isArray((backupData as any).enquiries)) {
          setEnquiries((backupData as any).enquiries);
          localStorage.setItem('safari_enquiries', JSON.stringify((backupData as any).enquiries));
          applied = true;
        }
        if (applied) {
          localStorage.setItem('safari_applied_backup_2026-06-16', 'true');
          console.log('⚡ Applied safari_lodge_database_backup_2026-06-10.json configuration successfully with updated prices');
        }
      } catch (err) {
        console.error('Failed to auto-apply database backup', err);
      }
    }
  }, []);

  // One-time cache clear to force-apply the upgraded WA0015 logo asset
  useEffect(() => {
    const updatedLogoDone = localStorage.getItem('safari_logo_updated_20260606');
    if (!updatedLogoDone) {
      localStorage.removeItem('safari_dynamic_logo');
      setBrandLogoImage(SAFARI_LODGE_LOGO);
      localStorage.setItem('safari_logo_updated_20260606', 'true');
    }
  }, []);

  // Check URL parameter for admin access on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      localStorage.setItem('safari_admin_token', 'true');
      setIsAdmin(true);
      setIsAdminPanelOpen(true);
      // Clean query parameter from URL bar
      const newUrl = window.location.pathname;
      window.history.replaceState(null, '', newUrl);
    } else {
      const savedToken = localStorage.getItem('safari_admin_token');
      if (savedToken === 'true') {
        setIsAdmin(true);
      }
    }
  }, []);

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

  // Reviews Slide Show
  const [reviewsIndex, setReviewsIndex] = useState<number>(0);
  const [reviewsDirection, setReviewsDirection] = useState<'left' | 'right'>('right');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Admin states & forms
  const [adminTab, setAdminTab] = useState<'rooms' | 'gallery' | 'amenities' | 'hero' | 'reviews' | 'backup'>('rooms');
  const [adminStatusMsg, setAdminStatusMsg] = useState<string | null>(null);
  const [compressingImage, setCompressingImage] = useState(false);

  // Amenities editing/adding form state
  const [editingAmenityId, setEditingAmenityId] = useState<string | null>(null);
  const [amenityForm, setAmenityForm] = useState<Partial<Amenity>>({
    id: '',
    name: '',
    category: 'Free',
    description: '',
    iconName: 'Compass'
  });

  // Room editing/adding form state
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [roomForm, setRoomForm] = useState<Partial<Room>>({
    id: '',
    name: '',
    description: '',
    size: '50 m²',
    bedType: '1 Extra-Large King Bed',
    capacity: 2,
    view: 'Jungle & River View',
    priceNpr: 15000,
    imageUrl: '',
    amenities: [],
    highlight: ''
  });
  const [roomAmenityInput, setRoomAmenityInput] = useState('');

  // Gallery editing/adding form state
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryForm, setGalleryForm] = useState<Partial<GalleryItem>>({
    id: '',
    title: '',
    category: 'Lodge',
    imageUrl: ''
  });

  // Reviews editing/adding form state
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({
    id: '',
    name: '',
    origin: '',
    rating: 5,
    comment: '',
    date: ''
  });

  // Guest inquiries/leads list inside admin panel
  const [enquiries, setEnquiries] = useState<any[]>([]);

  useEffect(() => {
    if (isAdmin) {
      const savedEnq = localStorage.getItem('safari_enquiries');
      if (savedEnq) {
        try {
          setEnquiries(JSON.parse(savedEnq));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [isAdmin, isAdminPanelOpen]);

  const refreshEnquiries = () => {
    const savedEnq = localStorage.getItem('safari_enquiries');
    if (savedEnq) {
      try {
        setEnquiries(JSON.parse(savedEnq));
      } catch (e) {
        console.error(e);
      }
    } else {
      setEnquiries([]);
    }
  };

  const triggerAdminStatus = (msg: string) => {
    setAdminStatusMsg(msg);
    setTimeout(() => {
      setAdminStatusMsg(null);
    }, 4500);
  };

  // Native client-side file-manager image processors with auto-canvas compression (to avoid localStorage Quota Exceeded errors)
  const processAndSetImage = (file: File, onDone: (base64Url: string) => void) => {
    setCompressingImage(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Max dimension 1000px for web display
        const MAX_DIM = 1000;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          try {
            // Compress as JPEG at 0.72 quality
            const base64 = canvas.toDataURL('image/jpeg', 0.72);
            onDone(base64);
            triggerAdminStatus('⚡ Photo loaded and optimized successfully!');
          } catch (err) {
            console.error('Image compression failed, using original', err);
            onDone(e.target?.result as string);
          }
        } else {
          onDone(e.target?.result as string);
        }
        setCompressingImage(false);
      };
      img.onerror = () => {
        triggerAdminStatus('⚠️ Invalid image file processed!');
        setCompressingImage(false);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      triggerAdminStatus('⚠️ Failed to load file from disk!');
      setCompressingImage(false);
    };
    reader.readAsDataURL(file);
  };

  // Admin Suite Handlers
  const startEditRoom = (room: Room) => {
    setEditingRoomId(room.id);
    setRoomForm({ ...room });
    setRoomAmenityInput(room.amenities.join(', '));
  };

  const startAddRoom = () => {
    setEditingRoomId('new');
    setRoomForm({
      id: 'room-' + Date.now(),
      name: '',
      description: '',
      size: '50 m²',
      bedType: '1 Extra-Large King Bed',
      capacity: 2,
      view: 'Lodge Gardens & Forest View',
      priceNpr: 15000,
      imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      amenities: ['Air Conditioning', 'Comfort'],
      highlight: 'Cozy garden retreat'
    });
    setRoomAmenityInput('Air Conditioning, Comfort');
  };

  const saveRoom = () => {
    if (!roomForm.name || !roomForm.priceNpr) {
      triggerAdminStatus('⚠️ Please fill in at least room Name and Price!');
      return;
    }
    const finalRoom: Room = {
      id: roomForm.id || 'room-' + Date.now(),
      name: roomForm.name,
      description: roomForm.description || '',
      size: roomForm.size || '50 m²',
      bedType: roomForm.bedType || '1 King Bed',
      capacity: Number(roomForm.capacity) || 2,
      view: roomForm.view || 'Jungle View',
      priceNpr: Number(roomForm.priceNpr) || 12000,
      imageUrl: roomForm.imageUrl || 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      amenities: roomAmenityInput.split(',').map(s => s.trim()).filter(Boolean),
      highlight: roomForm.highlight || 'Comfort guaranteed'
    };

    let updatedRooms: Room[];
    if (editingRoomId === 'new') {
      updatedRooms = [...rooms, finalRoom];
      triggerAdminStatus('🎉 New Room successfully added!');
    } else {
      updatedRooms = rooms.map(r => r.id === editingRoomId ? finalRoom : r);
      triggerAdminStatus('✏️ Room successfully updated!');
    }

    setRooms(updatedRooms);
    localStorage.setItem('safari_dynamic_rooms', JSON.stringify(updatedRooms));
    setEditingRoomId(null);
  };

  const deleteRoom = (id: string) => {
    const updatedRooms = rooms.filter(r => r.id !== id);
    setRooms(updatedRooms);
    localStorage.setItem('safari_dynamic_rooms', JSON.stringify(updatedRooms));
    triggerAdminStatus('🗑️ Suite removed from database!');
    if (selectedRoomForBooking?.id === id) {
      setSelectedRoomForBooking(null);
    }
  };

  // Admin Gallery Handlers
  const startEditGallery = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setGalleryForm({ ...item });
  };

  const startAddGallery = () => {
    setEditingGalleryId('new');
    setGalleryForm({
      id: 'g-' + Date.now(),
      title: '',
      category: 'Lodge',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    });
  };

  const saveGallery = () => {
    if (!galleryForm.title || !galleryForm.imageUrl) {
      triggerAdminStatus('⚠️ Please fill in both title and image URL');
      return;
    }
    const finalItem: GalleryItem = {
      id: galleryForm.id || 'g-' + Date.now(),
      title: galleryForm.title,
      category: galleryForm.category || 'Lodge',
      imageUrl: galleryForm.imageUrl
    };

    let updated: GalleryItem[];
    if (editingGalleryId === 'new') {
      updated = [...galleryItems, finalItem];
      triggerAdminStatus('🎉 New Gallery image added!');
    } else {
      updated = galleryItems.map(item => item.id === editingGalleryId ? finalItem : item);
      triggerAdminStatus('✏️ Gallery image details updated!');
    }

    setGalleryItems(updated);
    localStorage.setItem('safari_dynamic_gallery', JSON.stringify(updated));
    setEditingGalleryId(null);
  };

  const deleteGalleryItem = (id: string) => {
    const updated = galleryItems.filter(item => item.id !== id);
    setGalleryItems(updated);
    localStorage.setItem('safari_dynamic_gallery', JSON.stringify(updated));
    triggerAdminStatus('🗑️ Gallery item deleted!');
    if (galleryIndex >= updated.length) {
      setGalleryIndex(0);
    }
  };

  // Admin Amenities Handlers
  const startEditAmenity = (amen: Amenity) => {
    setEditingAmenityId(amen.id);
    setAmenityForm({ ...amen });
  };

  const startAddAmenity = () => {
    setEditingAmenityId('new');
    setAmenityForm({
      id: 'amen-' + Date.now(),
      name: '',
      category: 'Free',
      description: '',
      iconName: 'Compass'
    });
  };

  const saveAmenity = () => {
    if (!amenityForm.name || !amenityForm.description) {
      triggerAdminStatus('⚠️ Please fill in both name and description');
      return;
    }
    const finalItem: Amenity = {
      id: amenityForm.id || 'amen-' + Date.now(),
      name: amenityForm.name,
      category: amenityForm.category || 'Free',
      description: amenityForm.description,
      iconName: amenityForm.iconName || 'Compass'
    };

    let updated: Amenity[];
    if (editingAmenityId === 'new') {
      updated = [...amenities, finalItem];
      triggerAdminStatus('🎉 New Amenity added!');
    } else {
      updated = amenities.map(item => item.id === editingAmenityId ? finalItem : item);
      triggerAdminStatus('✏️ Amenity details updated!');
    }

    setAmenities(updated);
    localStorage.setItem('safari_dynamic_amenities', JSON.stringify(updated));
    setEditingAmenityId(null);
  };

  const deleteAmenity = (id: string) => {
    const updated = amenities.filter(item => item.id !== id);
    setAmenities(updated);
    localStorage.setItem('safari_dynamic_amenities', JSON.stringify(updated));
    triggerAdminStatus('🗑️ Amenity deleted!');
  };

  // Admin Reviews/Testimonials Handlers
  const startEditTestimonial = (test: Testimonial) => {
    setEditingTestimonialId(test.id);
    setTestimonialForm({ ...test });
  };

  const startAddTestimonial = () => {
    setEditingTestimonialId('new');
    const today = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonthYear = `${months[today.getMonth()]} ${today.getFullYear()}`;
    
    setTestimonialForm({
      id: 't-' + Date.now(),
      name: '',
      origin: '',
      rating: 5,
      comment: '',
      date: currentMonthYear
    });
  };

  const saveTestimonial = () => {
    if (!testimonialForm.name || !testimonialForm.comment) {
      triggerAdminStatus('⚠️ Please fill in at least the guest Name and Comment/Review!');
      return;
    }
    const finalTest: Testimonial = {
      id: testimonialForm.id || 't-' + Date.now(),
      name: testimonialForm.name,
      origin: testimonialForm.origin || 'Visitor',
      rating: Number(testimonialForm.rating) || 5,
      comment: testimonialForm.comment,
      date: testimonialForm.date || 'Lodge Guest'
    };

    let updated: Testimonial[];
    if (editingTestimonialId === 'new') {
      updated = [...testimonials, finalTest];
      triggerAdminStatus('🎉 New Guest Review added!');
    } else {
      updated = testimonials.map(item => item.id === editingTestimonialId ? finalTest : item);
      triggerAdminStatus('✏️ Guest Review updated!');
    }

    setTestimonials(updated);
    localStorage.setItem('safari_dynamic_testimonials', JSON.stringify(updated));
    setEditingTestimonialId(null);
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter(item => item.id !== id);
    setTestimonials(updated);
    localStorage.setItem('safari_dynamic_testimonials', JSON.stringify(updated));
    triggerAdminStatus('🗑️ Guest Review removed!');
  };

  // Lead Control Handlers
  const deleteEnquiry = (id: string) => {
    const saved = localStorage.getItem('safari_enquiries');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const filtered = parsed.filter((enq: any) => enq.id !== id);
        localStorage.setItem('safari_enquiries', JSON.stringify(filtered));
        setEnquiries(filtered);
        triggerAdminStatus('🗑️ Enquiry lead deleted!');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const clearAllLeads = () => {
    if (window.confirm('Delete all device bookings & contact form enquiries?')) {
      localStorage.removeItem('safari_bookings');
      localStorage.removeItem('safari_enquiries');
      setActiveBookings([]);
      setEnquiries([]);
      triggerAdminStatus('🗑️ All simulation Leads successfully cleared!');
    }
  };

  const resetToFactoryDefaults = () => {
    if (window.confirm('Wipe dynamically updated suites, images, amenities, and reviews? This restores the factory default state.')) {
      localStorage.removeItem('safari_dynamic_rooms');
      localStorage.removeItem('safari_dynamic_gallery');
      localStorage.removeItem('safari_dynamic_testimonials');
      localStorage.removeItem('safari_dynamic_amenities');
      setRooms(ROOMS);
      setGalleryItems(GALLERY_ITEMS);
      setTestimonials(TESTIMONIALS);
      setAmenities(AMENITIES);
      setEditingRoomId(null);
      setEditingGalleryId(null);
      setEditingTestimonialId(null);
      setEditingAmenityId(null);
      triggerAdminStatus('🔄 Lodge database restored to default static templates.');
    }
  };

  // JSON Import/Export Backup
  const downloadBackupBytes = () => {
    const backupObj = {
      rooms,
      galleryItems,
      testimonials,
      amenities,
      activeBookings,
      enquiries
    };
    const jsonStr = JSON.stringify(backupObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `safari_lodge_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerAdminStatus('📥 Backup downloaded successfully!');
  };

  const handleJSONUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed === 'object') {
          let hasUpdated = false;

          if (Array.isArray(parsed.rooms)) {
            setRooms(parsed.rooms);
            localStorage.setItem('safari_dynamic_rooms', JSON.stringify(parsed.rooms));
            hasUpdated = true;
          }
          if (Array.isArray(parsed.galleryItems)) {
            setGalleryItems(parsed.galleryItems);
            localStorage.setItem('safari_dynamic_gallery', JSON.stringify(parsed.galleryItems));
            hasUpdated = true;
          }
          if (Array.isArray(parsed.testimonials)) {
            setTestimonials(parsed.testimonials);
            localStorage.setItem('safari_dynamic_testimonials', JSON.stringify(parsed.testimonials));
            hasUpdated = true;
          }
          if (Array.isArray(parsed.activeBookings)) {
            setActiveBookings(parsed.activeBookings);
            localStorage.setItem('safari_bookings', JSON.stringify(parsed.activeBookings));
            hasUpdated = true;
          }
          if (Array.isArray(parsed.enquiries)) {
            setEnquiries(parsed.enquiries);
            localStorage.setItem('safari_enquiries', JSON.stringify(parsed.enquiries));
            hasUpdated = true;
          }
          if (Array.isArray(parsed.amenities)) {
            setAmenities(parsed.amenities);
            localStorage.setItem('safari_dynamic_amenities', JSON.stringify(parsed.amenities));
            hasUpdated = true;
          }

          if (hasUpdated) {
            triggerAdminStatus('📥 Lodge database successfully bulk restored!');
          } else {
            triggerAdminStatus('⚠️ File parsed but no recognized arrays (rooms, galleryItems, etc.) found.');
          }
        } else {
          triggerAdminStatus('⚠️ Invalid format. File must be a valid JSON object.');
        }
      } catch (err) {
        console.error(err);
        triggerAdminStatus('⚠️ File upload parsing error.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const lockConsole = () => {
    localStorage.removeItem('safari_admin_token');
    setIsAdmin(false);
    setIsAdminPanelOpen(false);
  };

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

    const emailForMailto = contactEmail;
    const nameForMailto = contactName;
    const messageForMailto = contactMessage;

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

    // Open mail client
    const mailtoUrl = `mailto:${gmailEnquiryTarget}?subject=Wilderness Enquiry: ${encodeURIComponent(nameForMailto)}&body=${encodeURIComponent(
      `Namaste,\n\nYou have received a wilderness enquiry from Nepal Safari Lodge.\n\nGuest Name: ${nameForMailto}\nEmail: ${emailForMailto}\n\nMessage:\n${messageForMailto}\n\n--\nNepal Safari Lodge Wilderness Dispatch`
    )}`;
    
    // Redirect to mailto so user can send using their email client / Gmail
    window.location.href = mailtoUrl;

    // Reset Form
    setContactName('');
    setContactEmail('');
    setContactMessage('');

    setTimeout(() => {
      setContactSuccess(false);
    }, 10000);
  };

  const deleteBooking = (id: string) => {
    const updated = activeBookings.filter(b => b.id !== id);
    setActiveBookings(updated);
    localStorage.setItem('safari_bookings', JSON.stringify(updated));
  };

  // Gallery items reference
  const filteredGallery = galleryItems;

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

  const handlePrevReview = () => {
    if (testimonials.length <= 1) return;
    setReviewsDirection('left');
    setReviewsIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextReview = () => {
    if (testimonials.length <= 1) return;
    setReviewsDirection('right');
    setReviewsIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Helper mapping for icon rendering
  const renderAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi': return <Wifi className="w-5 h-5 text-brass" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-brass" />;
      case 'Car': return <Car className="w-5 h-5 text-brass" />;
      case 'Plane': return <Plane className="w-5 h-5 text-brass" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-brass" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-brass" />;
      case 'Award': return <Award className="w-5 h-5 text-brass" />;
      case 'Clock': return <Clock className="w-5 h-5 text-brass" />;
      default: return <Compass className="w-5 h-5 text-brass" />;
    }
  };

  return (
    <div className="min-h-screen bg-warm-white text-teal-dark font-sans selection:bg-brass selection:text-teal-dark antialiased w-full overflow-x-hidden">
      
      {/* HEADER & NAVIGATION */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-warm-white/95 backdrop-blur-md border-b border-teal-dark/10 shadow-md' : 'bg-transparent border-transparent'}`}>
        {activeBookings.length > 0 && (
          <div className="bg-emerald-950 border-b border-emerald-800/50 text-emerald-100 py-2 px-4 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-mono text-center">
              <span className="text-emerald-400 font-bold text-sm">✓</span>
              <span><strong>Booking Confirmed!</strong> Your reservation request has been successfully recorded.</span>
            </div>
          </div>
        )}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
          
          {/* Brand Logo & Name */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-brass p-1 rounded-md">
            <div className={`w-11 h-11 md:w-14 md:h-14 rounded-full overflow-hidden border transition-all duration-300 bg-white flex-shrink-0 flex items-center justify-center p-0.5 shadow-sm group-hover:border-brass ${isScrolled ? 'border-teal-dark/25' : 'border-brass/35'}`}>
              <img 
                src={brandLogoImage} 
                className="w-full h-full object-contain rounded-full" 
                alt="Safari Wildlife Logo" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <h1 className={`font-serif font-bold text-base md:text-lg leading-tight tracking-wider uppercase transition-colors duration-300 ${isScrolled ? 'text-teal-dark' : 'text-warm-white'}`}>
                Safari Wildlife
              </h1>
              <p className="text-[9px] md:text-[10px] text-brass uppercase font-bold font-mono tracking-widest leading-none mt-1">
                Lodge & Camp • Chitwan
              </p>
            </div>
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
            src={heroBgImage}
            alt="Safari Wildlife Lodge Courtyard"
            className="w-full h-full object-cover opacity-100"
            referrerPolicy="no-referrer"
            onError={(e) => {
              console.warn("Primary hero background asset failed, loading premium Unsplash fallback");
              e.currentTarget.src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80";
            }}
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
              Stay Close to Nature, Closer to Adventure. Experience the pristine beauty of Chitwan National Park with our comfortable rustic rooms and warm, local hospitality.
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
                Book Your Stay
              </button>
              <a
                href="#suites"
                className="w-full sm:w-auto px-8 py-4 bg-warm-white/10 hover:bg-warm-white text-warm-white hover:text-teal-dark border border-warm-white/30 font-serif font-semibold text-sm uppercase tracking-widest rounded-lg transition-all"
              >
                View Our Rooms
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
            <span className="text-xs uppercase tracking-widest font-mono text-brass font-bold">Our Philosophy</span>
            <h3 className="font-serif text-3xl md:text-5xl text-teal-dark tracking-tight leading-tight font-bold">
              A Simple Nature Lodge Experience
            </h3>
            <p className="text-sm text-teal-dark/70 leading-relaxed">
              Enjoy comfortable rustic rooms, gentle guided nature walks, and friendly hospitality right next to Chitwan National Park.
            </p>
          </div>

          {/* Highlights 2-column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Highlight 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-gradient-to-b from-white/95 to-warm-white/60 p-8 rounded-2xl border border-brass/15 hover:border-brass/50 hover:bg-white transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(139,115,85,0.06)] hover:shadow-[0_15px_30px_-8px_rgba(139,115,85,0.18)] relative group overflow-hidden"
            >
              <span className="absolute top-4 right-6 text-6xl font-serif font-black text-brass/10 group-hover:text-brass/20 transition-all duration-300 pointer-events-none select-none font-mono">01</span>
              
              <div className="w-14 h-14 bg-teal-dark/5 rounded-xl flex items-center justify-center text-brass mb-6 group-hover:bg-brass group-hover:text-teal-dark transition-all duration-300 shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              
              <h4 className="font-serif text-2xl font-bold text-teal-dark mb-3 group-hover:text-brass transition-colors">Cozy & Safe Retreat</h4>
              <p className="text-xs text-teal-dark/75 leading-relaxed">
                Relax in absolute peace and comfort. Our gated grounds are watched over by friendly local caretakers to keep your stay perfectly safe, quiet, and friendly.
              </p>
            </motion.div>

            {/* Highlight 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-gradient-to-b from-white/95 to-warm-white/60 p-8 rounded-2xl border border-brass/15 hover:border-brass/50 hover:bg-white transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(139,115,85,0.06)] hover:shadow-[0_15px_30px_-8px_rgba(139,115,85,0.18)] relative group overflow-hidden"
            >
              <span className="absolute top-4 right-6 text-6xl font-serif font-black text-brass/10 group-hover:text-brass/20 transition-all duration-300 pointer-events-none select-none font-mono">02</span>
              
              <div className="w-14 h-14 bg-teal-dark/5 rounded-xl flex items-center justify-center text-brass mb-6 group-hover:bg-brass group-hover:text-teal-dark transition-all duration-300 shadow-sm">
                <Award className="w-7 h-7" />
              </div>
              
              <h4 className="font-serif text-2xl font-bold text-teal-dark mb-3 group-hover:text-brass transition-colors">Warm Nepali Hospitality</h4>
              <p className="text-xs text-teal-dark/75 leading-relaxed">
                Savor hand-prepared local tea, fresh farm-to-table meals cooked in our home kitchen, and gentle local wildlife walks guided by our knowledgeable naturalists.
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
              <span className="text-xs uppercase tracking-widest font-mono text-brass font-bold">Our Accommodations</span>
              <h2 className="font-serif text-4xl md:text-5xl text-teal-dark tracking-tight font-bold">
                Simple & Comfortable Rooms
              </h2>
              <p className="text-sm text-teal-dark/70 leading-relaxed">
                Choose from our cozy, nature-friendly rooms designed for a peaceful stay.
              </p>
            </div>
            <p className="text-xs text-teal-dark/65 max-w-sm font-mono tracking-wide leading-relaxed">
              * Rates shown in Nepalese Rupees (NPR). Simple pricing for a budget-friendly and authentic stay.
            </p>
          </div>

          {/* Rooms Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
            {rooms.map((room, idx) => (
              <motion.div 
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-lg border border-brass/25 hover:border-brass/50 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 relative group"
              >
                {/* Clean Image Banner */}
                <div className="relative h-72 sm:h-96 overflow-hidden bg-teal-dark/5">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
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
            <span className="text-xs uppercase tracking-widest font-mono text-brass font-bold">Services Included</span>
            <h2 className="font-serif text-4xl md:text-5xl text-warm-white tracking-tight font-bold">
              Included Amenities & Services
            </h2>
            <p className="text-sm text-warm-white/70">
              We provide essential amenities and simple comforts to make your jungle stay as pleasant and convenient as possible.
            </p>
          </motion.div>

          {/* Minimal Catalog-Style Amenities Presentation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto mt-6">
            {amenities.map((amen, idx) => (
              <motion.div 
                key={amen.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex items-start gap-4 pb-4 border-b border-brass/10 hover:border-brass/35 transition-all duration-300 group"
              >
                {/* Compact Circular Icon */}
                <div className="w-9 h-9 rounded-full bg-brass/10 flex items-center justify-center text-brass shrink-0 group-hover:bg-brass group-hover:text-teal-dark transition-all duration-300 border border-brass/15">
                  {renderAmenityIcon(amen.iconName)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-serif text-base font-bold text-warm-white group-hover:text-brass transition-colors">
                      {amen.name}
                    </h4>
                    <span className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded shrink-0 border ${
                      amen.category === 'Free' 
                        ? 'border-emerald-700/40 text-emerald-400 bg-emerald-950/40' 
                        : 'border-amber-700/40 text-amber-400 bg-amber-950/40'
                    }`}>
                      {amen.category}
                    </span>
                  </div>
                  <p className="text-xs text-warm-white/70 leading-relaxed max-w-md">
                    {amen.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>



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
            <span className="text-xs uppercase tracking-widest font-mono text-brass font-bold">Lodge Views</span>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-teal-dark">
              Explore Our Lodge Grounds
            </h2>
            <p className="text-sm text-teal-dark/70">
              Browse through photos of our peaceful gardens, comfortable rooms, and the beautiful surrounding wildlife of Chitwan.
            </p>
          </div>

          {/* Gallery Items sliding carousel with dynamic layout transitions */}
          <div className="relative max-w-7xl mx-auto px-4 md:px-12 mb-10 group">
            
            {/* Main Interactive Stage */}
            <div className="relative h-[400px] sm:h-[550px] md:h-[650px] lg:h-[750px] w-full bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200 shadow-md">
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
            <span className="text-sm uppercase tracking-widest font-mono text-brass font-bold">Guest Reviews</span>
            <h2 className="font-serif text-4xl text-teal-dark font-bold">
              What Our Guests Say
            </h2>
            <p className="text-sm text-teal-dark/70">
              Read real stories left by guests who enjoyed their nature stays and wildlife experiences with us.
            </p>
          </div>

          {/* Testimonial sliding carousel with custom slide direction and touch drag support */}
          <div className="relative max-w-3xl mx-auto px-4 md:px-12 mb-10 group">
            
            {/* Main Interactive Stage */}
            <div className="relative h-[360px] sm:h-[300px] w-full bg-warm-white rounded-2xl overflow-hidden border border-brass/25 shadow-md flex flex-col justify-between">
              {testimonials.length > 0 ? (
                <AnimatePresence initial={false} custom={reviewsDirection} mode="wait">
                  <motion.div
                    key={testimonials[reviewsIndex]?.id || reviewsIndex}
                    custom={reviewsDirection}
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
                        handleNextReview();
                      } else if (swipe > 60) {
                        handlePrevReview();
                      }
                    }}
                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none flex flex-col justify-between p-6 sm:p-10"
                  >
                    {/* Decorative quote mark */}
                    <span className="absolute top-4 right-8 text-brass/15 font-serif text-8xl select-none">“</span>

                    <div className="space-y-4">
                      {/* Rating Stars */}
                      <div className="flex gap-1">
                        {Array.from({ length: testimonials[reviewsIndex]?.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-4.5 h-4.5 text-brass fill-brass" />
                        ))}
                      </div>

                      <p className="text-sm sm:text-base text-teal-dark/90 italic font-serif leading-relaxed">
                        "{testimonials[reviewsIndex]?.comment}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-teal-dark/10 flex items-center justify-between">
                      <div>
                        <h5 className="text-xs sm:text-sm font-mono uppercase text-teal-dark font-bold tracking-wider">{testimonials[reviewsIndex]?.name}</h5>
                        <span className="text-xs text-teal-dark/50">{testimonials[reviewsIndex]?.origin}</span>
                      </div>
                      <span className="text-xs text-brass uppercase font-mono font-bold">{testimonials[reviewsIndex]?.date}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-teal-dark bg-warm-cream">
                  <span className="font-mono text-xs">No reviews left yet</span>
                </div>
              )}
            </div>

            {/* Slider Navigation Arrows */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={handlePrevReview}
                  className="absolute left-[-16px] md:left-[-24px] top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-teal-dark hover:bg-brass border border-brass/25 hover:border-teal-dark text-brass hover:text-teal-dark transition-all duration-300 shadow-md transform hover:scale-105 cursor-pointer z-10"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextReview}
                  className="absolute right-[-16px] md:right-[-24px] top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-teal-dark hover:bg-brass border border-brass/25 hover:border-teal-dark text-brass hover:text-teal-dark transition-all duration-300 shadow-md transform hover:scale-105 cursor-pointer z-10"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Indicator Dots & Slide Counter info */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-between mt-6 px-2">
                <span className="text-xs font-mono text-teal-dark/65 font-bold tracking-wide">
                  {(reviewsIndex + 1).toString().padStart(2, '0')} <span className="text-brass">/</span> {testimonials.length.toString().padStart(2, '0')}
                </span>
                <div className="flex gap-2.5">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setReviewsDirection(idx > reviewsIndex ? 'right' : 'left');
                        setReviewsIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === reviewsIndex ? 'bg-brass w-8 border border-teal-dark/30' : 'bg-teal-dark/20 w-2 hover:bg-teal-dark/50'}`}
                      aria-label={`Go to review slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
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
                <span className="text-xs uppercase tracking-widest font-mono text-brass font-bold">Get In Touch</span>
                <h2 className="font-serif text-4xl md:text-5xl text-teal-dark tracking-tight font-bold">
                  Reach Our Lodge
                </h2>
                <p className="text-sm text-teal-dark/70 leading-relaxed">
                  Contact us anytime to ask questions or get help with planning your cozy stay in Chitwan.
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
                  <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 text-sm p-5 rounded-lg leading-relaxed space-y-3 font-medium">
                    <div>
                      ✨ <strong className="text-emerald-950">Enquiry Dispatched Successfully!</strong> <br />
                      Your credentials have been securely registered. We have also opened your email client to send this message directly to our official mailbox: <strong className="text-emerald-950">{gmailEnquiryTarget}</strong>.
                    </div>
                    <div className="text-[10px] text-emerald-700/80 font-mono border-t border-emerald-200/50 pt-2 flex flex-wrap justify-between items-center gap-2">
                      <span>Destination: {gmailEnquiryTarget}</span>
                      <a 
                        href={`mailto:${gmailEnquiryTarget}`}
                        className="underline font-bold text-emerald-900 hover:text-emerald-950"
                      >
                        Resend Direct Email
                      </a>
                    </div>
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
              <li><a href="#suites" className="hover:text-brass transition-colors">Our Rooms</a></li>
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
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="hover:text-brass transition-colors" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={facebookUrl} target="_blank" rel="noreferrer" className="hover:text-brass transition-colors" title="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={`https://api.whatsapp.com/send?phone=${whatsappPhone}`} target="_blank" rel="noreferrer" className="hover:text-brass transition-colors" title="WhatsApp Chat">
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
        rooms={rooms}
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
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-brass/35 bg-white p-0.5 shadow-sm">
                      <img 
                        src={brandLogoImage} 
                        className="w-full h-full object-contain rounded-full" 
                        alt="Safari Logo"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-serif font-bold text-base text-teal-dark uppercase tracking-wider">Safari Wildlife</span>
                      <span className="text-[9px] text-brass uppercase font-bold font-mono tracking-widest leading-none mt-0.5">Lodge & Camp</span>
                    </div>
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
                  Book Your Room
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

      {/* ADMIN LAUNCH BUTTON */}
      {isAdmin && (
        <div className="fixed bottom-6 left-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
          <button
            onClick={() => {
              setIsAdminPanelOpen(prev => !prev);
              refreshEnquiries();
            }}
            className="flex items-center gap-2 bg-zinc-950 text-white hover:text-brass hover:bg-zinc-900 px-4 py-2.5 rounded-full border border-brass/45 hover:border-brass/80 shadow-2xl transition-all font-mono text-[10px] uppercase font-bold tracking-widest cursor-pointer group"
          >
            <Settings className="w-3.5 h-3.5 text-brass group-hover:rotate-45 transition-transform" />
            <span>cPanel {!isAdminPanelOpen ? 'Open' : 'Close'}</span>
          </button>
        </div>
      )}

      {/* ADMIN PANEL DRAWER */}
      <AnimatePresence>
        {isAdmin && isAdminPanelOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 top-12 sm:top-24 bg-zinc-950 text-zinc-100 border-t border-brass/50 z-50 flex flex-col shadow-2xl overflow-hidden font-sans rounded-t-2xl max-w-7xl mx-auto"
          >
            {/* cPanel Header */}
            <div className="bg-zinc-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 shrink-0">
              <div className="flex items-center gap-3">
                <Database className="w-6 h-6 text-brass" />
                <div>
                  <h3 className="font-serif text-lg font-bold tracking-wider text-brass">
                    Safari Wildlife cPanel
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-400">
                    Live System Console Connection: <span className="text-emerald-400 font-bold">ACTIVE LOCAL STORAGE STORAGE ENGINE</span>
                  </p>
                </div>
              </div>

              {/* Status Indicator popup if active */}
              {adminStatusMsg && (
                <div className="bg-brass/20 border border-brass/40 text-brass text-xs px-3 py-1.5 rounded font-mono animate-pulse">
                  {adminStatusMsg}
                </div>
              )}

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={resetToFactoryDefaults}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 hover:text-white border border-zinc-700 rounded text-[11px] font-mono flex items-center gap-1.5 transition cursor-pointer"
                  title="Wipe modifications and load default rooms/gallery template"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset templates
                </button>
                <button
                  onClick={lockConsole}
                  className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-red-200 border border-red-900/40 rounded text-[11px] font-mono flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Lock Console (Sign Out)
                </button>
                <button
                  onClick={() => setIsAdminPanelOpen(false)}
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white cursor-pointer ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tab Nav */}
            <div className="bg-zinc-900/60 px-6 py-2 border-b border-zinc-800 flex gap-1 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0">
              {(['rooms', 'gallery', 'amenities', 'hero', 'reviews', 'backup'] as const).map((tab) => {
                const isActive = adminTab === tab;
                const labels = {
                  rooms: '🏨 Manage Suites',
                  gallery: '🖼️ Manage Gallery Slider hover',
                  amenities: '✨ Manage Amenities',
                  hero: '🌅 Logo & Banner',
                  reviews: '⭐ Manage Reviews',
                  backup: '⚙️ JSON Backup System'
                };
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setAdminTab(tab);
                    }}
                    className={`px-4 py-2 rounded font-mono text-xs uppercase tracking-wider font-bold transition cursor-pointer shrink-0 ${
                      isActive 
                        ? 'bg-brass text-teal-dark font-black' 
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                    }`}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </div>

            {/* Scrollable Database workspace */}
            <div className="flex-1 p-6 overflow-y-auto bg-zinc-950 text-sm">
              <AnimatePresence mode="wait">
                {adminTab === 'rooms' && (
                  <motion.div
                    key="rooms"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center bg-zinc-900/40 p-3 rounded border border-zinc-800">
                      <div>
                        <h4 className="font-serif text-base font-bold text-zinc-100">Live Active Accommodations ({rooms.length})</h4>
                        <p className="text-[11px] text-zinc-400 font-mono">Changes instantly update listing views, rates, and search outcomes.</p>
                      </div>
                      <button
                        onClick={startAddRoom}
                        className="px-3.5 py-2 bg-brass text-teal-dark hover:bg-brass-light font-bold text-xs font-mono uppercase tracking-widest rounded flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 font-bold" />
                        Add New Room
                      </button>
                    </div>

                    {editingRoomId !== null ? (
                      <div className="bg-zinc-900/80 p-6 rounded border border-brass/35 space-y-4 max-w-3xl">
                        <h5 className="font-bold text-brass uppercase tracking-widest font-mono text-xs">
                          {editingRoomId === 'new' ? '✨ CREATE NEW ROOM' : '✏️ EDIT ACTIVE ROOM DETAILS'}
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Room ID (Immutable/Auto)</label>
                            <input
                              type="text"
                              value={roomForm.id}
                              disabled={editingRoomId !== 'new'}
                              onChange={(e) => setRoomForm({ ...roomForm, id: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-805 rounded px-3 py-1.5 text-zinc-100 placeholder-zinc-600 disabled:opacity-50"
                              placeholder="deluxe-room"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Room Name</label>
                            <input
                              type="text"
                              value={roomForm.name}
                              onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-850 rounded px-3 py-1.5 text-zinc-100 placeholder-zinc-600 focus:border-brass focus:outline-none"
                              placeholder="e.g. Royal Canopy Forest Suite"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Description</label>
                            <textarea
                              value={roomForm.description}
                              onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })}
                              rows={3}
                              className="w-full bg-zinc-950 border border-zinc-855 rounded px-3 py-1.5 text-zinc-100 placeholder-zinc-650 focus:border-brass focus:outline-none"
                              placeholder="Description details..."
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Price (NPR / Night)</label>
                            <input
                              type="number"
                              value={roomForm.priceNpr}
                              onChange={(e) => setRoomForm({ ...roomForm, priceNpr: Number(e.target.value) })}
                              className="w-full bg-zinc-950 border border-zinc-850 rounded px-3 py-1.5 text-zinc-100 focus:border-brass focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Featured Highlight Tag</label>
                            <input
                              type="text"
                              value={roomForm.highlight}
                              onChange={(e) => setRoomForm({ ...roomForm, highlight: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-855 rounded px-3 py-1.5 text-zinc-100 focus:border-brass focus:outline-none"
                              placeholder="Private balcony overviewing nature"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Room Size (m²)</label>
                            <input
                              type="text"
                              value={roomForm.size}
                              onChange={(e) => setRoomForm({ ...roomForm, size: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-850 rounded px-3 py-1.5 text-zinc-100 focus:border-brass focus:outline-none"
                              placeholder="e.g. 55 m²"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Bed Configuration</label>
                            <input
                              type="text"
                              value={roomForm.bedType}
                              onChange={(e) => setRoomForm({ ...roomForm, bedType: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-850 rounded px-3 py-1.5 text-zinc-100 focus:border-brass focus:outline-none"
                              placeholder="1 Extra-Large King Bed"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Amenities (comma separated list)</label>
                            <input
                              type="text"
                              value={roomAmenityInput}
                              onChange={(e) => setRoomAmenityInput(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-850 rounded px-3 py-1.5 text-zinc-100 focus:border-brass focus:outline-none"
                              placeholder="Air Conditioning, Free Wi-Fi, Forest View, Private Jacuzzi"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Capacity (Adults count)</label>
                            <input
                              type="number"
                              value={roomForm.capacity}
                              onChange={(e) => setRoomForm({ ...roomForm, capacity: Number(e.target.value) })}
                              className="w-full bg-zinc-950 border border-zinc-855 text-zinc-100 focus:border-brass focus:outline-none"
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                              Suite Picture Source
                            </label>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-zinc-950 p-4.5 rounded border border-zinc-800">
                              {/* Direct File Upload */}
                              <div className="flex flex-col justify-center items-center border border-dashed border-zinc-750 hover:border-brass/50 rounded-lg p-3 text-center group transition cursor-pointer relative min-h-[120px]">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      processAndSetImage(file, (base64) => {
                                        setRoomForm(prev => ({ ...prev, imageUrl: base64 }));
                                      });
                                    }
                                  }}
                                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                  id="suite-upload-input"
                                />
                                <Upload className={`w-6 h-6 mb-2 text-zinc-400 group-hover:text-brass transition-all ${compressingImage ? 'animate-bounce text-brass' : ''}`} />
                                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-10 block font-bold">
                                  {compressingImage ? 'COMPRESSING...' : 'UPLOAD FROM FILE MANAGER'}
                                </span>
                                <span className="text-[9px] text-zinc-400 font-mono mt-1">Directly select JPG/PNG file from Device</span>
                              </div>
                              
                              {/* Raw Image URL */}
                              <div className="flex flex-col justify-between space-y-2">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold block">Or paste static photo URL:</span>
                                  <input
                                    type="text"
                                    value={roomForm.imageUrl}
                                    onChange={(e) => setRoomForm({ ...roomForm, imageUrl: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-100 focus:border-brass focus:outline-none font-mono text-xs"
                                    placeholder="https://images.unsplash.com/..."
                                  />
                                </div>
                                
                                {roomForm.imageUrl && (
                                  <div className="flex items-center gap-2 bg-zinc-905/60 p-2 rounded border border-zinc-850">
                                    <img 
                                      src={roomForm.imageUrl} 
                                      className="w-10 h-10 object-cover rounded border border-zinc-700 bg-zinc-950" 
                                      alt="Preview" 
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="overflow-hidden">
                                      <span className="text-[9px] text-emerald-400 font-mono font-bold block uppercase tracking-wider">● Image Connected</span>
                                      <span className="text-[9px] text-zinc-400 font-mono block truncate">{roomForm.imageUrl.startsWith('data:') ? 'Base64 Loaded' : roomForm.imageUrl}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={saveRoom}
                            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase font-mono tracking-wider rounded cursor-pointer"
                          >
                            Save Suite Entry
                          </button>
                          <button
                            onClick={() => setEditingRoomId(null)}
                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-350 font-bold text-xs uppercase font-mono tracking-wider rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {/* Room Grid Table */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rooms.map((room) => (
                        <div key={room.id} className="bg-zinc-900/50 rounded p-4 border border-zinc-800 flex gap-4">
                          <img
                            src={room.imageUrl}
                            alt={room.name}
                            className="w-24 h-24 object-cover rounded border border-zinc-800 bg-zinc-950"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h5 className="font-serif text-sm font-bold text-zinc-100">{room.name}</h5>
                                <span className="font-mono text-[10px] text-brass uppercase leading-none bg-brass/10 border border-brass/20 px-1.5 py-0.5 rounded shrink-0">
                                  Rs {room.priceNpr.toLocaleString('en-NP')}
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-relaxed">{room.description}</p>
                            </div>
                            <div className="flex gap-3 pt-2">
                              <button
                                onClick={() => startEditRoom(room)}
                                className="text-xs text-brass hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3" />
                                Edit Suite
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete ${room.name}?`)) {
                                    deleteRoom(room.id);
                                  }
                                }}
                                className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1 transition-colors cursor-pointer ml-auto"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {adminTab === 'gallery' && (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center bg-zinc-900/40 p-3 rounded border border-zinc-800">
                      <div>
                        <h4 className="font-serif text-base font-bold text-zinc-100">Lodge Image Gallery Items ({galleryItems.length})</h4>
                        <p className="text-[11px] text-zinc-400 font-mono font-normal">Controls photos circulating in the main slider. Add authentic Nepalese wilderness assets.</p>
                      </div>
                      <button
                        onClick={startAddGallery}
                        className="px-3.5 py-2 bg-brass text-teal-dark hover:bg-brass-light font-bold text-xs font-mono uppercase tracking-widest rounded flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 font-bold" />
                        Add Gallery Image
                      </button>
                    </div>

                    {editingGalleryId !== null ? (
                      <div className="bg-zinc-900/80 p-5 rounded border border-brass/35 space-y-4 max-w-xl">
                        <h5 className="font-bold text-brass uppercase tracking-widest font-mono text-xs">
                          {editingGalleryId === 'new' ? '🖼️ ADD IMAGE TO SLIDER' : '✏️ EDIT IMAGE DETAILS'}
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Image Title / Description</label>
                            <input
                              type="text"
                              value={galleryForm.title}
                              onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-850 rounded px-3 py-1.5 text-zinc-100 focus:border-brass focus:outline-none"
                              placeholder="e.g. Royal Bengal Tiger on Raptor River shore"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                              Gallery Image Source
                            </label>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-zinc-950 p-4 rounded border border-zinc-800">
                              {/* Direct File Upload */}
                              <div className="flex flex-col justify-center items-center border border-dashed border-zinc-750 hover:border-brass/50 rounded-lg p-3 text-center group transition cursor-pointer relative min-h-[110px]">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      processAndSetImage(file, (base64) => {
                                        setGalleryForm(prev => ({ ...prev, imageUrl: base64 }));
                                      });
                                    }
                                  }}
                                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                  id="gallery-upload-input"
                                />
                                <Upload className={`w-5.5 h-5.5 mb-1.5 text-zinc-400 group-hover:text-brass transition-all ${compressingImage ? 'animate-bounce text-brass' : ''}`} />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-10 block font-bold">
                                  {compressingImage ? 'COMPRESSING...' : 'UPLOAD FROM FILE MANAGER'}
                                </span>
                                <span className="text-[8px] text-zinc-400 font-mono mt-0.5">Select JPG/PNG from Device</span>
                              </div>
                              
                              {/* Raw Image URL */}
                              <div className="flex flex-col justify-between space-y-2">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold block">Or paste static photo URL:</span>
                                  <input
                                    type="text"
                                    value={galleryForm.imageUrl}
                                    onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-805 rounded px-2.5 py-1.5 text-zinc-100 focus:border-brass focus:outline-none font-mono text-xs"
                                    placeholder="https://images.unsplash.com/..."
                                  />
                                </div>
                                
                                {galleryForm.imageUrl && (
                                  <div className="flex items-center gap-2 bg-zinc-905/60 p-1.5 rounded border border-zinc-850">
                                    <img 
                                      src={galleryForm.imageUrl} 
                                      className="w-8 h-8 object-cover rounded border border-zinc-700 bg-zinc-950" 
                                      alt="Preview" 
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="overflow-hidden">
                                      <span className="text-[8px] text-emerald-400 font-mono font-bold block uppercase tracking-wider leading-none mb-0.5">● Connected</span>
                                      <span className="text-[8px] text-zinc-400 font-mono block truncate leading-none">{galleryForm.imageUrl.startsWith('data:') ? 'Base64 Loaded' : galleryForm.imageUrl}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={saveGallery}
                            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase font-mono tracking-wider rounded cursor-pointer"
                          >
                            Save Image
                          </button>
                          <button
                            onClick={() => setEditingGalleryId(null)}
                            className="px-4 py-2 bg-zinc-805 hover:bg-zinc-700 text-zinc-350 font-bold text-xs uppercase font-mono tracking-wider rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {/* Gallery grid visualizer */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {galleryItems.map((item) => (
                        <div key={item.id} className="bg-zinc-900/40 rounded border border-zinc-850 p-2 group flex flex-col justify-between">
                          <div className="relative aspect-video rounded overflow-hidden bg-zinc-950 mb-2">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="space-y-2 flex-1 flex flex-col justify-between">
                            <p className="text-[11px] text-zinc-200 line-clamp-1 truncate font-mono" title={item.title}>
                              {item.title}
                            </p>
                            <div className="flex gap-2 pt-1.5 border-t border-zinc-800/60 mt-auto">
                              <button
                                onClick={() => startEditGallery(item)}
                                className="text-[10px] text-brass hover:text-white font-bold flex items-center gap-0.5 cursor-pointer"
                              >
                                <Edit3 className="w-2.5 h-2.5" />
                                Edit
                              </button>
                              <button
                                onClick={() => deleteGalleryItem(item.id)}
                                className="text-[10px] text-red-400 hover:text-red-300 font-bold flex items-center gap-0.5 cursor-pointer ml-auto"
                              >
                                <Trash2 className="w-2.5 h-2.5" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {adminTab === 'amenities' && (
                  <motion.div
                    key="amenities"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center bg-zinc-900/40 p-3.5 rounded border border-zinc-800">
                      <div>
                        <h4 className="font-serif text-base font-bold text-zinc-100">Lodge Amenities & Services ({amenities.length})</h4>
                        <p className="text-[11px] text-zinc-400 font-mono font-normal">Manage the list of included free and paid services displayed on the front page.</p>
                      </div>
                      {editingAmenityId === null && (
                        <button
                          onClick={startAddAmenity}
                          className="px-3 py-1.5 bg-brass text-teal-dark hover:bg-brass-light font-mono text-xs uppercase tracking-wider font-bold rounded flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          Add Amenity
                        </button>
                      )}
                    </div>

                    {editingAmenityId !== null ? (
                      <div className="bg-zinc-900/80 p-6 rounded border border-brass/35 space-y-4 max-w-3xl">
                        <h5 className="font-bold text-brass uppercase tracking-widest font-mono text-xs">
                          {editingAmenityId === 'new' ? '✨ CREATE NEW AMENITY' : '✏️ EDIT AMENITY DETAILS'}
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Amenity Name</label>
                            <input
                              type="text"
                              value={amenityForm.name || ''}
                              onChange={(e) => setAmenityForm({ ...amenityForm, name: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 placeholder-zinc-600 focus:border-brass/50 focus:outline-none"
                              placeholder="e.g. Free Wi-Fi"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Category</label>
                            <select
                              value={amenityForm.category || 'Free'}
                              onChange={(e) => setAmenityForm({ ...amenityForm, category: e.target.value as 'Free' | 'Paid' })}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 focus:border-brass/50 focus:outline-none"
                            >
                              <option value="Free">Free Service</option>
                              <option value="Paid">Paid/Premium Service</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Lucide Icon Option</label>
                            <select
                              value={amenityForm.iconName || 'Compass'}
                              onChange={(e) => setAmenityForm({ ...amenityForm, iconName: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 focus:border-brass/50 focus:outline-none"
                            >
                              <option value="Wifi">📶 Wifi</option>
                              <option value="Utensils">🍲 Utensils / Dinings</option>
                              <option value="Car">🚗 Airport Car Transfer</option>
                              <option value="Plane">✈️ Flight Booking Help</option>
                              <option value="Sparkles">✨ Sparkles / Deluxe Service</option>
                              <option value="ShieldCheck">🛡️ ShieldCheck / High Security</option>
                              <option value="Award">🏆 Award / Local Guide</option>
                              <option value="Clock">⏰ Clock / 24h Desk</option>
                              <option value="Compass">🧭 Compass / Tours</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Short Description</label>
                          <textarea
                            value={amenityForm.description || ''}
                            onChange={(e) => setAmenityForm({ ...amenityForm, description: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 placeholder-zinc-600 focus:border-brass/50 focus:outline-none h-20 resize-none"
                            placeholder="Briefly detail what is included with this service..."
                          />
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={saveAmenity}
                            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase font-mono tracking-wider rounded cursor-pointer transition"
                          >
                            Save Amenity
                          </button>
                          <button
                            onClick={() => setEditingAmenityId(null)}
                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-350 font-bold text-xs uppercase font-mono tracking-wider rounded cursor-pointer transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {/* Amenities list grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {amenities.map((amen) => (
                        <div key={amen.id} className="bg-zinc-900/40 rounded border border-zinc-850 p-4 flex flex-col justify-between hover:border-zinc-700 transition">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="p-1.5 bg-zinc-800 rounded text-brass flex items-center justify-center">
                                  {renderAmenityIcon(amen.iconName)}
                                </div>
                                <span className="font-serif font-bold text-zinc-100 text-sm">{amen.name}</span>
                              </div>
                              <span className={`text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded ${amen.category === 'Free' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-900/50' : 'bg-amber-950/80 text-amber-400 border border-amber-900/50'}`}>
                                {amen.category}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">{amen.description}</p>
                            <div className="text-[10px] text-zinc-500 font-mono">Icon: {amen.iconName}</div>
                          </div>
                          
                          <div className="flex gap-4 pt-3 border-t border-zinc-800/60 mt-3">
                            <button
                              onClick={() => startEditAmenity(amen)}
                              className="text-xs text-brass hover:text-white font-bold flex items-center gap-1 cursor-pointer transition"
                            >
                              <Edit3 className="w-3 h-3" />
                              Edit details
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete ${amen.name}?`)) {
                                  deleteAmenity(amen.id);
                                }
                              }}
                              className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1 cursor-pointer transition ml-auto"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {adminTab === 'hero' && (
                  <motion.div
                    key="hero"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8 max-w-4xl"
                  >
                    {/* Brand Logo Section */}
                    <div className="space-y-4">
                      <div className="bg-zinc-900/40 p-3.5 rounded border border-zinc-800">
                        <h4 className="font-serif text-base font-bold text-zinc-100">Lodge Brand Logo & Identity</h4>
                        <p className="text-[11px] text-zinc-400 font-mono">Customize the primary circular logo brand icon displayed across the website headers and navigation bar.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-900/40 p-6 rounded-lg border border-zinc-800">
                        {/* Current Preview */}
                        <div className="space-y-3">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">Active Logo Preview</span>
                          <div className="flex items-center justify-center p-4 bg-zinc-950 rounded-lg border border-zinc-850 h-[145px]">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brass bg-white flex items-center justify-center p-1 shadow-md">
                              <img 
                                src={brandLogoImage} 
                                alt="Active Brand Logo" 
                                className="w-full h-full object-contain rounded-full"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                if (window.confirm('Reset the brand logo back to the original circular crest logo?')) {
                                  setBrandLogoImage(SAFARI_LODGE_LOGO);
                                  localStorage.removeItem('safari_dynamic_logo');
                                  triggerAdminStatus('🔄 Brand logo restored to original crest!');
                                }
                              }}
                              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-350 hover:text-white font-mono text-[10px] uppercase font-bold rounded tracking-wider transition cursor-pointer"
                            >
                              Reset to Default
                            </button>
                          </div>
                        </div>

                        {/* Customize Logo Source */}
                        <div className="space-y-4">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">Upload Logo or Change Source</span>
                          
                          {/* Direct File Upload */}
                          <div className="flex flex-col justify-center items-center border border-dashed border-zinc-750 hover:border-brass/50 rounded-lg p-5 text-center group transition cursor-pointer relative min-h-[145px] bg-zinc-950/50">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  processAndSetImage(file, (base64) => {
                                    setBrandLogoImage(base64);
                                    localStorage.setItem('safari_dynamic_logo', base64);
                                    triggerAdminStatus('🎉 Brand logo successfully updated!');
                                  });
                                }
                              }}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                              id="logo-brand-upload-input"
                            />
                            <Upload className={`w-8 h-8 mb-2.5 text-zinc-400 group-hover:text-brass transition-all ${compressingImage ? 'animate-bounce text-brass' : ''}`} />
                            <span className="text-[11.5px] font-mono uppercase tracking-widest text-zinc-10 block font-bold">
                              {compressingImage ? 'COMPRESSING...' : 'UPLOAD NEW LOGO BRAND'}
                            </span>
                            <span className="text-[9px] text-zinc-500 font-mono mt-1.5">Supports high-res PNG, JPG, or transparent SVGs</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gmail Target Coordinates */}
                    <div className="space-y-4">
                      <div className="bg-zinc-900/40 p-3.5 rounded border border-zinc-800">
                        <h4 className="font-serif text-base font-bold text-zinc-100">✉️ Gmail Coordinates for Wilderness Enquiries</h4>
                        <p className="text-[11px] text-zinc-400 font-mono">Specify the destination Gmail mailbox where contact form entries and custom booking inquiries should be dispatched.</p>
                      </div>

                      <div className="bg-zinc-900/40 p-6 rounded-lg border border-zinc-800 space-y-4 max-w-3xl">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-semibold">Destination Gmail Address</label>
                          <input
                            type="email"
                            value={gmailEnquiryTarget}
                            onChange={(e) => {
                              setGmailEnquiryTarget(e.target.value);
                              localStorage.setItem('safari_enquiry_gmail', e.target.value);
                            }}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 placeholder-zinc-700 focus:border-brass/50 focus:outline-none font-mono text-xs"
                            placeholder="e.g. safarilodgechitwan@gmail.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Separator line */}
                    <hr className="border-zinc-800" />

                    {/* Hero Background Banner Section */}
                    <div className="space-y-4">
                      <div className="bg-zinc-900/40 p-3.5 rounded border border-zinc-800">
                        <h4 className="font-serif text-base font-bold text-zinc-100">Hero Section Background</h4>
                        <p className="text-[11px] text-zinc-400 font-mono">Customize the primary large welcome banner background image on your homepage.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-900/40 p-6 rounded-lg border border-zinc-800">
                      {/* Current Preview */}
                      <div className="space-y-3">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">Active Banner Preview</span>
                        <div className="relative rounded-lg overflow-hidden border border-zinc-800 aspect-video bg-zinc-950 group">
                          <img 
                            src={heroBgImage} 
                            alt="Active Hero Background" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                            <div>
                              <p className="text-warm-white font-serif font-bold text-sm">Chitwan Wilderness Resort</p>
                              <p className="text-zinc-400 font-mono text-[9px] truncate max-w-xs">{heroBgImage.startsWith('data:') ? 'Custom Uploaded Base64' : heroBgImage}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              if (window.confirm('Reset the welcome hero banner back to the original default image?')) {
                                setHeroBgImage(SAFARI_HERO_LODGE);
                                localStorage.removeItem('safari_dynamic_hero_bg');
                                triggerAdminStatus('🔄 Hero background restored to factory default!');
                              }
                            }}
                            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-350 hover:text-white font-mono text-[10px] uppercase font-bold rounded tracking-wider transition cursor-pointer"
                          >
                            Reset to Default
                          </button>
                        </div>
                      </div>

                      {/* Customize Source */}
                      <div className="space-y-4">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">Upload or Change Source</span>
                        
                        {/* Direct File Upload */}
                        <div className="flex flex-col justify-center items-center border border-dashed border-zinc-750 hover:border-brass/50 rounded-lg p-5 text-center group transition cursor-pointer relative min-h-[145px] bg-zinc-950/50">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                processAndSetImage(file, (base64) => {
                                  setHeroBgImage(base64);
                                  localStorage.setItem('safari_dynamic_hero_bg', base64);
                                  triggerAdminStatus('🎉 Hero background updated from computer!');
                                });
                              }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            id="hero-banner-upload-input"
                          />
                          <Upload className={`w-8 h-8 mb-2.5 text-zinc-400 group-hover:text-brass transition-all ${compressingImage ? 'animate-bounce text-brass' : ''}`} />
                          <span className="text-[11.5px] font-mono uppercase tracking-widest text-zinc-10 block font-bold">
                            {compressingImage ? 'COMPRESSING...' : 'UPLOAD DIRECTLY FROM DEVICE'}
                          </span>
                          <span className="text-[9px] text-zinc-500 font-mono mt-1.5">cPanel friendly dynamic base64 auto-compressor</span>
                        </div>

                        {/* Paste Web Address */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-medium">Or paste any web image url address:</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={heroBgImage.startsWith('data:') ? '' : heroBgImage}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val) {
                                  setHeroBgImage(val);
                                  localStorage.setItem('safari_dynamic_hero_bg', val);
                                }
                              }}
                              className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-warm-white placeholder-zinc-700 focus:border-brass focus:outline-none font-mono text-xs"
                              placeholder="https://images.unsplash.com/your-custom-image-url..."
                            />
                            {heroBgImage && !heroBgImage.startsWith('data:') && (
                              <button
                                onClick={() => {
                                  setHeroBgImage(SAFARI_HERO_LODGE);
                                  localStorage.setItem('safari_dynamic_hero_bg', SAFARI_HERO_LODGE);
                                  triggerAdminStatus('🔄 Image URL cleared!');
                                }}
                                className="px-2.5 py-1 bg-zinc-850 hover:bg-zinc-800 text-zinc-350 hover:text-white rounded text-xs font-mono shrink-0 cursor-pointer"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Separator line */}
                    <hr className="border-zinc-800" />

                    {/* Social Media Links Section */}
                    <div className="space-y-4">
                      <div className="bg-zinc-900/40 p-3.5 rounded border border-zinc-800">
                        <h4 className="font-serif text-base font-bold text-zinc-100">Social Media Coordinates</h4>
                        <p className="text-[11px] text-zinc-400 font-mono">Link your digital channels so guests can follow your wilderness adventure streams directly from the footer.</p>
                      </div>

                      <div className="bg-zinc-900/40 p-6 rounded-lg border border-zinc-800 space-y-4 max-w-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-semibold">Instagram URL</label>
                            <input
                              type="text"
                              value={instagramUrl}
                              onChange={(e) => {
                                setInstagramUrl(e.target.value);
                                localStorage.setItem('safari_social_instagram', e.target.value);
                              }}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 placeholder-zinc-700 focus:border-brass/50 focus:outline-none font-mono text-xs"
                              placeholder="e.g. https://instagram.com/yourlodgename"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-semibold">Facebook URL</label>
                            <input
                              type="text"
                              value={facebookUrl}
                              onChange={(e) => {
                                setFacebookUrl(e.target.value);
                                localStorage.setItem('safari_social_facebook', e.target.value);
                              }}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 placeholder-zinc-700 focus:border-brass/50 focus:outline-none font-mono text-xs"
                              placeholder="e.g. https://facebook.com/yourlodgename"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-semibold">WhatsApp Number (For Direct Chats & Widget)</label>
                            <input
                              type="text"
                              value={whatsappPhone}
                              onChange={(e) => {
                                setWhatsappPhone(e.target.value);
                                localStorage.setItem('safari_social_whatsapp', e.target.value);
                              }}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 placeholder-zinc-700 focus:border-brass/50 focus:outline-none font-mono text-xs"
                              placeholder="e.g. 9779700863273"
                            />
                            <span className="text-[10px] text-zinc-500 font-mono block mt-1">Please include country code without space or '+' symbol (e.g. 977XXXXXXXXXX for Nepal). This powers the floating WhatsApp button!</span>
                          </div>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={() => {
                              setInstagramUrl('https://instagram.com');
                              setFacebookUrl('https://facebook.com');
                              setWhatsappPhone('9779700863273');
                              localStorage.removeItem('safari_social_instagram');
                              localStorage.removeItem('safari_social_facebook');
                              localStorage.removeItem('safari_social_whatsapp');
                              triggerAdminStatus('🔄 Social coordinates reset to defaults!');
                            }}
                            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-400 hover:text-white font-mono text-[10px] uppercase font-bold rounded tracking-wider transition cursor-pointer"
                          >
                            Reset Socials to Defaults
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {adminTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center bg-zinc-900/40 p-3 rounded border border-zinc-800">
                      <div>
                        <h4 className="font-serif text-base font-bold text-zinc-100">Guest Reviews & Testimonials ({testimonials.length})</h4>
                        <p className="text-[11px] text-zinc-400 font-mono">Manage unedited guest memoirs featured on the main landing page slider.</p>
                      </div>
                      <button
                        onClick={startAddTestimonial}
                        className="px-3.5 py-2 bg-brass text-teal-dark hover:bg-brass-light font-bold text-xs font-mono uppercase tracking-widest rounded flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 font-bold" />
                        Add New Review
                      </button>
                    </div>

                    {editingTestimonialId !== null ? (
                      <div className="bg-zinc-900/80 p-6 rounded border border-brass/35 space-y-4 max-w-2xl">
                        <h5 className="font-bold text-brass uppercase tracking-widest font-mono text-xs">
                          {editingTestimonialId === 'new' ? '⭐ ADD GUEST TESTIMONIAL' : '✏️ EDIT GUEST TESTIMONIAL'}
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Guest Name</label>
                            <input
                              type="text"
                              value={testimonialForm.name}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 placeholder-zinc-650 focus:border-brass focus:outline-none"
                              placeholder="e.g. Abhishek Shrestha"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Origin / Location</label>
                            <input
                              type="text"
                              value={testimonialForm.origin}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, origin: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 placeholder-zinc-650 focus:border-brass focus:outline-none"
                              placeholder="e.g. Kathmandu, Nepal"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Rating Stars (1 - 5)</label>
                            <select
                              value={testimonialForm.rating}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                              className="w-full bg-zinc-950 border border-zinc-805 rounded px-3 py-1.5 text-zinc-100 focus:border-brass focus:outline-none font-mono"
                            >
                              <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                              <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                              <option value={3}>⭐⭐⭐ (3 Stars)</option>
                              <option value={2}>⭐⭐ (2 Stars)</option>
                              <option value={1}>⭐ (1 Star)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Date Published</label>
                            <input
                              type="text"
                              value={testimonialForm.date}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, date: e.target.value })}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 focus:border-brass focus:outline-none"
                              placeholder="e.g. May 2026"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Testimonial Comment</label>
                            <textarea
                              value={testimonialForm.comment}
                              onChange={(e) => setTestimonialForm({ ...testimonialForm, comment: e.target.value })}
                              rows={3}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 placeholder-zinc-650 focus:border-brass focus:outline-none"
                              placeholder="Write the guest review here..."
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={saveTestimonial}
                            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase font-mono tracking-wider rounded cursor-pointer"
                          >
                            Save Review
                          </button>
                          <button
                            onClick={() => setEditingTestimonialId(null)}
                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-350 font-bold text-xs uppercase font-mono tracking-wider rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {/* Testimonials List Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {testimonials.map((test) => (
                        <div key={test.id} className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800 flex flex-col justify-between space-y-3">
                          <div className="space-y-2 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-serif text-sm font-bold text-zinc-100">{test.name}</h5>
                                <span className="text-[10px] text-zinc-400 font-mono block">{test.origin}</span>
                              </div>
                              <span className="text-[10px] text-brass font-mono bg-brass/10 border border-brass/20 px-1.5 py-0.5 rounded shrink-0">
                                {test.date}
                              </span>
                            </div>

                            {/* Ratings */}
                            <div className="flex gap-0.5">
                              {Array.from({ length: test.rating || 5 }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-brass fill-brass" />
                              ))}
                            </div>

                            <p className="text-[11.5px] text-zinc-300 italic leading-relaxed line-clamp-4">
                              "{test.comment}"
                            </p>
                          </div>

                          <div className="flex gap-3 pt-2.5 border-t border-zinc-804/60 mt-auto">
                            <button
                              onClick={() => startEditTestimonial(test)}
                              className="text-xs text-brass hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" />
                              Edit Review
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete review from ${test.name}?`)) {
                                  deleteTestimonial(test.id);
                                }
                              }}
                              className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1 transition-colors cursor-pointer boder-none bg-transparent ml-auto"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {adminTab === 'backup' && (
                  <motion.div
                    key="backup"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-xl mx-auto space-y-8 py-4"
                  >
                    <div className="bg-zinc-900/60 p-6 rounded border border-zinc-800 space-y-4">
                      <div className="flex items-center gap-2.5 text-brass">
                        <Download className="w-5 h-5" />
                        <h4 className="font-serif text-base font-bold">Download Lodge Database Backup</h4>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                        Download current customized suites, prices, description arrays, guest bookings, and lead enquiries as a single clean configuration JSON file. Excellent for backups, migration, or cold deployments.
                      </p>
                      <button
                        onClick={downloadBackupBytes}
                        className="w-full py-2.5 bg-zinc-800 hover:bg-brass text-zinc-100 hover:text-teal-dark font-mono font-bold text-xs uppercase tracking-widest rounded border border-brass/50 transition cursor-pointer"
                      >
                        Download config.json
                      </button>
                    </div>

                    <div className="bg-zinc-900/60 p-6 rounded border border-zinc-800 space-y-4">
                      <div className="flex items-center gap-2.5 text-brass">
                        <Upload className="w-5 h-5" />
                        <h4 className="font-serif text-base font-bold">Bulk Restore config.json Backup</h4>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                        Select a previously exported safari database file (.json) to bulk restore database tables (rooms, gallery, active leads) immediately on this terminal device.
                      </p>
                      <div className="relative border border-dashed border-zinc-800 hover:border-brass/50 rounded p-6 text-center cursor-pointer transition bg-zinc-950">
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleJSONUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          title="Choose a backup config.json file"
                        />
                        <div className="space-y-1.5 font-mono text-xs">
                          <p className="text-brass font-bold">Click to choose config.json backup file</p>
                          <p className="text-[10px] text-zinc-500">Restores all dynamic state variables instantly</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
