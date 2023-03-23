# Open-Closed Principle (принцип відкритості-закритості)

Програмні сутності повинні бути відкриті до розширення, але закриті для модифікації. Йдеться про те, що не можна перевизначати методи чи класи, просто додаючи додаткові функції за необхідності. Просте правило: якщо ви змінюєте сутність, щоб зробити її розширюваною, ви вперше порушили цей принцип

**Приклад порушення**

```ts
type WeaponType = "sword" | "crossbow" | "knife";

class Weapon {
    type: WeaponType;
    damage: number;
    range: number;

    constructor(type: WeaponType, damage: number, range: number) {
        this.type = type;
        this.damage = damage;
        this.range = range;
    }

    attack() {
        switch (this.type) {
            case "sword":
                console.log(`Sword strike with damage ${this.damage}`);
                break;
            case "crossbow":
                console.log(`Crossbow shot with damage ${this.damage}`);
                break;
            case "knife":
                console.log(`Knife hit with damage ${this.damage}`);
                break;
        }
    }
}

class Character {
    name: string;
    weapon: Weapon;

    constructor(name: string, weapon: Weapon) {
        this.name = name;
        this.weapon = weapon;
    }

    changeWeapon(newWeapon: Weapon) {
        this.weapon = newWeapon;
    }

    attack() {
        this.weapon.attack();
    }
}

/**
 * Клієнтський код.
 */
const sword = new Weapon("sword", 15, 2);
const character = new Character("Warrior", sword);
character.attack();

const crossbow = new Weapon("crossbow", 40, 100);
character.changeWeapon(crossbow);
character.attack();
```

**Приклад застосування**

```ts
abstract class Weapon {
    damage: number;
    range: number;

    constructor(damage: number, range: number) {
        this.damage = damage;
        this.range = range;
    }

    abstract attack();
}

class Sword extends Weapon {
    attack() {
        console.log(`Sword strike with damage ${this.damage}`);
    }
}

class Crossbow extends Weapon {
    attack() {
        console.log(`Crossbow shot with damage ${this.damage}`);
    }
}

class Knife extends Weapon {
    attack() {
        console.log(`Knife hit with damage ${this.damage}`);
    }
}

class Character {
    name: string;
    weapon: Weapon;

    constructor(name: string, weapon: Weapon) {
        this.name = name;
        this.weapon = weapon;
    }

    changeWeapon(newWeapon: Weapon) {
        this.weapon = newWeapon;
    }

    attack() {
        this.weapon.attack();
    }
}

/**
 * Клієнтський код.
 */
const sword = new Sword(15, 2);
const character = new Character("Warrior", sword);
character.attack();

const crossbow = new Crossbow(40, 100);
character.changeWeapon(crossbow);
character.attack();
```
