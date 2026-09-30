const input = document.getElementById("date-input");
const output = document.getElementById("output");

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

function calculateRemainingTime(referenceDate, nowDate) {
  const difference = referenceDate.getTime() - nowDate.getTime();

  if (difference <= 0) {
    return {
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  const totalSeconds = Math.floor(difference / ONE_SECOND);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    expired: false,
    days,
    hours,
    minutes,
    seconds
  };
}

function updateCountdown() {
  if (!input || !output) return;

  const selectedDate = input.value;

  if (!selectedDate) {
    output.textContent = "0 days, 0 hours, 0 minutes, 0 seconds";
    return;
  }

  const targetDate = new Date(`${selectedDate}T00:00:00`);
  const remainingTime = calculateRemainingTime(targetDate, new Date());

  if (remainingTime.expired) {
    output.textContent = "Data já passou";
    return;
  }

  output.textContent = `${remainingTime.days} days, ${remainingTime.hours} hours, ${remainingTime.minutes} minutes, ${remainingTime.seconds} seconds`;
}

if (input && output) {
  input.addEventListener("change", updateCountdown);
  setInterval(updateCountdown, 1000);
  updateCountdown();
}