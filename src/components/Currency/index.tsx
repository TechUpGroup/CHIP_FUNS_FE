'use client';

import BigNumber from 'bignumber.js';
import { isNil } from 'lodash';
import { FC } from 'react';

import { Tooltip } from '@/components/ui/tooltip';

import { getValueKBM } from './currency.util';

type Value = string | number | null | undefined | BigNumber | bigint;

type Props = {
  value: Value;
  isWei?: boolean;
  decimalNumber?: number;
  rounded?: boolean;
  decimal?: number;
  isPositive?: boolean;
  roundingMode?: BigNumber.RoundingMode;
  isKmb?: boolean;
  prefix?: string;
  suffix?: string;
};

function countConsecutiveZerosAfterDecimal(numberString: string): number {
  const match = numberString.match(/\.0+/);
  return match ? match[0].length - 1 : 0;
}

const getValue = (props: Props) => {
  const {
    value,
    isWei,
    rounded,
    decimal = 3,
    decimalNumber,
    isPositive,
    roundingMode = BigNumber.ROUND_DOWN,
    isKmb,
    prefix,
    suffix,
  } = props;
  let valueShow = '---';
  let fullValue = '---';
  let isRounded = false;
  try {
    // test
    if (!isNil(value)) {
      const valueTemp = value instanceof BigNumber ? value.toFixed() : value.toString();
      const numberDecimal = isWei ? 6 : decimalNumber;
      let valueBig =
        numberDecimal !== undefined
          ? BigNumber(valueTemp).dividedBy(Math.pow(10, numberDecimal))
          : BigNumber(valueTemp);

      if (valueBig.isNaN()) {
        throw new Error();
      } else if (isPositive && valueBig.isNegative()) {
        // valueBig = valueBig.negated();
        valueBig = BigNumber(0);
      }

      if (!valueBig.isZero() && valueBig.abs().lt(10 ** -decimal)) {
        const zeros = countConsecutiveZerosAfterDecimal(valueBig.toFixed());
        const zs = zeros.toString();
        let ucZeros = '';
        for (let i = 0; i < zs.length; ++i) {
          ucZeros += String.fromCharCode(parseInt(`+208${zs[i]}`, 16));
        }
        valueShow = valueBig
          .decimalPlaces(zeros + decimal, roundingMode)
          .toFixed()
          .replace(/[.,]{1}0+/, `.0${ucZeros}`);
        isRounded = true;
      } else {
        valueShow = valueBig.decimalPlaces(decimal, roundingMode).toFormat();
      }

      if (isKmb) {
        const valueKmb = getValueKBM(valueBig, roundingMode);
        if (!isNil(valueKmb)) {
          valueShow = valueKmb;
        }
      } else if (rounded) {
        if (valueBig.gt(10 ** 3)) {
          valueShow = '> 1,000';
        } else if (valueBig.lt(10 ** -3)) {
          valueShow = '< 0.001';
        }
      }

      fullValue = valueBig.toFormat();
      isRounded = valueShow !== fullValue;
    }
  } catch {
    valueShow = '---';
    fullValue = '---';
    isRounded = false;
  }
  return {
    value: `${prefix ?? ''}${valueShow}${suffix ?? ''}`,
    fullValue: `${prefix ?? ''}${fullValue}${suffix ?? ''}`,
    isRounded,
  };
};

export const Currency: FC<Props> = (props) => {
  const { value: valueShow, isRounded, fullValue } = getValue(props);
  if (!isRounded && !props.rounded) return <>{valueShow}</>;
  return (
    <Tooltip content={fullValue}>
      <div>{valueShow}</div>
    </Tooltip>
  );
};
