import formatCurrency from '../../scripts/utils/money.js';

describe("A suite is just a function", () => {
  it('converts cents', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('work woth zero', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds to cent', () => {
    expect(formatCurrency(2005.5)).toEqual('20.06');
  });
});