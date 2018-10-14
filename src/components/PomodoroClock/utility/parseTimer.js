export const minToSec = (minutes) => {
  if (minutes < 0) throw new Error('minutes are out of bounds');
  return minutes * 60;
};

const parseTimer = (seconds) => {
  if (seconds < 0 || seconds > 3600) throw new Error('seconds are out of bounds');
  const min = Math.floor(seconds / 60),
    sec = seconds % 60,
    strMin = min < 10 ? '0' + min : min.toString(),
    strSec = sec < 10 ? '0' + sec : sec.toString();
  return strMin + ':' + strSec;
};

export default parseTimer;