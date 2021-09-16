const addNums = (...a: number[]): number =>
 a.reduce((acc, val) => acc + val);

const nums: number[] = [ 1, 6, 2];
console.log(addNums(...nums));