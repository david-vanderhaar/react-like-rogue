export class Tile {
  constructor(type, canPass, containsDestructible) {
    this.type = type;
    this.canPass = canPass;
    this.containsDestructible = containsDestructible;
  }
  //Getter
  get cssClass() {
    return this.createCssClass();
  }
  // Method
  createCssClass() {
    return 'tile tile-' + this.type;
  }
}

export const CreateTile = ({
    // Set default values if none passed in
    type = 'WALL',
    canPass = false,
    containsDestructible = false,
    destructible = {},
    containsPickUp = false,
    pickUp = {},
  } = {}) => ({
  type,
  canPass,
  containsDestructible,
  destructible,
  containsPickUp,
  pickUp,
  // Method
  cssClass() {
    return 'tile tile-' + this.type;
  }
});

export const CreatePickUp = ({
    posX = 0,
    posY = 0,
    boostValue = 1,
    statName = 'life',
    taken = false,
  } = {}) => ({
    posX,
    posY,
    statName,
    boostValue,
    taken,

    //Method
    takePickUp() {
      this.taken = true;
    }
});

export const CreateActor = ({
    // Set default values if none passed in
    posX = 0,
    posY = 0,
    life = 1,
    lifeMax = life,
    attack = 1,
    attackMax = attack,
    defense = 1,
    defenseMax = defense
  } = {}) => ({
    posX,
    posY,
    life,
    lifeMax,
    attack,
    attackMax,
    defense,
    defenseMax,
    // Method
    takeHit(attack) {
      let newDefenseValue = this.defense;
      let newLifeValue = this.life;
      for (let i = 0; i < attack; i++) {
        if (newDefenseValue > 0) {
          newDefenseValue -= 1;
        }
        else if (newDefenseValue <= 0) {
          newLifeValue -= 1;
        }
      }
      this.life = newLifeValue;
      this.defense = newDefenseValue;
    }
});
