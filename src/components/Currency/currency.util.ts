import type BigNumber from 'bignumber.js';

export const getValueKBM = (valueBig: BigNumber, roundingMode: BigNumber.RoundingMode) => {
  if (valueBig.gte(1e9)) {
    return valueBig.dividedBy(1e9).decimalPlaces(2, roundingMode).toFixed() + 'B';
  } else if (valueBig.gte(1e6)) {
    return valueBig.dividedBy(1e6).decimalPlaces(2, roundingMode).toFixed() + 'M';
  } else if (valueBig.gte(1e3)) {
    return valueBig.dividedBy(1e3).decimalPlaces(2, roundingMode).toFixed() + 'K';
  }
  return undefined;
};
