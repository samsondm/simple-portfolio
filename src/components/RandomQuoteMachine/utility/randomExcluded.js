export default function randomExcluded(min, max, exclude) {
  let random = Math.floor(Math.random() * (max - min) + min);
  if (random >= exclude) {
    random += 1;
  }
  return random;
}
