import BigNumber from 'bignumber.js';

import { env } from 'env.mjs';

export function getAssetUrl(src: unknown) {
  if (!env.basePath) return src as string;
  return typeof src === 'string' && !src.startsWith('http') ? env.basePath + src : (src as string);
}

export function getPercent(w1: number, w2: number) {
  return (w1 / w2) * 100 + '%';
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatUnits(value: BigNumber.Value, decimal: number) {
  try {
    return BigNumber(value).div(BigNumber(10).pow(decimal)).toFixed();
  } catch {
    return '';
  }
}

export const genrateEndOrdinalNumber = (stt: number) => {
  if (stt.toString().endsWith('1')) {
    return 'st';
  } else if (stt.toString().endsWith('2')) {
    return 'nd';
  } else if (stt.toString().endsWith('3')) {
    return 'rd';
  }
  return 'th';
};
export const genrateOrdinalNumber = (stt: number) => {
  return `${stt}${genrateEndOrdinalNumber(stt)}`;
};
