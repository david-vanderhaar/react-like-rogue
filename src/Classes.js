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
