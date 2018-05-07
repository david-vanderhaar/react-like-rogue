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
    calculateStat(stat) {
      let statFromEquipment = this.equipment.reduce((prev, curr) => prev + curr[stat], 0);
      return this[stat] + statFromEquipment;
    },

    rollStatDice(stat) {
      let color = stat == 'attack' ? 'green' : 'blue';
      let is_player = true;
      if (this.id !== 'player') {
        color += ' darken-4'
        is_player = false;
      }
      let statFromEquipment = this.equipment.reduce((prev, curr) => prev + curr[stat], 0);
      let dice_count = this[stat] + statFromEquipment;

      let dice = [];
      for (let i = 0; i < dice_count; i++){
        let die = CreateDie().roll(color, stat, is_player);
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
        Materialize.toast('You attacked this creature a dealt ' + calculatedAttack + ' damage!', 4000)
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
  roll(color, stat, is_player) {
    let result = getRandomIntInclusive(1, this.sides);

    if (result <= this.criticals) {
      let stat_class = 'dice-critical';
      if (is_player) { stat_class += '-player'}
      throwDice('Critical', color, stat_class);
      return 2;
    } else if (result <= this.criticals + this.hits) {
      let stat_class = 'dice-hit';
      if (stat === 'defense') { stat_class += '-defense'}
      if (is_player) { stat_class += '-player'}
      throwDice('Hit', color, stat_class);
      return 1;
    } else {
      let stat_class = 'dice-miss';
      if (is_player) { stat_class += '-player'}
      throwDice('Miss', color, stat_class);
      return 0;
    }
  }

});
