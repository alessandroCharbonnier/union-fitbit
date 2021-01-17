export function formatDate(weekday, day, month) {
  const weekdayArray = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const monthArray = ["Jan.", "Fev.", "Mars", "Avr.", "Mai.", "Juin", "Jui.", "Aout", "Sep.", "Oct.", "Nov.", "Dec."];
  
  return `${weekdayArray[weekday]} ${day} ${monthArray[month]}`;
}


// Returns an angle (0-360) for the current hour in the day, including minutes
export function hoursToAngle(hours, minutes) {
  return (360 / 12) * hours + (360 / 12 / 60) * minutes;
}

// Returns an angle (0-360) for minutes
export function minutesToAngle(minutes, seconds) {
  return (360 / 60) * minutes + (360 / 60 / 60) * seconds;
}

// Returns an angle (0-360) for seconds
export function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Returns an angle (0-360) for seconds
export function zeroPadding(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number
}