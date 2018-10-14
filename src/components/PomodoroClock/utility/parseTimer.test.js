import parseTimer from "./parseTimer";

describe('parseTimer', () => {
  test.each([
    -1,
    3601
  ])('throws error on out of bound values', seconds =>
    expect(() => parseTimer(seconds)).toThrowError()
  );

  test.each`
    seconds | expected
    ${0}    | ${'00:00'}
    ${1}    | ${'00:01'}
    ${15}   | ${'00:15'}
    ${60}   | ${'01:00'}
    ${61}   | ${'01:01'}
    ${3599} | ${'59:59'}
  `('parses seconds into formated time', ({ seconds, expected }) =>
      expect(parseTimer(seconds)).toBe(expected)
    );
});