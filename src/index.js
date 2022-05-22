
import Phaser from "phaser"
import DifficultyScene from "./scenes/DifficultyScene"
import MenuScene from "./scenes/MenuScene"
import PauseScene from "./scenes/PauseScene"
import PlayScene from "./scenes/PlayScene"
import PreloadScene from "./scenes/PreloadScene"
import ScoreboardScene from "./scenes/ScoreboardScene"

const SCENE_WIDTH = 800, SCENE_HEIGHT = 600, 
BIRD_POSITION = { x: SCENE_WIDTH/10, y: SCENE_HEIGHT/2 }

const SHARED_CONFIG = {
  width: SCENE_WIDTH,
  height: SCENE_HEIGHT,
  startPosition: BIRD_POSITION
}

const scenes = [PreloadScene, MenuScene, ScoreboardScene, DifficultyScene, PlayScene, PauseScene]
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG, 
  pixelArt: true,
  physics: {
    default: 'arcade',
    debug: false,
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scene: initScenes()
}

new Phaser.Game(config)
