// Store opening hours for Esmer Market
// Format: [opening hour, closing hour] in 24-hour format

export type DayHours = {
  open: number;  // Opening hour (0-23)
  close: number; // Closing hour (0-23)
};

export type WeekHours = {
  [key: number]: DayHours; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
};

// Default hours: 8:00 AM to 10:00 PM (22:00)
// Sunday might have different hours or be closed
export const storeHours: WeekHours = {
  0: { open: 9, close: 20 },  // Sunday: 9:00 AM - 8:00 PM
  1: { open: 8, close: 22 },  // Monday: 8:00 AM - 10:00 PM
  2: { open: 8, close: 22 },  // Tuesday: 8:00 AM - 10:00 PM
  3: { open: 8, close: 22 },  // Wednesday: 8:00 AM - 10:00 PM
  4: { open: 8, close: 22 },  // Thursday: 8:00 AM - 10:00 PM
  5: { open: 8, close: 22 },  // Friday: 8:00 AM - 10:00 PM
  6: { open: 8, close: 22 },  // Saturday: 8:00 AM - 10:00 PM
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
  if (close < open) {
    return hour >= open || hour < close;
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
    closingHour: todayHours?.close,
    statusText: isOpen ? 'open' : 'closed',
  };
} 