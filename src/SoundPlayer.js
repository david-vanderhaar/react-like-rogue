import { Howl, Howler } from 'howler';


let sounds = {
  nextDungeon: './sounds/nextDungeon.wav',
  death: './sounds/death.wav',
  pickUpPotion: './sounds/pickUpPotion.wav',
  equip: './sounds/equip.wav',
  consumePotion: './sounds/consumePotion.wav',
  hitPlayer: './sounds/hitPlayer.wav',
  hitEnemy: './sounds/hitEnemy.wav',
}

export function play(name) {
  const sound = new Howl({
    src: [sounds[name]]
  });
  sound.play();
}
