import formatCurrency from "../../scripts/utils/money.js";

describe("A suite for functions", () => {
  it('converts cents', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('work with zero', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds to cents', () => {
    expect(formatCurrency(2005.5)).toEqual('20.06');
  });
});