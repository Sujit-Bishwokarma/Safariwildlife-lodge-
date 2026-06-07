import { Room, Amenity, GalleryItem, Testimonial } from './types';

// Use dynamic asset references so Vite bundles them correctly in production systems like Netlify without needing static PNG type declarations.
const SAFARI_HERO_LODGE = new URL('./assets/images/IMG_20260606_231903.png', import.meta.url).href;
const SAFARI_SUITE_ROOM = new URL('./assets/images/IMG_20260606_214404.png', import.meta.url).href;
const SAFARI_DINING = new URL('./assets/images/safari_dining_1780737654970.png', import.meta.url).href;
const SAFARI_RHINO = new URL('./assets/images/safari_rhino_1780737668940.png', import.meta.url).href;
const SAFARI_VILLA = new URL('./assets/images/IMG_20260606_214610.png', import.meta.url).href;

export { SAFARI_HERO_LODGE, SAFARI_SUITE_ROOM, SAFARI_DINING, SAFARI_RHINO, SAFARI_VILLA };

export const ROOMS: Room[] = [
  {
    id: 'elephant-breeze-suite',
    name: 'Elephant Breeze Suite',
    description: 'A spectacular elevated suite designed with local timber and large viewing windows, providing a refreshing river breeze and front-row seats to the wild canopy.',
    size: '55 m²',
    bedType: '1 Extra-Large King Bed',
    capacity: 2,
    view: 'Rapti River & Canopy View',
    priceNpr: 18500,
    imageUrl: SAFARI_SUITE_ROOM,
    amenities: [
      'Ultra-Plush Egyptian Cotton Bedding',
      'Whisper-Quiet Air Conditioning',
      'Electronic Digital Safe Secure-Vault',
      'Secure Double-Lock Timber Mortise System',
      'Acoustic-Inulated Glass Paneling'
    ],
    highlight: 'Private elevated balcony over riverfront path'
  },
  {
    id: 'rhino-canopy-villa',
    name: 'Rhino Canopy Villa',
    description: 'A signature luxury villa standing gracefully in Churia-hill clay and slate. Perfect for guests seeking absolute peace with state-of-the-art security and supreme comfort.',
    size: '72 m²',
    bedType: '1 King Bed & 1 Soft Daybed',
    capacity: 3,
    view: 'Grasslands & Sunrise View',
    priceNpr: 24000,
    imageUrl:  SAFARI_VILLA,
    amenities: [
      'Authentic Silk Comfort Underlays',
      'Smart-Climate Humidifier & Multi-Zone AC',
      'Heavy-Duty Electronic Deadbolt Doors',
      '24/7 Dedicated Wildlife Ranger Area Patrol',
      'Tempered Fire-Resistant Boundary Framing'
    ],
    highlight: 'Outdoor deep-soak stone bathtub'
  },
  {
    id: 'tiger-den-sanctuary',
    name: 'Tiger Den Sanctuary',
    description: 'Our most premium lodging featuring floor-to-ceiling panoramic glass panels, offering close connection with nature while ensuring impenetrable security and modern comfort.',
    size: '95 m²',
    bedType: '1 Royal King Bed',
    capacity: 2,
    view: 'Chitwan National Park Border Forest',
    priceNpr: 32500,
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Anti-Gravity Premium Latex Sleep System',
      'Fully Integrated Comfort Lounge Seating',
      'Triple-Redundant biometric/PIN safe custody drawer',
      'Multi-Point Secure Shutter Protectors',
      'Direct-to-Front-Desk Panic Assistance Link'
    ],
    highlight: 'Private dipping pool & automated security glass'
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'wifi',
    name: 'Complimentary Wi-Fi',
    category: 'Free',
    description: 'High-speed wireless internet across the lodge and guest suites.',
    iconName: 'Wifi'
  },
  {
    id: 'breakfast',
    name: 'Organic Breakfast',
    category: 'Free',
    description: 'Delicious hot breakfast buffet featuring local organic grains and honey.',
    iconName: 'Utensils'
  },
  {
    id: 'parking',
    name: 'Secure Parking',
    category: 'Free',
    description: 'Spacious gated parking area with 24-hour wardens.',
    iconName: 'Car'
  },
  {
    id: 'airport-transfer',
    name: 'Airport Transfer',
    category: 'Paid',
    description: 'Chauffeured robust 4x4 pickup & drop-off to Bharatpur Airport (NPR 4,500 return).',
    iconName: 'Plane'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    category: 'Lodge & Grounds',
    imageUrl: SAFARI_HERO_LODGE,
    title: 'Safari Wildlife Lodge & Camp Twilight Vista'
  },
  {
    id: 'g2',
    category: 'Dining',
    imageUrl: SAFARI_DINING,
    title: 'Bush Dining & Fine Nepalese Hospitality'
  },
  {
    id: 'g3',
    category: 'Rooms',
    imageUrl: SAFARI_SUITE_ROOM,
    title: 'Safari Luxury Suite Master Bed layout'
  },
  {
    id: 'g4',
    category: 'Wildlife',
    imageUrl: SAFARI_RHINO,
    title: 'One-horned Rhino close to Rapti River paths'
  },
  {
    id: 'g5',
    category: 'Lodge & Grounds',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    title: 'Warm Poolside & Relaxing Deck Chairs'
  },
  {
    id: 'g6',
    category: 'Wildlife',
    imageUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=800&q=80',
    title: 'Chitwan Birds & Jungle Canopy Excursion'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Abhishek Shrestha',
    origin: 'Kathmandu, Nepal',
    rating: 5,
    comment: 'An unforgettably luxurious wild experience. We sat on our private balcony of the Elephant Breeze Suite and saw deer coming down to the river. The staff treated us like royalty, and the security makes you feel safe even with the wild outside.',
    date: 'May 2026'
  },
  {
    id: 't2',
    name: 'Clara Jenkins',
    origin: 'Munich, Germany',
    rating: 5,
    comment: 'Outstanding! The aesthetic with deep teals and teak wood is visually breathtaking. The bedroom comfort is unmatched, and having a paid direct airport transfer arranged so flawlessly was perfect. High-speed Wi-Fi was incredibly reliable!',
    date: 'January 2026'
  },
  {
    id: 't3',
    name: 'Rohan Deshmukh',
    origin: 'Mumbai, India',
    rating: 5,
    comment: 'Safari Wildlife Lodge & Camp is the ultimate blend of high-end security and rustic wilderness. The bedding felt fantastic; and after a long safari, coming back to premium air-conditioning and peaceful surroundings was wonderful.',
    date: 'April 2026'
  }
];
