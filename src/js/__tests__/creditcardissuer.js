import creditCardIssuer from '../creditcardissuer';

test.each([
  ['mir for 22', '2221293052254723', 'mir'],
  ['visa for 4*', '4221293052254723', 'visa'],
  ['mastercard for 51', '5121293052254723', 'mastercard'],
  ['american express for 34', '3421293052254723', 'americanexpress'],
  ['discover for 60', '6021293052254723', 'discover'],
  ['jcb for 35', '3521293052254723', 'jcb'],
  ['diners club for 30', '3021293052254723', 'dinersclub'],
  ['empty string', '000000000000', ''],
])(('test %s'), (_, input, expected) => {
  expect(creditCardIssuer(input)).toBe(expected);
});