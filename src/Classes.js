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
    containsDestructible = false
  } = {}) => ({
  type,
  canPass,
  containsDestructible,
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
    defense
});
