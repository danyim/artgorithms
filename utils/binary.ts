/**
 * Returns the bit value in the nth position of a binary number. Position increments from _right to left_.
 * @param number Decimal number
 * @param pos 0-based position in the binary, starts from the right to left
 * @returns
 */

export function getBit(number: number, pos: number) {
  // console.log(
  //   `number:${number}, pos:${pos}, bit@pos:${
  //     number.toString()[number.toString().length - pos - 1]
  //   } -- result ${(number >> pos) % 2 != 0}`
  // );
  return (number >> pos) % 2 != 0;
}
