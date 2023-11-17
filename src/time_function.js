export function secondsToHms(seconds) {
  function pad(value) {
    return value < 10 ? `0${value}` : value;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = pad(hours);
  const formattedMinutes = pad(minutes);
  const formattedSeconds = pad(remainingSeconds);
  if (hours > 0) {
    return `Prochain affichage dans ${formattedHours} Heures et ${formattedMinutes} Minutes`;
  } else if (hours === 0 && minutes > 0) {
    return `Prochain affichage dans ${formattedMinutes} Minutes et ${formattedSeconds} Secondes`;
  } else if (hours <= 0 && minutes <= 0) {
    return null;
  }
  return null;
}
