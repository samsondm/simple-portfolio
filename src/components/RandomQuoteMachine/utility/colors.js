import { peopleQuotesLength } from "./quotes";
import randomColor from "./randomColor";

let colors = [];

for (let i = 0; i < peopleQuotesLength; i++) {
  colors.push(randomColor());
}

export default colors;