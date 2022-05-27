export function undefinedArrayCheck<T>(arr: Array<T | undefined>) {
  if (arr.filter((a) => typeof a === 'undefined').length === 0) {
    console.log(arr);
    
    return arr as Array<T>;
  } else {
    return [] as Array<T>;
  }
}

export function checkHex(hex: string) {
  return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(hex);
}
