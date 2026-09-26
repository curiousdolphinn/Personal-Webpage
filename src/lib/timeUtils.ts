/**
 * ============================================================================
 * HIGH-PRECISION TEMPORAL UTILITIES
 * ============================================================================
 * 
 * Computes live elapsed time since birth, time since personal reference date,
 * calendar metrics, and temporal progress without hardcoded lifespan assumptions.
 */

export interface ElapsedTimeBreakdown {
  totalHours: number;
  totalHoursFormatted: string;
  totalDays: number;
  totalDaysFormatted: string;
  totalWeeks: number;
  totalWeeksFormatted: string;
  totalMinutes: number;
  totalSeconds: number;
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFuture: boolean;
  countdownDays?: number;
  countdownHours?: number;
  humanReadable: string;
  preciseString: string;
}

export type TimeSinceBirth = ElapsedTimeBreakdown;

export interface HorizonProgress {
  elapsedHours: number;
  totalHours: number;
  percentage: number;
  percentageFormatted: string;
}

/**
 * Checks if a year is a leap year according to the Gregorian calendar
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Gets days in a specific month of a year
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Calculates live elapsed time from any given ISO date string to `now`.
 * If the date is in the future, it safely returns 0 with countdown information.
 */
export function calculateElapsedTime(dateString: string, now: Date = new Date()): ElapsedTimeBreakdown {
  const origin = new Date(dateString);
  const nowMs = now.getTime();
  const originMs = origin.getTime();
  const isFuture = originMs > nowMs;

  if (isFuture) {
    const diffMs = originMs - nowMs;
    const countdownHours = Math.ceil(diffMs / (1000 * 60 * 60));
    const countdownDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return {
      totalHours: 0,
      totalHoursFormatted: "0",
      totalDays: 0,
      totalDaysFormatted: "0",
      totalWeeks: 0,
      totalWeeksFormatted: "0",
      totalMinutes: 0,
      totalSeconds: 0,
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isFuture: true,
      countdownDays,
      countdownHours,
      humanReadable: `Begins upon turning 19 on Sep 5, 2026 (${countdownDays}d remaining)`,
      preciseString: `Starts Sep 5, 2026 · 00h 00m 00s`
    };
  }

  const diffMs = nowMs - originMs;

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);

  // Exact calendar difference calculation (years, months, days, hours, mins, secs)
  const y1 = origin.getUTCFullYear();
  let m1 = origin.getUTCMonth();
  let d1 = origin.getUTCDate();
  let h1 = origin.getUTCHours();
  let min1 = origin.getUTCMinutes();
  let s1 = origin.getUTCSeconds();

  let y2 = now.getUTCFullYear();
  let m2 = now.getUTCMonth();
  let d2 = now.getUTCDate();
  let h2 = now.getUTCHours();
  let min2 = now.getUTCMinutes();
  let s2 = now.getUTCSeconds();

  let seconds = s2 - s1;
  if (seconds < 0) {
    seconds += 60;
    min2 -= 1;
  }

  let minutes = min2 - min1;
  if (minutes < 0) {
    minutes += 60;
    h2 -= 1;
  }

  let hours = h2 - h1;
  if (hours < 0) {
    hours += 24;
    d2 -= 1;
  }

  let days = d2 - d1;
  if (days < 0) {
    const prevMonthDays = getDaysInMonth(y2, m2 === 0 ? 11 : m2 - 1);
    days += prevMonthDays;
    m2 -= 1;
  }

  let months = m2 - m1;
  if (months < 0) {
    months += 12;
    y2 -= 1;
  }

  const years = Math.max(0, y2 - y1);

  const totalHoursFormatted = new Intl.NumberFormat('en-US').format(totalHours);
  const totalDaysFormatted = new Intl.NumberFormat('en-US').format(totalDays);
  const totalWeeksFormatted = new Intl.NumberFormat('en-US').format(totalWeeks);

  return {
    totalHours,
    totalHoursFormatted,
    totalDays,
    totalDaysFormatted,
    totalWeeks,
    totalWeeksFormatted,
    totalMinutes,
    totalSeconds,
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    isFuture: false,
    humanReadable: `${years} years · ${months} months · ${days} days`,
    preciseString: `${years}y ${months}m ${days}d · ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
  };
}

/**
 * Calculates live elapsed time since birth (Sep 5, 2007)
 */
export function calculateTimeSinceBirth(dobString: string, now: Date = new Date()): TimeSinceBirth {
  return calculateElapsedTime(dobString, now);
}

/**
 * Calculates live elapsed time since turning 19 (Sep 5, 2026).
 * Tracks continuous live elapsed hours and days.
 */
export function calculateTimeSinceReference(refDateString: string, now: Date = new Date()): ElapsedTimeBreakdown {
  return calculateElapsedTime(refDateString, now);
}

/**
 * Calculates dynamic personal year progress for age 19 (from Sep 5, 2026 to Sep 5, 2027).
 * Increments dynamically every second/minute as time progresses.
 */
export function calculatePersonalYearProgress(birthdayStr: string = "2026-09-05T00:00:00Z", now: Date = new Date()): HorizonProgress & { daysIntoYear: number } {
  const refDate = new Date(birthdayStr);
  const nextBirthday = new Date(refDate);
  nextBirthday.setFullYear(refDate.getFullYear() + 1);

  const totalMs = nextBirthday.getTime() - refDate.getTime();
  const elapsedMs = Math.max(0, now.getTime() - refDate.getTime());

  if (now.getTime() < refDate.getTime()) {
    return {
      elapsedHours: 0,
      totalHours: Math.round(totalMs / (1000 * 60 * 60)),
      percentage: 0,
      percentageFormatted: "0.0%",
      daysIntoYear: 0
    };
  }

  const elapsedHours = Math.floor(elapsedMs / (1000 * 60 * 60));
  const totalHours = Math.round(totalMs / (1000 * 60 * 60));
  const percentage = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
  const daysIntoYear = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));

  return {
    elapsedHours,
    totalHours,
    percentage: Math.round(percentage * 10) / 10,
    percentageFormatted: `${percentage.toFixed(1)}%`,
    daysIntoYear
  };
}

/**
 * Calculates current calendar year elapsed progress dynamically
 */
export function calculateYearProgress(now: Date = new Date()): HorizonProgress {
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1, 0, 0, 0, 0);
  const endOfYear = new Date(year + 1, 0, 1, 0, 0, 0, 0);

  const totalMs = endOfYear.getTime() - startOfYear.getTime();
  const elapsedMs = Math.max(0, now.getTime() - startOfYear.getTime());

  const elapsedHours = Math.floor(elapsedMs / (1000 * 60 * 60));
  const totalHours = Math.round(totalMs / (1000 * 60 * 60));
  const percentage = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));

  return {
    elapsedHours,
    totalHours,
    percentage: Math.round(percentage * 10) / 10,
    percentageFormatted: `${percentage.toFixed(1)}%`
  };
}

export interface DetailedMonthProgress extends HorizonProgress {
  monthName: string;
  dayOfMonth: number;
  daysInMonth: number;
  summary: string;
}

/**
 * Calculates current month elapsed progress dynamically
 * Percentage = (elapsed hours in current month) / (total hours in current month) * 100
 */
export function calculateMonthProgress(now: Date = new Date()): DetailedMonthProgress {
  const year = now.getFullYear();
  const month = now.getMonth();
  const startOfMonth = new Date(year, month, 1, 0, 0, 0, 0);
  const endOfMonth = new Date(year, month + 1, 1, 0, 0, 0, 0);

  const totalMs = endOfMonth.getTime() - startOfMonth.getTime();
  const elapsedMs = Math.max(0, now.getTime() - startOfMonth.getTime());

  const elapsedHours = Math.floor(elapsedMs / (1000 * 60 * 60));
  const totalHours = Math.round(totalMs / (1000 * 60 * 60));
  const percentage = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[month] || "Current Month";
  const dayOfMonth = now.getDate();
  const daysInMonth = getDaysInMonth(year, month);

  return {
    elapsedHours,
    totalHours,
    percentage: Math.round(percentage * 10) / 10,
    percentageFormatted: `${percentage.toFixed(1)}%`,
    monthName,
    dayOfMonth,
    daysInMonth,
    summary: `Day ${dayOfMonth} of ${daysInMonth} · ${elapsedHours}h of ${totalHours}h`
  };
}

export interface DetailedDayProgress {
  elapsedHours: number;
  elapsedMinutes: number;
  totalHours: number;
  percentage: number;
  formatted: string;
  percentageFormatted: string;
  summary: string;
}

/**
 * Calculates today's elapsed progress based on current time
 * Percentage = (minutes elapsed since 00:00 midnight) / (1440 minutes in a day) * 100
 */
export function calculateDayProgress(now: Date = new Date()): DetailedDayProgress {
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const elapsedMs = Math.max(0, now.getTime() - startOfDay.getTime());
  
  const totalMinutes = Math.floor(elapsedMs / (1000 * 60));
  const elapsedHours = Math.floor(totalMinutes / 60);
  const elapsedMins = totalMinutes % 60;
  const percentage = Math.min(100, (elapsedMs / (24 * 60 * 60 * 1000)) * 100);

  return {
    elapsedHours,
    elapsedMinutes: elapsedMins,
    totalHours: 24,
    percentage: Math.round(percentage * 10) / 10,
    formatted: `${elapsedHours}h ${String(elapsedMins).padStart(2, '0')}m`,
    percentageFormatted: `${percentage.toFixed(1)}%`,
    summary: `${elapsedHours}h ${String(elapsedMins).padStart(2, '0')}m elapsed of 24h`
  };
}
