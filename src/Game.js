import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import { Howler } from 'howler';
import * as SoundPlayer from './SoundPlayer';
import { getRandomIntInclusive, focusOnGameWindow, prepareDungeonLevel, prepareResetGame, prepareLoadGame, clearDice, findPlayer, shakeTiles } from './Helper';
import uuid from 'uuid';
import MenuButtons from './UI/MenuButtons';
import StatBar from './UI/StatBar';
import Inventory from './UI/Inventory';
import HelpMenu from './UI/HelpMenu';
import EndDungeonSummary from './UI/EndDungeonSummary';
import EndGame from './UI/EndGame';
import SessionStats from './UI/SessionStats';
import { CreateTile, CreateActor, CreatePickUp, CreateEquipmentItem } from './Classes';
import SaveLoad from './SaveLoad';
import Map from './Map';
import DijkstraMap from './DijkstraMap';
import Player from './Player';
import Enemy from './Enemy';
import { generateEnemies } from './Enemy';
import PickUp from './PickUp';
import { generatePickUps } from './PickUp';
import EquipmentItem from './EquipmentItem';
import { generateEquipment } from './EquipmentItem';
import EquipmentCompare from './UI/EquipmentCompare';
import EquipmentManagement from './UI/EquipmentManagement';
import './App.css';
import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

class Game extends Component {

  constructor() {
    super();
    const soundtrack = SoundPlayer.playSoundTrack();
    // SoundPlayer.play('nextDungeon');
    // Map width/height control determine number of cells across/down the page
    const mapWidth = 48;
    const mapHeight = 26;
    const cellSize = 50; // pixel width/height of each cell
    const cellGutter = 4; // pixels between each cell

    let mapKey = uuid();

    //Dungeon Vars
    const roomCount = 12;
    const rooms = []; // holds all room info
    const maxRoomSize = 8;
    const minRoomSize = 4;
    const enemies = 1;
    const pickUps = 10;
    const equipmentItems = 5;

    const player = CreateActor({id: 'player'});

    const levelTypes = [
      'balanced',
      'attack',
      'defense'
    ];

    let currentLevelType = levelTypes[getRandomIntInclusive(0, 2)];

    let enemyList = generateEnemies(enemies, 0, currentLevelType);

    let pickUpList = generatePickUps(pickUps, 0, currentLevelType);

    let equipmentItemList = generateEquipment(equipmentItems, 0, currentLevelType);

    this.state = {
      dungeonLevel: 1,
      currentLevelType: currentLevelType,
      mapKey: mapKey,
      mapWidth: mapWidth,
      mapHeight: mapHeight,
      showDijkstraMap: false,
      cellSize: cellSize,
      cellGutter: cellGutter,
      roomCount: roomCount,
      rooms: rooms,
      maxRoomSize: maxRoomSize,
      minRoomSize: minRoomSize,
      tileMap: Array(mapHeight).fill(Array(mapWidth).fill('')),
      tileTypes: Array(mapHeight).fill(Array(mapWidth).fill(CreateTile({type: 'WALL', canPass: false, containsDestructible: false}))),
      dijkstraMap: Array(mapHeight).fill(Array(mapWidth).fill(100)),
      enemyList: enemyList,
      defeatedEnemyList: [],
      pickUpList: pickUpList,
      equipmentItemList: equipmentItemList,
      equipmentCompareItemId: null,
      showEquipmentCompare: false,
      showEquipmentManagement: false,
      showEndDungeonSummary: false,
      showEndGame: false,
      showHelpMenu: true,
      showInventoryCard: false,
      showSaveLoad: false,
      enemyPosX: 0,
      enemyPosY: 0,
      canMove: true,
      player: player,
      playerControls: {
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        DOWN: 40,
        STAY: 32
      },
      soundtrack: soundtrack,
      masterVolume: 100,
      soundtrackVolume: 100,
    }
  }

