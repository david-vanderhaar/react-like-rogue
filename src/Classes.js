import Materialize from 'materialize-css';

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
    id = null,
    type = 'WALL',
    canPass = false,
    containsDestructible = false,
    destructibleId = null,
    containsPickUp = false,
    pickUpId = null,
  } = {}) => ({
  id,
  type,
  canPass,
  containsDestructible,
  destructibleId,
  containsPickUp,
  pickUpId,
  // Method
  cssClass() {
    return 'tile tile-' + this.type;
  }
});

export const CreatePickUp = ({
    id = null,
    posX = 0,
    posY = 0,
    boostValue = 1,
    statName = 'life',
    title = 'Potion',
    taken = false,
  } = {}) => ({
    id,
    posX,
    posY,
    statName,
    title,
    boostValue,
    taken,

    //Method
    takePickUp() {
      this.taken = true;
    },

    usePickUp(user) {
      user[this.statName] += this.boostValue;
      Materialize.toast('Gained ' + this.boostValue + ' ' + this.statName + '!', 4000)
    }
});

export const CreateEquipmentItem = ({
  id = null,
  posX = 0,
  posY = 0,
  taken = false,
  type = 'armor',
  name = 'Straw Plate',
  defense = 1,
  attack = 1,
} = {}) => ({
  id,
  posX,
  posY,
  taken,
  type,
  name,
  defense,
  attack,

  equip(type, actor) {
    //swaps actor armor and/or weapon stats with these stats
    //if actor is holding this type of equipment, then
    //drop(actor)
    //equip(actor)
  },

  drop(actor) {

  },
});

export const CreateActor = ({
    // Set default values if none passed in
    id = null,
    posX = 0,
    posY = 0,
    life = 1,
    lifeMax = life,
    attack = 1,
    attackMax = attack,
    defense = 1,
    defenseMax = defense,
    inventory = [],
    equipment = [],
  } = {}) => ({
    id,
    posX,
    posY,
    life,
    lifeMax,
    attack,
    attackMax,
    defense,
    defenseMax,
    inventory,
    equipment,
    // Method
    takeHitV1(attack) {
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
    },

    takeHit(attack) {
      let calculatedAttack = attack - this.defense;
      calculatedAttack > 0 ? calculatedAttack = calculatedAttack : calculatedAttack = 0;
      this.life -= calculatedAttack;
      if (this.id === 'player') {
        Materialize.toast('Attacked for ' + calculatedAttack + ' damage!', 4000)
      }
    },
});
