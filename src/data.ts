import { Room, Amenity, GalleryItem, Testimonial } from './types';

// @ts-ignore
import SAFARI_HERO_LODGE_IMG from './assets/images/safari_courtyard_original.jpg';
// @ts-ignore
import SAFARI_SUITE_ROOM_IMG from './assets/images/safari_suite_room_1780737640544.png';
// @ts-ignore
import SAFARI_DINING_IMG from './assets/images/safari_dining_1780737654970.png';
// @ts-ignore
import SAFARI_RHINO_IMG from './assets/images/safari_rhino_1780737668940.png';
// @ts-ignore
import SAFARI_HERO_ENHANCED_IMG from './assets/images/safari_hero_enhanced_1780749642176.png';
// @ts-ignore
import SAFARI_RESORT_COURTYARD_IMG from './assets/images/safari_resort_courtyard_1780749113437.png';
// @ts-ignore
import SAFARI_HERO_LODGE_ALT_IMG from './assets/images/safari_hero_lodge_1780737625214.png';
// @ts-ignore
import SAFARI_LODGE_LOGO_IMG from './assets/images/IMG-20260606-WA0015.jpg';

const SAFARI_HERO_LODGE = SAFARI_HERO_LODGE_IMG;
const SAFARI_SUITE_ROOM = SAFARI_SUITE_ROOM_IMG;
const SAFARI_DINING = SAFARI_DINING_IMG;
const SAFARI_RHINO = SAFARI_RHINO_IMG;
const SAFARI_HERO_ENHANCED = SAFARI_HERO_ENHANCED_IMG;
const SAFARI_RESORT_COURTYARD = SAFARI_RESORT_COURTYARD_IMG;
const SAFARI_HERO_LODGE_ALT = SAFARI_HERO_LODGE_ALT_IMG;
const SAFARI_LODGE_LOGO = SAFARI_LODGE_LOGO_IMG;

const SAFARI_POOL_DECK = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80';
const SAFARI_BIRDS_EXCURSION = 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80';
const SAFARI_TIGER_PATROL = 'https://images.unsplash.com/photo-1602491453974-093fe2bc2767?auto=format&fit=crop&w=1200&q=80';
const SAFARI_VERANDA_GARDENS = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';
const SAFARI_DEER_DAWN = 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=1200&q=80';
const SAFARI_CULINARY_DINING = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80';
const SAFARI_ELEPHANT_CLOSE = 'https://images.unsplash.com/photo-1551085254-e96b210db58a?auto=format&fit=crop&w=1200&q=80';
const SAFARI_RIVER_SUNSET = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80';
const SAFARI_JUNGLE_PATH = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80';
const SAFARI_CROCODILE = 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80';
const SAFARI_CAMP_BONFIRE = 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80';

export { SAFARI_HERO_LODGE, SAFARI_SUITE_ROOM, SAFARI_DINING, SAFARI_RHINO, SAFARI_LODGE_LOGO, SAFARI_RESORT_COURTYARD, SAFARI_CULINARY_DINING, SAFARI_CAMP_BONFIRE };

