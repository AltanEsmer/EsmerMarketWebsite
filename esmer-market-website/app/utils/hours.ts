// Store opening hours for Esmer Market
// Format: [opening hour, closing hour] in 24-hour format

export type DayHours = {
  open: number;  // Opening hour (0-23)
  close: number; // Closing hour (0-23)
};

export type WeekHours = {
  [key: number]: DayHours; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
};

// Hours: 7:00 AM to 1:00 AM (next day)
export const storeHours: WeekHours = {
  0: { open: 7, close: 25 },  // Sunday: 7:00 AM - 1:00 AM (next day)
  1: { open: 7, close: 25 },  // Monday: 7:00 AM - 1:00 AM (next day)
  2: { open: 7, close: 25 },  // Tuesday: 7:00 AM - 1:00 AM (next day)
  3: { open: 7, close: 25 },  // Wednesday: 7:00 AM - 1:00 AM (next day)
  4: { open: 7, close: 25 },  // Thursday: 7:00 AM - 1:00 AM (next day)
  5: { open: 7, close: 25 },  // Friday: 7:00 AM - 1:00 AM (next day)
  6: { open: 7, close: 25 },  // Saturday: 7:00 AM - 1:00 AM (next day)
};

/**
 * Check if the store is currently open based on the current time
 * @returns {boolean} True if the store is open, false otherwise
 */
export function isStoreOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  
  // Check if we have hours defined for this day
  if (!(day in storeHours)) {
    return false; // Closed if no hours defined for this day
  }
  
  const { open, close } = storeHours[day];
  
  // Handle cases where closing time is on the next day
  if (close > 24) {
    return hour >= open || hour < (close - 24);
  }
  
  // Normal case: open and close on the same day
  return hour >= open && hour < close;
}

/**
 * Get the current store status with additional information
 */
export function getStoreStatus() {
  const isOpen = isStoreOpen();
  const now = new Date();
  const day = now.getDay();
  const todayHours = storeHours[day];
  
  return {
    isOpen,
    currentDay: day,
    openingHour: todayHours?.open,
    closingHour: todayHours?.close > 24 ? todayHours?.close - 24 : todayHours?.close,
    statusText: isOpen ? 'open' : 'closed',
  };
} 