  handlePlayerMove(event) { // MAIN TURN LOOP
    if (!event.hasOwnProperty('keyCode')) {
      let code = event
      event = {
        keyCode: code
      }
    }

    if (this.state.canMove && Object.values(this.state.playerControls).indexOf(event.keyCode) > -1) {
      let state = {...this.state};
      let playerControls = state.playerControls;
      let player = {...state.player};
      let tileTypes = state.tileTypes; //tile objs still refering to state tiles
      let tileToCheck;

      tileTypes[player.posY][player.posX].canPass = true;

      switch (event.keyCode) {
        case playerControls['LEFT']:
        tileToCheck = tileTypes[player.posY][player.posX - 1];
        if (player.posX > 0) {
          if (tileToCheck.canPass) {
            player.posX -= 1;
          }
        }
        SoundPlayer.playWalk();
        break;
        case playerControls['UP']:
        tileToCheck = tileTypes[player.posY - 1][player.posX];
        if (player.posY > 0) {
          if (tileToCheck.canPass) {
            player.posY -= 1;
          }
        }
        SoundPlayer.playWalk();
        break;
        case playerControls['RIGHT']:
        tileToCheck = tileTypes[player.posY][player.posX + 1];
        if (player.posX < state.mapWidth - 1) {
          if (tileToCheck.canPass) {
            player.posX += 1;
          }
        }
        SoundPlayer.playWalk();
        break;
        case playerControls['DOWN']:
        tileToCheck = tileTypes[player.posY + 1][player.posX];
        if (player.posY < state.mapHeight - 1) {
          if (tileToCheck.canPass) {
            player.posY += 1;
          }
        }
        SoundPlayer.playWalk();
        break;
        default:
        tileToCheck = tileTypes[player.posY][player.posX];
        SoundPlayer.playBreath();
        break;
      }

      // Check for Enemies
      let enemyList = this.state.enemyList.concat();
      if (tileToCheck.containsDestructible) {
        for (let i = 0; i < enemyList.length; i++) {
          enemyList[i] = {...enemyList[i]}; //copy the Object
          if (enemyList[i].id === tileToCheck.destructibleId) {
            clearDice();
            SoundPlayer.play('hitEnemy');
            enemyList[i].takeHit(player.rollStatDice('attack', true));
          }
        }
      }

      // Check for pick ups
      let pickUpList = this.state.pickUpList.concat();
      if (tileToCheck.containsPickUp) {
        for (let i = 0; i < pickUpList.length; i++) {
          pickUpList[i] = {...pickUpList[i]}; //copy the Object
          if (pickUpList[i].id === tileToCheck.pickUpId) {
            pickUpList[i].taken = true;
            SoundPlayer.play('pickUpPotion');
            player.inventory.push({...pickUpList[i]})
          }
        }
      }

      // Check for equipment items
      let showEquipmentCompare = false;
      let equipmentItemList = this.state.equipmentItemList.concat();
      let equipmentCompareItemId = this.state.equipmentCompareItemId;
      if (tileToCheck.containsPickUp) {
        for (let i = 0; i < equipmentItemList.length; i++) {
          equipmentItemList[i] = {...equipmentItemList[i]}; //copy the Object
          if (equipmentItemList[i].id === tileToCheck.pickUpId) {

            //trigger modal prompt that shows stat compare, and asks if player will equip or leave
            showEquipmentCompare = true;
            equipmentCompareItemId = equipmentItemList[i].id;

          }
        }
      }

      tileTypes[player.posY][player.posX].canPass = false;
      this.dijkstraMap.generateDijkstraMap(tileTypes, [{posX: player.posX, posY: player.posY}]);

      this.setState({
        player,
        tileTypes,
        showEquipmentCompare,
        equipmentCompareItemId,
      });

      this.moveEnemies(tileTypes, player, enemyList);
      this.updatePickUps(tileTypes, pickUpList);
      this.updateEquipmentItems(tileTypes, equipmentItemList);

    }
  } // end handlePlayerMove (MAIN TURN LOOP)

  placeEnemies(enemyList, tileTypes) {
    this.setState({
      enemyList,
      tileTypes,
    });
  }

  placePickUps(pickUpList, tileTypes) {
    this.setState({
      pickUpList,
      tileTypes,
    });
  }

  placeEquipmentItems(equipmentItemList, tileTypes) {
    this.setState({
      equipmentItemList,
      tileTypes,
    });
  }

