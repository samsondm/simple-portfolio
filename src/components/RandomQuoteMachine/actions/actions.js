import { REQUEST_QUOTE, RECIEVE_QUOTE, GET_CACHED_QUOTE } from './actionTypes';

export function getCachedQuote(author, quote) {
  return {
    type: GET_CACHED_QUOTE,
  };
}

function requestQuote() {
  return {
    type: REQUEST_QUOTE
  };
}

function recieveQuote(quote, author) {
  return {
    type: RECIEVE_QUOTE,
    quote,
    author
  };
}

export function fetchQuote() {
  return async (dispatch, getState) => {
    try {
      dispatch(requestQuote());
      const url = `https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&timestamp=${Date.now()}`,
        params = { cache: 'no-store' };
      const response = await fetch(url, params);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      if (getState().isFetching) {
        const author = json[0].title.trim(),
          quote = json[0].content.trim().replace(/^(?:<p>)|(?:<\/p>)$/g, ''); // remove <p></p> from quote
        dispatch(recieveQuote(quote, author));
      }
    } catch (err) {
      console.error('error caught', err);
    }
  };
}