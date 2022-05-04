import { Injectable } from '@angular/core';

// This service just serves as a black box to generate a random password 
@Injectable()
export class RandomPasswordGeneratorService {

  // Different types of character sets
  allLower: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  allUpper: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  allSpecialCharacters: string[] = `!@#$^&%*()+=-[]\/{}|:<>?,.`.split('');
  allNumbers: string[] = '0123456789'.split('');

  constructor() { 
    
    console.log(this.allLower);
    console.log(this.allUpper);
    console.log(this.allSpecialCharacters);
    console.log(this.allNumbers);

  }


  // Shuffles the array containing types of characters needed for better security through more randomness
  shuffleArray(typeArray: string[]): string[] {

    let index = typeArray.length;
    let randomIndex;

    while (index != 0) {
      randomIndex = Math.floor(Math.random() * index);
      index-=1;
      [typeArray[index], typeArray[randomIndex]] = [typeArray[randomIndex], typeArray[index]];
    }

    return typeArray;
  }


  getRandomCharacter(charType: string): string {

    let char;

    switch (charType) {
      case 'lowerCase':
        char = this.allLower[Math.floor(Math.random() * this.allLower.length)];
        break;
      case 'upperCase':
        char = this.allUpper[Math.floor(Math.random() * this.allUpper.length)];
        break;
      case 'specialCharacter':
        char = this.allSpecialCharacters[Math.floor(Math.random() * this.allSpecialCharacters.length)];
        break;
      case 'number':
        char = this.allNumbers[Math.floor(Math.random() * this.allNumbers.length)];
        break;
      default:
        char = ''
        break;
    }

    return char;

  }

  
  // Takes in the requirements and calls the above functions to generate a random password
  getNewRandomPass(neededLength: number, neededCharTypes: Set<string>): string {

    // Invalid case
    if (neededLength < neededCharTypes.size) {
      return '';
    }


    let newPassword = '';

    // To satisfy the minimum requirement for inserting all the needed types of character
    // we can just make an array out of the Set
    // Once we have that, we can randomly append values from current array to the end of the same array
    // until we've reached the required neededLength


    let minTypeReq = Array.from(neededCharTypes);

    minTypeReq = this.shuffleArray(minTypeReq);

    while(minTypeReq.length < neededLength) {
      
      let randomIndex = Math.floor(Math.random() * minTypeReq.length);
      minTypeReq.push(minTypeReq[randomIndex]);

    }

    minTypeReq = this.shuffleArray(minTypeReq);

    minTypeReq.forEach((typeNeeded: string) => {
      newPassword += this.getRandomCharacter(typeNeeded);
    });

    return newPassword;

  } 


  // Determines the strength of the password based on its length on configuration
  determineStrength(password: string, configuration: Set<string>): 'Strong' | 'Medium' | 'Weak' | 'Worst' {

    let strength: 'Strong' | 'Medium' | 'Weak' | 'Worst';

    if (!password || !password.length) {
      strength = 'Worst';
    } else if(password.length <= 10) {
      if(configuration.size >= 2 && password.length >= 8) {
        strength = 'Medium';
      } else {
        strength = 'Weak'
      }
    } else {
      if(configuration.size >= 2) {
        strength = 'Strong';
      } else {
        strength = 'Medium';
      }
    }

    return strength;

  }

}
