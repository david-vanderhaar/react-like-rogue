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
    destructible = {}
  } = {}) => ({
  type,
  canPass,
  containsDestructible,
  destructible,
  // Method
  cssClass() {
    return 'tile tile-' + this.type;
  }
});

export const CreateActor = ({
    // Set default values if none passed in
    posX = 0,
    posY = 0,
    life = 1,
    attack = 1,
    defense = 1
  } = {}) => ({
    posX,
    posY,
    life,
    attack,
    defense,
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