  updateEquipmentCompareId(equipmentCompareItemId) {
    this.setState({
      equipmentCompareItemId
    });
  }

  updateEquipmentItems(tileTs, equipmentItemList) {
    // Reinitializing tiletypes, not sure why this is needed yet, but the grid id thrown off if not done

    equipmentItemList = equipmentItemList.filter((equipmentItem) => {
      if (!equipmentItem.taken) {
        return true;
      } else {
        return false;
      }
    });

    this.setState({
      equipmentItemList,
      tileTypes: tileTs,
    });
  }

  updatePickUps(tileTs, pickUpList) {
    // Reinitializing tiletypes, not sure why this is needed yet, but the grid id thrown off if not done

    pickUpList = pickUpList.filter((pickUp) => {
      if (pickUp.taken === false) {
        return true;
      } else {
        tileTs[pickUp.posY][pickUp.posX].containsPickUp = false;
        tileTs[pickUp.posY][pickUp.posX].pickUpId = null; //reset current tile
        return false;
      }
    });

    this.setState({
      pickUpList,
      tileTypes: tileTs,
    });
  }

  moveEnemies(tileTs, player, enemyList) {
    let showEndGame = false;
    let showEndDungeonSummary = false;
    let canMove = true;
    let defeatedEnemyList = this.state.defeatedEnemyList.concat();
    // Reinitializing tiletypes, not sure why this is needed yet, but the grid id thrown off if not done
    // let tileTs = cloneTiles(this.state.tileTypes);

    for (let i = 0; i < enemyList.length; i++) {
      // enemyList[i] = {...enemyList[i]}; //copy the Object
      let posX = enemyList[i].posX;
      let posY = enemyList[i].posY;
      tileTs[posY][posX].destructibleId = enemyList[i].id; //reset current tile
      let neighbors = this.dijkstraMap.getNeigbors(enemyList[i], this.state.dijkstraMap);

      if (neighbors.length > 0) {
        let tileToCheck = tileTs[neighbors[0].posY][neighbors[0].posX];

        // This snippet would allow enemies to damage each other
        // if (tileToCheck.containsDestructible) {
        //     tileToCheck.destructible.takeHit(enemyList[i].attack);
        // }

        // this snippet targets only the player
        if (neighbors[0].posX === player.posX && neighbors[0].posY === player.posY) {
          SoundPlayer.play('hitPlayer');
          player.takeHit(enemyList[i].rollStatDice('attack', true));
          // tile shake
          let neighborsToShake = this.dijkstraMap.getNeigbors(player, this.state.dijkstraMap);
          shakeTiles(neighborsToShake, enemyList[i].rollStatDice('attack', false), tileTs, this.dijkstraMap.getNeigbors, this.state.dijkstraMap);
        }

        if (tileToCheck.canPass === true) { // check that the tile is passable
          tileTs[posY][posX].canPass = true; //reset current tile to passable
          tileTs[posY][posX].containsDestructible = false; //reset current tile
          tileTs[posY][posX].destructibleId = null; //reset current tile
          enemyList[i].posX = neighbors[0].posX;
          enemyList[i].posY = neighbors[0].posY;
          tileToCheck.canPass = false; //set new tile to impassable
          tileToCheck.containsDestructible = true;
          tileToCheck.destructibleId = enemyList[i].id;
        }
      }
    }

    enemyList = enemyList.filter((enemy) => {
      if (enemy.life > 0) {
        return true;
      } else {
        tileTs[enemy.posY][enemy.posX].canPass = true; //reset current tile to passable
        tileTs[enemy.posY][enemy.posX].containsDestructible = false; //reset current tile
        tileTs[enemy.posY][enemy.posX].destructibleId = null; //reset current tile

        defeatedEnemyList.push({...enemy});
        return false;
      }
    });

    if (enemyList.length === 0) { // check if we should move to the next dungeon
      SoundPlayer.play('nextDungeon');
      showEndDungeonSummary = true;
      canMove = false;
    }

    if (player.life <=0 ) {
      SoundPlayer.play('death');
      showEndGame = true;
      canMove = false;
    }

    this.setState({
      showEndGame,
      showEndDungeonSummary,
      canMove,
      player,
      enemyList,
      defeatedEnemyList,
      tileTypes: tileTs,
    });
  }

