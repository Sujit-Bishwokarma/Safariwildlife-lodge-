import { Room, Amenity, GalleryItem, Testimonial } from './types';

// Use dynamic asset references so Vite bundles them correctly in production systems like Netlify without needing static PNG type declarations.
const SAFARI_HERO_LODGE = new URL('./assets/images/Homepage_20260606_231903.png', import.meta.url).href;
const SAFARI_SINGLE_ROOM = new URL('./assets/images/Single_bed_20260606_214404.png', import.meta.url).href;
const SAFARI_DINING = new URL('./assets/images/IMG_20260606_214558.png', import.meta.url).href;
const SAFARI_RHINO = new URL('./assets/images/Rhinos_1780146577336.jpg', import.meta.url).href;
const SAFARI_DOUBLE_ROOM = new URL('./assets/images/Double_bed.png', import.meta.url).href;
const SAFARI_OUTDINING = new URL('./assets/images/Outdoor_dining.jpg', import.meta.url).href;
const SAFARI_CHAIR = new URL('./assets/images/Chair.jpg', import.meta.url).href;
const SAFARI_TOILET = new URL('./assets/images/Toilet.jpeg', import.meta.url).href;
const SAFARI_RHINOS = new URL('./assets/images/Rhinos_1780146577336.jpg', import.meta.url).href;
const SAFARI_SNAKE = new URL('./assets/images/Snake.jpg', import.meta.url).href;
const SAFARI_TOURISTDINING = new URL('./assets/images/Tourist_dining.jpg', import.meta.url).href;
const SAFARI_BOAT = new URL('./assets/images/Boat_1780387231489.jpg', import.meta.url).href;
const SAFARI_TOWER = new URL('./assets/images/Tower_IMG_1780842806696.jpg', import.meta.url).href;
const SAFARI_BUILDING = new URL('./assets/images/Building.jpg', import.meta.url).href;


export { SAFARI_HERO_LODGE, SAFARI_SUITE_ROOM, SAFARI_DINING, SAFARI_RHINO };

export const ROOMS: Room[] = [
  {
    id: 'luxury-suite',
    name: 'Single Bedroom Suite',
    description: 'A beautifully designed, spacious suite featuring high ceilings, warm timber accents, premium king-size bedding, and large windows that fill the space with clear natural light.',
    size: '55 m²',
    bedType: '1 Extra-Large King Bed',
    capacity: 2,
    view: 'Lodge Gardens & Forest View',
    priceNpr: 18500,
    imageUrl: SAFARI_SINGLE_ROOM,
    amenities: [
      'Air Conditioning',
      'Comfort'
    ],
    highlight: 'Private balcony overlooking nature'
  },
  {
    id: 'deluxe-cottage',
    name: 'Double Bedroom Suite',
    description: 'A cozy and charming standalone cottage that borders our tranquil gardens. This space offers supreme comfort in a highly restful jungle-adjacent atmosphere.',
    size: '45 m²',
    bedType: '1 King Bed or 2 Twin Beds',
    capacity: 2,
    view: 'Resort Courtyard & Garden View',
    priceNpr: 14500,
    imageUrl: SAFARI_DOUBLE_ROOM,
    amenities: [
      'Air Conditioning',
      'Comfort'
    ],
    highlight: 'Outdoor garden seating area'
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
    imageUrls: [SAFARI_HERO_LODGE],
    title: 'Safari Wildlife Lodge & Camp Twilight Vista'
  },
  {
    id: 'g2',
    category: 'Dining',
    imageUrls: [SAFARI_TOURISTDINING, SAFARI_DINING, SAFARI_OUTDINING, SAFARI_CHAIR],
    title: 'Bush Dining & Fine Nepalese Hospitality'
  },
  {
    id: 'g3',
    category: 'Rooms',
    imageUrls: [SAFARI_SINGLE_ROOM,SAFARI_DOUBLE_ROOM, SAFARI_TOILET],
    title: 'Safari Luxury Suite Master Bed layout'
  },
  {
    id: 'g4',
    category: 'Wildlife',
    imageUrls: [SAFARI_RHINO,SAFARI_RHINOS,SAFARI_SNAKE,],
    title: 'One-horned Rhino close to Rapti River paths'
  },
  {
    id: 'g5',
    category: 'Lodge & Grounds',
    imageUrls: [SAFARI_BOAT,SAFARI_TOWER,SAFARI_BUILDING,],
    title: 'Warm Poolside & Relaxing Deck Chairs'
  },
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
