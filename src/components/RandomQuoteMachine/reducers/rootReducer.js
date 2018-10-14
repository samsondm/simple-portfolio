import { REQUEST_QUOTE, RECIEVE_QUOTE, GET_CACHED_QUOTE } from '../actions/actionTypes';
import random from '../utility/random';
import { peopleQuotesLength, peopleQuotes } from '../utility/quotes';


const defaultState = {
  author: '',
  quote: '',
  isFetching: false,
};

export default function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_QUOTE:
      return {
        ...state,
        isFetching: true
      };
    case RECIEVE_QUOTE:
      return {
        ...state,
        author: action.author,
        quote: action.quote,
        isFetching: false
      };
    case GET_CACHED_QUOTE: {
      const randomQuote = random(0, peopleQuotesLength - 1);
      return {
        ...state,
        author: peopleQuotes[randomQuote].name,
        quote: peopleQuotes[randomQuote].quote,
        isFetching: false
      };
    }
    default:
      return state;
  }
}