  generateRooms(rooms) {
    this.setState({
      rooms: rooms
    });
  }

  carveRooms(tileTs, playerPosX, playerPosY) {
    let player = {...this.state.player}
    player.posX = playerPosX;
    player.posY = playerPosY;
    this.setState({
      tileTypes: tileTs,
      player,
    });
  }

  carveHalls(tileTs) {
    this.setState({
      tileTypes: tileTs,
    });
  }

  handleGenerateDijkstraMap(dijkstraMap) {
    this.setState({
      dijkstraMap,
    });
  }

  handleToggleDijkstraMap(showDijkstraMap) {
    showDijkstraMap = !this.state.showDijkstraMap;
    this.setState({
      showDijkstraMap,
    });
  }

  handlePlayerUpdate(player) {
    this.setState({
      player,
    });
  }

  handleTileUpdate(tileTs) {
    this.setState({
      tileTypes: tileTs,
    });
  }

  handleToggleEquipmentCompare(value) {
    this.setState({
      showEquipmentCompare: value,
    })
    SoundPlayer.playRandom(['inventoryOpen', 'inventoryClose']);

    focusOnGameWindow();
  }

  toggleEquipmentManagement() {
    this.setState({
      showEquipmentManagement: !this.state.showEquipmentManagement,
    })
    SoundPlayer.playRandom(['inventoryOpen', 'inventoryClose']);
  }

  goToDungeonLevel(level, currentState) {
    this.setState(prepareDungeonLevel(level, currentState));
    setTimeout(() => {
      findPlayer(this.state.player)
    }, 1000);
  }

  resetGame(currentState) {
    this.setState(prepareResetGame(currentState));
    setTimeout(() => {
      findPlayer(this.state.player)
    }, 1000);
  }

  toggleHelpMenu() {
    if (!this.state.showHelpMenu === false) {
      focusOnGameWindow();
    }
    this.setState({
      showHelpMenu: !this.state.showHelpMenu
    });
    SoundPlayer.playRandom(['inventoryOpen', 'inventoryClose']);
  }

  toggleInventoryCard() {
    if (!this.state.showInventoryCard === false) {
      focusOnGameWindow();
    }
    this.setState({
      showInventoryCard: !this.state.showInventoryCard
    });
    SoundPlayer.playRandom(['inventoryOpen', 'inventoryClose']);
  }

  handlePauseSoundtack() {
    this.state.soundtrack.map((sound) => {
      sound.stop();
    });
  }

  handlePlaySoundtack() {
    this.handlePauseSoundtack();
    let soundtrack = SoundPlayer.playSoundTrack();
    this.setState({
      soundtrack
    })
  }

  updateSoundtrackVolume(value) {
    this.state.soundtrack.map((sound) => {
      sound.volume(value/100);
    });

    this.setState({
      soundtrackVolume: value
    });
  }

  updateMasterVolume(value) {
    Howler.volume(value/100);
    this.setState({
      masterVolume: value
    });
  }

  toggleSaveLoad() {
    this.setState({
      showSaveLoad: !this.state.showSaveLoad
    });
    SoundPlayer.playRandom(['inventoryOpen', 'inventoryClose']);
    focusOnGameWindow();
  }

  handleLoadGame(saveState) {
    this.setState(prepareLoadGame(saveState));
    setTimeout(() => {
      findPlayer(this.state.player)
    }, 1000);
  }

  handleSaveGame() {
    let previousSaves = JSON.parse(localStorage.getItem('react-like-rogue-game-saves'));
    let newSave = {
      date: new Date(),
      state: this.state,
    }


    if (previousSaves) {

      let seen = [];
      let toSave = JSON.stringify([...previousSaves, newSave], function(key, val) {
        if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        return val;
      });
      localStorage.setItem('react-like-rogue-game-saves', toSave);
    } else {

      let seen = [];
      let toSave = JSON.stringify([newSave], function(key, val) {
        if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        return val;
      });
      localStorage.setItem('react-like-rogue-game-saves', toSave);
    }

  }

