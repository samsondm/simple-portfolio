const replaceChars = (input) =>
  input.replace(/\u00d7/g, '*')
    .replace(/\u00f7/g, '/')
    .replace(/\u2212/g, '-');

export default replaceChars;
