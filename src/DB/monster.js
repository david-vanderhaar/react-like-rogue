export function getMonster(dungeonLevel, type) {
  let id = uuid();
  let actorStats = {id: id};
  // choose monster type array,
  // filter monster out that are abouve required dungeon level,
  let availableMonsters = monsters[type].filter(monster => monster.minimumDungeonLevel <= dungeonLevel);
  // grab random monster: balanced[Math.floor(Math.random()*balanced.length)];
  let selectedMonster = availableMonsters[Math.floor(Math.random()*monsters[type].length)]['stats']

  // merge monster stats with actor stats object

  return CreateActor(actorStats)
}

let monsters = {
  // BALANCED
  balanced: [
    {
      stats: {
        name: 'Goblin',
        life: 1,
        defense: 1,
        attack: 1
      },
      minimumDungeonLevel: 0
    }
  ],
  // DEFENSE
  defense: [
    {
      stats: {
        name: 'Fat Goblin',
        life: 1,
        defense: 2,
        attack: 1
      },
      minimumDungeonLevel: 0
    }
  ],
  // ATTACK
  attack: [
    {
      stats: {
        name: 'Fierce Goblin',
        life: 1,
        defense: 1,
        attack: 2
      },
      minimumDungeonLevel: 0
    }
  ]
}
