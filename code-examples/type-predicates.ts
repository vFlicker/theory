type Dog = {
  isBig: boolean;
  name: string;
}

 type Cat = {
  lives: number;
  name: string;
}

 type Animal = Dog | Cat;
 
function getAnimal(): Animal {
  return {
    isBig: true,
    name: 'spike',
  }
}

// function isCat(animal: Animal): boolean {
function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).lives !== undefined;
  // or
  // return 'lives' in animal;
}

const animal = getAnimal();

if (isCat(animal)) {
  console.log(animal.lives);
  } else {
  console.log(animal.isBig);
}
