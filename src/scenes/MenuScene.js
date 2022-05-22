import BaseScene from './BaseScene'

class MenuScene extends BaseScene {
    constructor(config) {
        super('MenuScene', config)

        this.menu = [
            { scene: 'PlayScene', text: 'Play' },
            // { scene: 'ScoreboardScene', text: 'Scoreboard' },
            { scene: 'DifficultyScene', text: 'Change Difficulty' },
            { scene: null, text: 'Exit' },
        ]
    }

    create() {
        super.create()
        this.createMenu(this.menu, this.setupMenuEvents.bind(this))

        this.add.text(
            16, 16, 
            `Difficulty: ${this.getDifficulty()}`, 
            this.fontStyleOptions
        )
        .setOrigin(0)
        this.add.text(
            16, 52, 
            `Best Score: ${this.getLocalBestScore()}`, 
            this.fontStyleOptions
        )
        .setOrigin(0)
    }

    setupMenuEvents(menuItem) {
        const { textGO } = menuItem
        textGO.setInteractive()
        
        textGO.on('pointerover', () => { textGO.setStyle({ fill: '#ff0' }) })
        textGO.on('pointerout', () => { textGO.setStyle({ fill: '#fff' }) })
        textGO.on('pointerup', () => {
            menuItem.scene 
            ? this.scene.start(menuItem.scene) 
            : this.game.destroy(true)
        })
    }
}

export default MenuScene
