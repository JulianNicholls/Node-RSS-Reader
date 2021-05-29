// Return a Human representation of the time elapsed since
// a passed time, or between two times.

const HOUR_SECS = 3600;
const DAY_SECS = 24 * HOUR_SECS;

const numberWords = [
  'A couple of',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
];

const wordValue = (value) => {
  if (value >= 2 && value <= 9) return numberWords[value - 2];

  return String(value);
};

const lastHour = (elapsed) => {
  if (elapsed < 90) return 'Just now';
  if (elapsed < 210) return 'A few minutes ago';
  if (elapsed >= 28.5 * 60 && elapsed <= 31.5 * 60) return 'Half an hour ago';
  if (elapsed >= 58.5 * 60 && elapsed <= 65 * 60) return 'An hour ago';

  return `${wordValue(Math.round(elapsed / 60))} minutes ago`;
};

const daysWeeks = (days) => {
  if (days <= 28) return `${wordValue(Math.round(Math.max(2, days)))} days`;
  if (days <= 49) return `${wordValue(Math.round((days + 3) / 7))} weeks`;

  return monthsYears(days);
};

const monthsYears = (days) => {
  if (days < 20 * 30) return `${wordValue(Math.round(days / 30))} months`;

  return `${wordValue(Math.round(days / 365))} years`;
};

// If no 'present' time is passed, use now.
function humanTime(time, present = new Date()) {
  const today = () => {
    if (elapsed < 71 * 60) return lastHour(elapsed);

    if (time < midday && present > twopm) return 'This morning';

    return `${wordValue(Math.round(hours))} hours ago`;
  };

  const longer = () => {
    if (days >= 6 && days <= 8) return 'A week';
    if (days >= 13 && days <= 15) return 'A fortnight';

    return daysWeeks(days);
  };

  const [y, m, d] = [present.getFullYear(), present.getMonth(), present.getDate()];
  const midnight = new Date(y, m, d, 0, 0, 0);
  const midday = new Date(y, m, d, 12, 0, 0);
  const twopm = new Date(y, m, d, 14, 0, 0);

  // Calculate whole time in seconds, and from there, number of hours
  // and days
  const elapsed = (present.getTime() - time.getTime()) / 1000;
  const hours = elapsed / HOUR_SECS + 0.45;
  const days = (midnight.getTime() - time.getTime()) / (DAY_SECS * 1000);

  if (days < 0) return today();

  if (days < 1) return 'Yesterday';

  return longer() + ' ago';
}

module.exports = humanTime;
