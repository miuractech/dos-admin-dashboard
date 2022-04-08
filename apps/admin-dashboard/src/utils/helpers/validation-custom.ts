export function undefinedArrayCheck<T>(arr: Array<T | undefined>) {
  if (arr.filter((a) => typeof a === 'undefined').length === 0) {
    return true;
  } else {
    return false;
  }
}

export function checkHex(hex: string) {
  return /0[xX][0-9a-fA-F]+/.test(hex);
}
