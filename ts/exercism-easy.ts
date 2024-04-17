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

type DNA = keyof typeof DNAtoRNA;

function isValidDNA(str: string): str is DNA {
  return DNAtoRNA.hasOwnProperty(str);
}

export const toRna = (value: string): string => {
  try {
    return value.split('')
      .reduce<DNA[]>((dnaList, char) => {
        if (isValidDNA(char)) {
          return [...dnaList, DNAtoRNA[char as DNA] as DNA];
        }
        throw new Error('Invalid input DNA.');
      }, [])
      .join('');
  } catch (error: any) {
    return error.message;
  }
}

console.log('RNA Transcription: ', toRna('XXX'))
console.log('RNA Transcription: ', toRna('C'))
console.log('RNA Transcription: ', toRna('U'))
console.log('\n');

//* Space Age
enum OrbitalPeriods {
  mercury = 0.2408467,
  venus = 0.61519726,
  earth = 1.0,
  mars = 1.8808158,
  jupiter = 11.862615,
  saturn = 29.447498,
  uranus = 84.016846,
  neptune = 164.79132
};
export function age(planet: keyof typeof OrbitalPeriods, seconds: number): number {
  const earthYears = seconds / 31557600;
  const orbitalPeriod = OrbitalPeriods[planet];
  return parseFloat((earthYears / orbitalPeriod).toFixed(2));
}
console.log('Space Age: ', age('earth', 1000000000), 31.69);
console.log('Space Age: ', age('mars', 2129871239), 35.88);

//* D&D Character
export class DnDCharacter {
  public static generateAbilityScore(): number {
    throw new Error('Remove this statement and implement this function')
  }

  public static getModifierFor(abilityValue: number): number {
    throw new Error('Remove this statement and implement this function')
  }
}