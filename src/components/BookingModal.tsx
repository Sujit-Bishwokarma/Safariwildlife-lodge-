import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { Room, BookingSubmission } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room | null;
  rooms: Room[];
  onBookingSuccess: (newBooking: BookingSubmission) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedRoom,
  rooms,
  onBookingSuccess
}: BookingModalProps) {
  const [activeRoom, setActiveRoom] = useState<Room | null>(selectedRoom);
  const [guestName, setGuestName] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync state if selectedRoom prop changes
  React.useEffect(() => {
    if (selectedRoom) {
      setActiveRoom(selectedRoom);
    } else if (rooms.length > 0 && !activeRoom) {
      setActiveRoom(rooms[0]);
    }
  }, [selectedRoom, rooms]);

  const calculateDays = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const currentPrice = activeRoom ? activeRoom.priceNpr : 18500;
  const numDays = calculateDays();
  const subtotal = currentPrice * numDays;
  const serviceCharge = Math.round(subtotal * 0.1); // 10% standard service charge
  const totalPricing = subtotal + serviceCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !contactValue || !checkIn || !checkOut) {
      setErrorMsg('Please complete all reservation fields.');
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      setErrorMsg('Check-out must be after check-in.');
      return;
    }

    const newBooking: BookingSubmission = {
      id: 'RES-' + Math.floor(100000 + Math.random() * 900000),
      guestName,
      contactMethod: contactValue.includes('@') ? 'email' : 'phone',
      contactValue,
      checkIn,
      checkOut,
      guestsCount,
      roomId: activeRoom?.id || 'unknown',
      roomName: activeRoom?.name || 'Deluxe Room',
      status: 'pending',
      pricingNpr: totalPricing
    };

    // Save to local storage
    const existingBookings = JSON.parse(localStorage.getItem('safari_bookings') || '[]');
    existingBookings.push(newBooking);
    localStorage.setItem('safari_bookings', JSON.stringify(existingBookings));

    // Submit programmatically to Netlify Forms (Ajax-based static hosting)
    const encodeFormData = (data: Record<string, string | number>) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key].toString()))
        .join("&");
    };

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData({
        "form-name": "booking-form",
        "bot-field": "",
        guestName,
        contactValue,
        checkIn,
        checkOut,
        guestsCount,
        roomName: activeRoom?.name || 'Deluxe Room',
        totalPricing: totalPricing + " NPR"
      })
    })
      .then(() => console.log("Booking successfully submitted via AJAX!"))
      .catch(error => console.error("Error submitting via AJAX:", error));

    // Submit natively via the hidden form in index.html for Bisup / Static.app form scraping scripts
    try {
      const nativeForm = document.getElementById('bisup-booking-form') as HTMLFormElement | null;
      if (nativeForm) {
        // Set all standard input field values
        (nativeForm.querySelector('input[name="guestName"]') as HTMLInputElement).value = guestName;
        (nativeForm.querySelector('input[name="contactValue"]') as HTMLInputElement).value = contactValue;
        (nativeForm.querySelector('input[name="checkIn"]') as HTMLInputElement).value = checkIn;
        (nativeForm.querySelector('input[name="checkOut"]') as HTMLInputElement).value = checkOut;
        (nativeForm.querySelector('input[name="guestsCount"]') as HTMLInputElement).value = guestsCount.toString();
        (nativeForm.querySelector('input[name="roomName"]') as HTMLInputElement).value = activeRoom?.name || 'Deluxe Room';
        (nativeForm.querySelector('input[name="totalPricing"]') as HTMLInputElement).value = totalPricing + " NPR";

        // Request submission natively which invokes all browser events/listeners for Bisup's script
        if (typeof nativeForm.requestSubmit === 'function') {
          nativeForm.requestSubmit();
        } else {
          nativeForm.submit();
        }
        console.log("Booking successfully submitted natively for Bisup!");
      }
    } catch (err) {
      console.warn("Native form submit failed, fallback to AJAX:", err);
    }

    onBookingSuccess(newBooking);
    setIsSubmitted(true);
    setErrorMsg('');
  };

  const resetForm = () => {
    setGuestName('');
    setContactValue('');
    setCheckIn('');
    setCheckOut('');
    setGuestsCount(2);
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
            className="absolute inset-0 bg-teal-dark/80 backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Form container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-warm-white rounded-2xl shadow-xl overflow-hidden border border-brass/35 z-10 p-6 sm:p-7 max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-teal-dark/70 hover:text-brass transition-colors p-1.5 rounded-full hover:bg-teal-dark/5"
              id="close-booking-modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <form 
                onSubmit={handleSubmit} 
                className="space-y-4"
                name="booking-form"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                <input type="hidden" name="form-name" value="booking-form" />
                <input type="hidden" name="bot-field" />
                <div className="space-y-1 pr-6">
                  <div className="flex items-center gap-1.5 text-brass">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest font-mono font-bold">Secure Reservation</span>
                  </div>
                  <h3 className="font-serif text-2xl text-teal-dark font-bold">
                    Book Your Sanctuary
                  </h3>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs py-2 px-3 rounded-lg font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Room Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-teal-dark/65 font-bold font-mono">
                    Select Suite
                  </label>
                  <select
                    value={activeRoom?.id}
                    onChange={(e) => {
                      const next = rooms.find(r => r.id === e.target.value);
                      if (next) setActiveRoom(next);
                    }}
                    className="w-full bg-warm-cream border border-brass/35 text-teal-dark rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brass"
                  >
                    {rooms.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name} — Rs {r.priceNpr.toLocaleString('en-NP')} / Night
                      </option>
                    ))}
                  </select>
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-teal-dark/65 font-bold font-mono flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-brass" /> Guest Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Abhishek Shrestha"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-warm-cream border border-brass/35 text-teal-dark rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brass placeholder:text-teal-dark/35"
                  />
                </div>

                {/* Contact */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-teal-dark/65 font-bold font-mono flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-brass" /> Phone or Email
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="yourname@domain.com or +977 9XXXXXXXXX"
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    className="w-full bg-warm-cream border border-brass/35 text-teal-dark rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brass placeholder:text-teal-dark/35"
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-teal-dark/65 font-bold font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brass" /> Arrival
                    </label>
                    <input
                      type="date"
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-warm-cream border border-brass/35 text-teal-dark rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brass"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-teal-dark/65 font-bold font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brass" /> Departure
                    </label>
                    <input
                      type="date"
                      required
                      value={checkOut}
                      disabled={!checkIn}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-warm-cream border border-brass/35 text-teal-dark rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brass disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Guest Capacity Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-teal-dark/65 font-bold font-mono block">
                    No. of Guests
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={activeRoom?.capacity || 4}
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-warm-cream border border-brass/35 text-teal-dark rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brass font-mono"
                  />
                  <span className="text-[10px] text-teal-dark/50 block mt-0.5">Max capacity: {activeRoom?.capacity || 4} guests</span>
                </div>

                {/* Direct payment note */}
                <div className="bg-brass/10 border border-brass/25 rounded-xl p-3 text-[11px] text-teal-dark/75 leading-relaxed space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span>Est. Space Value:</span>
                    <span>{totalPricing.toLocaleString('en-NP')} NPR</span>
                  </div>
                  <p className="text-[9.5px] text-teal-dark/65 leading-normal">
                    🔒 No online deposit required today. You pay at checkout via Card, Cash, or QR.
                  </p>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-teal-dark hover:bg-teal-light text-warm-white font-serif font-bold text-sm uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer text-brass-light"
                    id="confirm-booking-btn"
                  >
                    Request Reservation
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-6 text-center space-y-4"
              >
                <div className="w-12 h-12 bg-brass/20 rounded-full flex items-center justify-center text-brass">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl text-teal-dark font-bold">Sanctuary Reserved!</h4>
                <p className="text-xs text-teal-dark/80 max-w-xs leading-relaxed">
                  Thank you, <strong>{guestName}</strong>. Your luxury suite <span className="text-brass font-bold">{activeRoom?.name}</span> is provisionally reserved under direct booking.
                </p>

                <div className="bg-warm-cream border border-brass/25 rounded-xl p-3.5 w-full text-left space-y-1.5 text-xs max-w-sm">
                  <p className="text-[10px] text-brass font-mono uppercase tracking-wider font-bold border-b border-brass/15 pb-1 flex justify-between">
                    <span>Voucher Details</span>
                    <span>STATUS: PENDING</span>
                  </p>
                  <p className="flex justify-between text-teal-dark">
                    <span>Arrival:</span>
                    <strong className="font-mono">{checkIn}</strong>
                  </p>
                  <p className="flex justify-between text-teal-dark">
                    <span>Departure:</span>
                    <strong className="font-mono">{checkOut}</strong>
                  </p>
                  <p className="flex justify-between text-teal-dark">
                    <span>Total Due:</span>
                    <strong className="text-brass">{totalPricing.toLocaleString('en-NP')} NPR</strong>
                  </p>
                </div>

                <p className="text-[10px] text-teal-dark/60 leading-relaxed max-w-xs">
                  We've recorded your contacts. A resort coordinator will contact you shortly with travel guidelines.
                </p>

                <button
                  onClick={resetForm}
                  className="w-full py-2 bg-teal-dark text-warm-white font-serif text-xs rounded-xl hover:bg-teal-light transition-colors cursor-pointer"
                >
                  Return to Lodge Home
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
