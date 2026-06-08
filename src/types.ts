export interface Room {
  id: string;
  name: string;
  description: string;
  size: string;
  bedType: string;
  capacity: number;
  view: string;
  priceNpr: number;
  imageUrl: string;
  amenities: string[]; // comfort and security only as per user request to limit key amenities
  highlight: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: 'Free' | 'Paid';
  description: string;
  iconName: string; // matches lucide icon names
}

export interface GalleryItem {
  id: string;
  category: string;
  imageUrl: string;
  title: string;
}

export interface Testimonial {
  id: string;
  name: string;
  origin: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BookingSubmission {
  id: string;
  guestName: string;
  contactMethod: 'phone' | 'email';
  contactValue: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  roomId: string;
  roomName: string;
  status: 'pending' | 'confirmed';
  pricingNpr: number;
}
