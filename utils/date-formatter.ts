import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function dateFormatter(created: number, current: number) {
  const formateDuration = dayjs
    .duration(current - created)
    .format('Y[Y]M[M]D[D]H[H]')
    .split('-');

  let result = '';
  for (let i = 0; i < formateDuration.length; i++) {
    const prefixDate = parseInt(formateDuration[i].slice(0, -1));

    if (prefixDate > 0) {
      switch (formateDuration[i].slice(-1)) {
        case 'Y':
          result = prefixDate + ` year${prefixDate > 1 ? 's' : ''}`;
          break;
        case 'M':
          result = prefixDate + ` month${prefixDate > 1 ? 's' : ''}`;
          break;
        case 'D':
          result = prefixDate + ` day${prefixDate > 1 ? 's' : ''}`;
          break;
        case 'H':
          result = prefixDate + ` hour${prefixDate > 1 ? 's' : ''}`;
          break;
        default:
          break;
      }
      break;
    }
  }
  return result;
}
