import Materialize from 'materialize-css';
import { getRandomIntInclusive, throwDice } from './Helper';

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
    svgReference = 'round_shield',
    posX = 0,
    posY = 0,
    boostValue = 1,
    statName = 'life',
    title = 'Potion',
    taken = false,
  } = {}) => ({
    id,
    svgReference,
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
  svgReference = 'torso_chain_mail',
  posX = 0,
  posY = 0,
  taken = false,
  type = 'armor',
  name = 'Straw Plate',
  defense = 1,
  attack = 1,
} = {}) => ({
  id,
  svgReference,
  posX,
  posY,
  taken,
  type,
  name,
  defense,
  attack,

  canEquip(actor) {
    //swaps actor armor and/or weapon stats with these stats
    //if actor is not holding this type of equipment,
    for (let item in actor.equipment) {
      if (this.type === actor.equipment[item].type) {
        return false;
      }
    }
    return true;
  },

});

export const CreateActor = ({
    // Set default values if none passed in
    id = null,
    name = 'none',
    svgReference = 'round_shield',
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
    name,
    svgReference,
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
    calculateStat(stat) {
      let statFromEquipment = this.equipment.reduce((prev, curr) => prev + curr[stat], 0);
      return this[stat] + statFromEquipment;
    },

    rollStatDice(stat) {
      let color = 'black';
      if (this.id !== 'player') {
        color = 'purple darken-4'
      }
      let statFromEquipment = this.equipment.reduce((prev, curr) => prev + curr[stat], 0);
      let dice_count = this[stat] + statFromEquipment;

      let dice = [];
      for (let i = 0; i < dice_count; i++){
        let die = CreateDie().roll(color, stat);
        dice.push(die)
      }
      let result = dice.reduce((acc, curr) => acc + curr, 0);
      return result;
    },

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
      let defense = this.rollStatDice('defense');
      let calculatedAttack = (attack - defense) > 0 ? (attack - defense) : 0;
      this.life -= calculatedAttack;
      if (this.id === 'player') {
        Materialize.toast('You were attacked and took ' + calculatedAttack + ' damage!', 4000)
      } else {
        Materialize.toast('You attacked this creature and dealt ' + calculatedAttack + ' damage!', 4000)
      }
    },
});

export const CreateDie = ({
    // Set default values if none passed in
    sides = 6,
    hits = 3,
    criticals = 1,
  } = {}) => ({
  sides,
  hits,
  criticals,

  // Method
  roll(color, stat) {
    let result = getRandomIntInclusive(1, this.sides);

    if (result <= this.criticals) {
      let svg_name = 'electric';
      throwDice('Critical', color, svg_name);
      return 2;
    } else if (result <= this.criticals + this.hits) {
      let svg_name = 'revolt';
      if (stat === 'defense') { svg_name = 'round_shield'}
      throwDice('Hit', color, svg_name);
      return 1;
    } else {
      let svg_name = 'cross_mark';
      throwDice('Miss', color, svg_name);
      return 0;
    }
  }

});
