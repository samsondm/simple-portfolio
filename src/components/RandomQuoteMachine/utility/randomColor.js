import random from "./random";

export default function randomColor() {
  const hue = random(0, 360),
        saturation = random(50, 100) + '%',
        lightness = random(40, 60) + '%';
  
  return `hsl(${hue}, ${saturation}, ${lightness})`;
}