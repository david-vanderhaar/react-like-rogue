import { Howl, Howler } from 'howler';
import {getRandomIntInclusive } from './Helper'

let soundtrack = {
  title: './sounds/soundtrack/relapse.wav',
  repeat: [
    './sounds/soundtrack/commonBird.m4a',
    './sounds/soundtrack/ragnar.wav',
    './sounds/soundtrack/relapse.wav',
    './sounds/soundtrack/noir.m4a',
    './sounds/soundtrack/vonCarlstein.m4a',
  ],
}

export function playTitle() {
  Howler.unload();
  const sound = new Howl({
    src: [soundtrack.title],
    volume: 0
  });
  sound.play();
  sound.fade(0, .5, 2000);
  return sound;
}

export function playSoundTrack() {
  Howler.unload();
  let soundIds = [];
  let currentTrack = 0;
  let sounds = soundtrack.repeat.concat().map((track) => {
    return new Howl({
      src: [track],
    });
  });

  sounds.map((sound, i) => {
    soundIds.push('soundtrack-' + i.toString())
    sound.on('end', () => {
      currentTrack++;
      if (currentTrack > sounds.length - 1) { currentTrack = 0; }
      sounds[currentTrack].play()
    });
    return null
  });

  sounds[currentTrack].play();
  return sounds;

}

let sounds = {
  nextDungeon: './sounds/nextDungeon.wav',
  nextDungeon01: './sounds/nextDungeon01.wav',
  nextDungeon02: './sounds/nextDungeon02.wav',
  death: './sounds/death.wav',
  death01: './sounds/death01.wav',
  pickUpPotion: './sounds/pickUpPotion.wav',
  equip: './sounds/equip.wav',
  consumePotion: './sounds/consumePotion.wav',
  hitPlayer: './sounds/hitPlayer01.wav',
  hitEnemy: './sounds/hitEnemy.wav',
  dirt00: './sounds/dirt00.wav',
  dirt01: './sounds/dirt01.wav',
  dirt02: './sounds/dirt02.wav',
  dirt03: './sounds/dirt03.wav',
  dirt04: './sounds/dirt04.wav',
  dirt05: './sounds/dirt05.wav',
  dirt06: './sounds/dirt06.wav',
  dirt07: './sounds/dirt07.wav',
  dirt08: './sounds/dirt08.wav',
  dirt09: './sounds/dirt09.wav',
  breath00: './sounds/breath00.wav',
  breath01: './sounds/breath01.wav',
  breath02: './sounds/breath02.wav',
  breath03: './sounds/breath03.wav',
  breath04: './sounds/breath04.wav',
  breath05: './sounds/breath05.wav',
  breath06: './sounds/breath06.wav',
  breath07: './sounds/breath07.wav',
  breath08: './sounds/breath08.wav',
  breath09: './sounds/breath09.wav',
  breath010: './sounds/breath010.wav',
  breath011: './sounds/breath011.wav',
  breath012: './sounds/breath012.wav',
  breath013: './sounds/breath013.wav',
  breath014: './sounds/breath014.wav',
  breath015: './sounds/breath015.wav',
  breath016: './sounds/breath016.wav',
  breath017: './sounds/breath017.wav',
  drink00: './sounds/drink00.mp3',
  drink01: './sounds/drink01.mp3',
  drink02: './sounds/drink02.mp3',
  drink03: './sounds/drink03.mp3',
  drink04: './sounds/drink04.mp3',
  drink05: './sounds/drink05.mp3',
  inventoryOpen: './sounds/inventoryOpen.wav',
  inventoryClose: './sounds/inventoryClose.wav',
  grunt00: './sounds/grunt00.wav',
  grunt01: './sounds/grunt01.wav',
  grunt02: './sounds/grunt02.wav',
  grunt03: './sounds/grunt03.wav',
  grunt04: './sounds/grunt04.wav',
  grunt05: './sounds/grunt05.wav',
  grunt06: './sounds/grunt06.wav',
  grunt07: './sounds/grunt07.wav',
  sword01: './sounds/sword01.wav',
  sword02: './sounds/sword02.wav',
  sword03: './sounds/sword03.wav',
  sword04: './sounds/sword04.wav',
  sword05: './sounds/sword05.wav',
  sword06: './sounds/sword06.wav',
}

export function play(name) {
  const sound = new Howl({
    src: [sounds[name]]
  });
  sound.play();
}

export function playRandom(names, volume = 1) {
  let name = names[getRandomIntInclusive(0, names.length -1)];
  if (name !== '') {
    const sound = new Howl({
      src: [sounds[name]],
      volume: volume,
    });
    sound.play();
  }
}

export function playWalk() {
  playRandom([
    'dirt00',
    'dirt01',
    'dirt02',
    'dirt03',
    'dirt04',
    'dirt05',
    'dirt06',
    'dirt07',
    'dirt08',
    'dirt09',
    'dirt00',
    'dirt01',
    'dirt02',
    'dirt03',
    'dirt04',
    'dirt05',
    'dirt06',
    'dirt07',
    'dirt08',
    'dirt09',
    'dirt00',
    'dirt01',
    'dirt02',
    'dirt03',
    'dirt04',
    'dirt05',
    'dirt06',
    'dirt07',
    'dirt08',
    'dirt09',
    // 'breath01',
    // 'breath03',
    // 'breath04',
    // 'breath011',
    // 'breath016',
    // 'breath017',
  ]);
}

export function playBreath() {
  playRandom([
    '','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',
    'breath00',
    'breath01',
    'breath02',
    'breath03',
    'breath04',
    'breath05',
    'breath06',
    'breath07',
    'breath08',
    'breath09',
    'breath010',
    'breath011',
    'breath012',
    'breath013',
    'breath014',
    'breath015',
    'breath016',
    'breath017',
  ]);
}

export function playDrink() {
  playRandom([
    'drink00',
    'drink01',
    'drink02',
    'drink03',
    'drink04',
    'drink05',
  ]);
}

export function playGrunt() {
  playRandom([
    'grunt00',
    'grunt01',
    'grunt02',
    'grunt03',
    'grunt04',
    'grunt05',
    'grunt06',
    'grunt07',
  ]);
}

export function playWeaponHit() {
  playRandom([
    'sword01',
    'sword02',
    'sword03',
    'sword04',
    'sword05',
    'sword06',
  ]);
}

export function playNextDungeon() {
  play('nextDungeon02');
}
