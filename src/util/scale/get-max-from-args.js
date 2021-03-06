//      
import {
  InvalidArgsForMinMaxScale,
  InvalidMaxForScale,
  InvalidMinForScale
} from '../errors';
import toNumberOrAuto from './to-number-or-auto';
import isValidMinMaxValue from './is-valid-min-max-value';
import getRawMinFromArgs from './get-raw-min-from-args';

const AUTO         = 'auto';

export default function getMaxFromArgs(args          ) {
  const min = getRawMinFromArgs(args);
  if (min instanceof InvalidMinForScale) {
    return min;
  }

  if (isValidMinMaxValue(args[2])) {
    if (args.length > 4) {
      return new InvalidArgsForMinMaxScale(min);
    } if (isValidMinMaxValue(args[3])) {
      return toNumberOrAuto(args[3]);
    }
  } else {
    if (!args[3]) {
      return AUTO;
    } if (isValidMinMaxValue(args[4])) {
      return toNumberOrAuto(args[4]);
    } if (args[4]) {
      return new InvalidMaxForScale(args[4]);
    }
  }

  return min;
}
