//* Resistors Colors
export enum ResistorValues {
  black = 0,
  brown = 1,
  red = 2,
  orange = 3,
  yellow = 4,
  green = 5,
  blue = 6,
  violet = 7,
  grey = 8,
  white = 9,
}

type Color = keyof typeof ResistorValues;  // Type is 'black' | 'brown' etc.

export function decodedValue([first, second]: Color[]): number {
  return Number(`${ResistorValues[first]}${ResistorValues[second]}`)
}

console.log('decodedValue: ', decodedValue(['brown', 'black']) === 10);
console.log('\n');

export function decodedResistorValue([first, second, third]: Color[]): string {
  const zeros = `${'0'.repeat(ResistorValues[third])}`;
  const value = Number(`${ResistorValues[first]}${ResistorValues[second]}${zeros}`);

  if (value >= 1000000000) return `${value / 1000000000} gigaohms`
  else if (value >= 1000000) return `${value / 1000000} megaohms`
  else if (value >= 1000) return `${value / 1000} kiloohms`

  return `${value} ohms`;
}

console.log('decodedResistorValue: ', decodedResistorValue(['orange', 'orange', 'black']) === '33 ohms');
console.log('decodedResistorValue: ', decodedResistorValue(['blue', 'grey', 'brown']) === '680 ohms');
console.log('decodedResistorValue: ', decodedResistorValue(['red', 'black', 'red']) === '2 kiloohms');
console.log('decodedResistorValue: ', decodedResistorValue(['green', 'brown', 'orange']) === '51 kiloohms');
console.log('decodedResistorValue: ', decodedResistorValue(['blue', 'violet', 'blue']) === '67 megaohms');
console.log('decodedResistorValue: ', decodedResistorValue(['white', 'white', 'white']) === '99 gigaohms');
console.log('\n');

//* Leap Year
export function isLeap(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
console.log('isLeap 2015 false: ', isLeap(2015));
console.log('isLeap 1996 true: ', isLeap(1996));
console.log('isLeap 1960 true: ', isLeap(1960));
console.log('isLeap 1900 false: ', isLeap(1900));
console.log('\n');

//* RNA Transcription
export enum DNAtoRNA {
  'G' = 'C',
  'C' = 'G',
  'T' = 'A',
  'A' = 'U',
}

type DNA = keyof typeof  DNAtoRNA;
// TODO: handle "Invalid input DNA."
export const toRna = (value: string): string => {
  return value.split('')
    .map((str: string): string => DNAtoRNA[str as DNA])
    .join('');
}