export const ROOMS: Room[] = [
  {
    id: 'double-room',
    name: 'Double Room',
    description: 'Suitable for 2 people. A cozy, peaceful, and comfortable room ideal for couples or solo travelers.',
    size: '35 m²',
    bedType: '1 Double Bed',
    capacity: 2,
    view: 'Lodge Gardens & Forest View',
    priceNpr: 12500,
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Air Conditioning',
      'Comfort'
    ],
    highlight: 'Suitable for 2 people'
  },
  {
    id: 'triple-room',
    name: 'Triple Room',
    description: 'Suitable for 3 people. A spacious and comfortable room designed for small groups or friends traveling together.',
    size: '45 m²',
    bedType: '1 Double Bed & 1 Single Bed',
    capacity: 3,
    view: 'Resort Courtyard & Garden View',
    priceNpr: 15500,
    imageUrl: SAFARI_HERO_LODGE_ALT,
    secondaryImageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    amenities: [
      'Air Conditioning',
      'Comfort'
    ],
    highlight: 'Suitable for 3 people'
  },
  {
    id: 'family-room',
    name: 'Family Room',
    description: 'Suitable for 4–5 people. A generously sized and comfortable room thoughtfully arranged for families.',
    size: '55 m²',
    bedType: '2 Double Beds',
    capacity: 5,
    view: 'Lodge Gardens & Forest View',
    priceNpr: 18500,
    imageUrl: SAFARI_SUITE_ROOM,
    secondaryImageUrl: SAFARI_RESORT_COURTYARD,
    amenities: [
      'Air Conditioning',
      'Comfort'
    ],
    highlight: 'Suitable for 4–5 people'
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'air-conditioning',
    name: 'Air Conditioning',
    category: 'Free',
    description: 'Quiet, climate-controlled cooling in all guest rooms for restful comfort in every season.',
    iconName: 'Custom'
  },
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
    description: 'Delicious hot breakfast buffet featuring local organic options.',
    iconName: 'Utensils'
  },
  {
    id: 'parking',
    name: 'Secure Parking',
    category: 'Free',
    description: 'Spacious gated parking area with 24-hour security.',
    iconName: 'Car'
  },
  {
    id: 'airport-transfer',
    name: 'Airport Transfer',
    category: 'Paid',
    description: 'Convenient taxi pickup and drop-off service to Bharatpur Airport arranged on request.',
    iconName: 'Plane'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    category: 'Lodge',
    imageUrl: SAFARI_HERO_LODGE,
    title: 'Safari Wildlife Lodge & Camp Twilight Vista'
  },
  {
    id: 'g2',
    category: 'Lodge',
    imageUrl: SAFARI_DINING,
    title: 'Bush Dining & Fine Nepalese Hospitality'
  },
  {
    id: 'g3',
    category: 'Lodge',
    imageUrl: SAFARI_SUITE_ROOM,
    title: 'Safari Deluxe Room Master Bed layout'
  },
  {
    id: 'g4',
    category: 'Lodge',
    imageUrl: SAFARI_RHINO,
    title: 'One-horned Rhino close to Rapti River paths'
  },
  {
    id: 'g5',
    category: 'Lodge',
    imageUrl: SAFARI_POOL_DECK,
    title: 'Lush Tropical Oasis Pool Side Deck'
  },
  {
    id: 'g6',
    category: 'Lodge',
    imageUrl: SAFARI_BIRDS_EXCURSION,
    title: 'Chitwan Birds & Jungle Canopy Excursion'
  },
  {
    id: 'g7',
    category: 'Lodge',
    imageUrl: SAFARI_TIGER_PATROL,
    title: 'Majestic Royal Bengal Tiger on Jungle Patrol'
  },
  {
    id: 'g8',
    category: 'Lodge',
    imageUrl: SAFARI_VERANDA_GARDENS,
    title: 'Lodge Main Building & Veranda Gardens'
  },
  {
    id: 'g9',
    category: 'Lodge',
    imageUrl: SAFARI_DEER_DAWN,
    title: 'Chitwan Spotted Deer Grazing at Dawn'
  },
  {
    id: 'g10',
    category: 'Lodge',
    imageUrl: SAFARI_CULINARY_DINING,
    title: 'Curated Organic Culinary Dining Tables'
  },
  {
    id: 'g11',
    category: 'Lodge',
    imageUrl: SAFARI_ELEPHANT_CLOSE,
    title: 'Majestic Safari Elephant Jungle Crossing'
  },
  {
    id: 'g12',
    category: 'Lodge',
    imageUrl: SAFARI_RIVER_SUNSET,
    title: 'Rapti River Canoe Excursion at Golden Sunset'
  },
  {
    id: 'g13',
    category: 'Lodge',
    imageUrl: SAFARI_JUNGLE_PATH,
    title: 'Mist-Covered Jungle Trail & Nature Canopy'
  },
  {
    id: 'g14',
    category: 'Lodge',
    imageUrl: SAFARI_CROCODILE,
    title: 'Gharial Crocodile Basking near River Bank'
  },
  {
    id: 'g15',
    category: 'Lodge',
    imageUrl: SAFARI_CAMP_BONFIRE,
    title: 'Evening Safari Camp Bonfire Under Night Sky'
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
