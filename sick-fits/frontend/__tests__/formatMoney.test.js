import formatMoney from '../lib/formatMoney';

describe('formatMoney Function', () => {
  it('Works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(parseInt('010'))).toEqual('$0.10');
  });
  it('Should leave off zero cents', () => {
    expect(formatMoney(600)).toBe('$6');
  });
});
