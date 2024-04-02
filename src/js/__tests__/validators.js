import isValidLuhn from '../validators';

test.each([
  ['false for >19 digits', '12345000000000000000000', false],
  ['false for <12 digits', '12345000', false],
  ['true', '5121293052254723', true],
  ['false', '5121293052254720', false],
  ['false', '000000000000', false],
])(('test %s'), (_, input, expected) => {
  expect(isValidLuhn(input)).toBe(expected);
});