  render() {
    let Game = null
    // Generate enemies
    let enemyCount = 0;
    const enemies = this.state.enemyList.map((enemy) => {
      enemyCount++
      return (
        <Enemy
          key = {enemyCount}
          enemy = {enemy}
          enemyPosX = {enemy.posX}
          enemyPosY = {enemy.posY}
          cellSize = {this.state.cellSize}
          cellGutter = {this.state.cellGutter}
        />
      );
    });

    // Generate pickUps
    let pickUpCount = 0;
    const pickUps = this.state.pickUpList.map((pickUp) => {
      pickUpCount++
      return (
        <PickUp
          key = {pickUpCount}
          pickUp = {pickUp}
          cellSize = {this.state.cellSize}
          cellGutter = {this.state.cellGutter}
        />
      );
    });

    // Generate equipmentItems
    let equipmentItemCount = 0;
    const equipmentItems = this.state.equipmentItemList.map((equipmentItem) => {
      equipmentItemCount++
      return (
        <EquipmentItem
          key = {equipmentItemCount}
          equipmentItem = {equipmentItem}
          cellSize = {this.state.cellSize}
          cellGutter = {this.state.cellGutter}
        />
      );
    });

    let endDungeonSummary = this.state.showEndDungeonSummary && (
      <EndDungeonSummary
        goToDungeonLevel={this.goToDungeonLevel.bind(this, this.state.dungeonLevel + 1, this.state)}
        saveGame={this.handleSaveGame.bind(this)}
        dungeonLevel={this.state.dungeonLevel}
      />
    )

    let endGame = this.state.showEndGame && (
      <EndGame
        resetGame={this.resetGame.bind(this, this.state)}
        dungeonLevel={this.state.dungeonLevel}
        defeatedEnemyList={this.state.defeatedEnemyList}
      />
    )

    let saveLoad = this.state.showSaveLoad && (
      <SaveLoad
        state = {this.state}
        showSaveLoad = {this.state.showSaveLoad}
        toggleSaveLoad = {this.toggleSaveLoad.bind(this)}
        handleLoadGame = {this.handleLoadGame.bind(this)}
      />
    )

    Game = (
        <div id="game-window" className="App" tabIndex="0" onKeyUp={this.handlePlayerMove.bind(this)}>
          <HelpMenu
            showHelpMenu = {this.state.showHelpMenu}
            toggleHelpMenu = {this.toggleHelpMenu.bind(this)}
            masterVolume = {this.state.masterVolume}
            soundtrackVolume = {this.state.soundtrackVolume}
            updateMasterVolume = {this.updateMasterVolume.bind(this)}
            updateSoundtrackVolume = {this.updateSoundtrackVolume.bind(this)}
            playSoundTrack = {this.handlePlaySoundtack.bind(this)}
            pauseSoundTrack = {this.handlePauseSoundtack.bind(this)}
          />
          { saveLoad }
          { endGame }
          { endDungeonSummary }
          <SessionStats currentState={{...this.state}} />
          <StatBar
            name="life"
            color="red"
            icon="fa fa-heart stat-icon"
            stat={this.state.player.life}
            statMax={10}
            position={{top: 10, left: 2, width: 6, height: 25, gutter: 1, iconSize: 6}}
          />
          <StatBar
            name="defense"
            color="blue"
            icon="fa fa-shield-alt stat-icon"
            stat={this.state.player.calculateStat('defense')}
            statMax={10}
            position={{top: 40, left: 2, width: 6, height: 25, gutter: 1, iconSize: 6}}
          />
          <StatBar
            name="attack"
            color="green"
            icon="fa fa-gavel stat-icon"
            stat={this.state.player.calculateStat('attack')}
            statMax={10}
            position={{top: 70, left: 2, width: 6, height: 25, gutter: 1, iconSize: 6}}
          />

          <Inventory
            player = {this.state.player}
            inventory = {this.state.player.inventory}
            handlePlayerUpdate = {this.handlePlayerUpdate.bind(this)}
            showInventoryCard={this.state.showInventoryCard}
            toggleInventoryCard = {this.toggleInventoryCard.bind(this)}
          />

          {
            this.state.showEquipmentCompare && (
              <EquipmentCompare
                toggleEquipmentCompare = {this.handleToggleEquipmentCompare.bind(this)}
                tileTypes = {this.state.tileTypes}
                player = {this.state.player}
                handlePlayerUpdate = {this.handlePlayerUpdate.bind(this)}
                handleUpdateEquipmentItems = {this.updateEquipmentItems.bind(this)}
                handleUpdateEquipmentCompareItemId = {this.updateEquipmentCompareId.bind(this)}
                handlePlaceEquipmentItems = {this.placeEquipmentItems.bind(this)}
                equipmentItemList = {this.state.equipmentItemList}
                equipmentCompareItemId = {this.state.equipmentCompareItemId}
              />
          )
          }

          {
            this.state.showEquipmentManagement && (
              <EquipmentManagement
                toggleEquipmentManagement = {this.toggleEquipmentManagement.bind(this)}
                tileTypes = {this.state.tileTypes}
                player = {this.state.player}
                handlePlayerUpdate = {this.handlePlayerUpdate.bind(this)}
                handleUpdateEquipmentItems = {this.updateEquipmentItems.bind(this)}
                handlePlaceEquipmentItems = {this.placeEquipmentItems.bind(this)}
                equipmentItemList = {this.state.equipmentItemList}
              />
          )
          }

          <div className="game-container">
            <Map
              key = {this.state.mapKey}
              rooms = {this.state.rooms}
              roomCount = {this.state.roomCount}
              maxRoomSize = {this.state.maxRoomSize}
              minRoomSize = {this.state.minRoomSize}
              carveRooms = {this.carveRooms.bind(this)}
              carveHalls = {this.carveHalls.bind(this)}
              generateRooms = {this.generateRooms.bind(this)}
              mapHeight = {this.state.mapHeight}
              mapWidth = {this.state.mapWidth}
              tileTypes = {this.state.tileTypes}
              tileMap = {this.state.tileMap}
              cellSize = {this.state.cellSize}
              cellGutter = {this.state.cellGutter}
              enemyList = {this.state.enemyList}
              placeEnemies = {this.placeEnemies.bind(this)}
              pickUpList = {this.state.pickUpList}
              placePickUps = {this.placePickUps.bind(this)}
              equipmentItemList = {this.state.equipmentItemList}
              placeEquipmentItems = {this.placeEquipmentItems.bind(this)}
            />
            <Player
              player = {this.state.player}
              cellSize = {this.state.cellSize}
              cellGutter = {this.state.cellGutter}
              handlePlayerMove = {this.handlePlayerMove.bind(this)}
            />
            { enemies }
            { pickUps }
            { equipmentItems }
            <DijkstraMap
              ref={(dijkstraMap) => { this.dijkstraMap = dijkstraMap; }}
              showDijkstraMap = {this.state.showDijkstraMap}
              dijkstraMap = {this.state.dijkstraMap}
              tileTypes = {this.state.tileTypes}
              goalPositions = {[{posX: this.state.player.posX, posY: this.state.player.posY}]}
              handleGenerateDijkstraMap = {this.handleGenerateDijkstraMap.bind(this)}
              handleToggleDijkstraMap = {this.handleToggleDijkstraMap.bind(this)}
              cellSize = {this.state.cellSize}
              cellGutter = {this.state.cellGutter}
            />

          </div>
          <MenuButtons
            handleToggleDijkstraMap = {this.handleToggleDijkstraMap.bind(this)}
            toggleHelpMenu = {this.toggleHelpMenu.bind(this)}
            toggleSaveLoad = {this.toggleSaveLoad.bind(this)}
            toggleInventoryCard = {this.toggleInventoryCard.bind(this)}
            toggleEquipmentManagement = {this.toggleEquipmentManagement.bind(this)}
            inventoryCount = {this.state.player.inventory.length}
          />
        </div>
      )

    return (
      <div>
        {Game}
      </div>
    );
  }
}

export default Game;
