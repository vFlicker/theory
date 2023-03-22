/*
  Example 1
*/
(() => {
  class Person {
    name;
  
    constructor(name) {
      this.name = name;
    }
    
    setName(name) {
      this.name = name;
    }
  }
  
  class InMemoryPersonStorage {
    persons = new Set();
  
    store(person) {
      this.persons.add(person);
    }
  }
  
  const myPersonStorage = new InMemoryPersonStorage();
  
  const person = new Person("John");
  myPersonStorage.store({...person});
  person.setName("Jane")
  myPersonStorage.store({...person});
  
  console.log(myPersonStorage); // persons: Set(2) { { name: 'John' }, { name: 'Jane' } }
})();

/*
  Example 2
*/
(() => {
class Person {
  name;

  constructor(name) {
    this.name = name;
  }
  
  withName(name) {
    return new Person(name);
  }
}

class InMemoryPersonStorage {
  persons = new Set();

  store(person) {
    this.persons.add(person);
  }
}

const myPersonStorage = new InMemoryPersonStorage();

const person = new Person("John");
myPersonStorage.store(person);
const updatedPerson = person.withName("Jane")
myPersonStorage.store(updatedPerson);

console.log(myPersonStorage); // persons: Set(2) { Person { name: 'John' }, Person { name: 'Jane' } }
})();