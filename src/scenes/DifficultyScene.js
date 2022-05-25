import BaseScene from './BaseScene'

class DifficultyScene extends BaseScene {
    constructor(config) {
        super('DifficultyScene', config)

        this.menu = [
            { difficulty: 'EASY', text: 'Easy' },
            { difficulty: 'NORMAL', text: 'Normal' },
            { difficulty: 'HARD', text: 'Hard' },
            { difficulty: 'MASOCHISM', text: 'Masochism (Self-hatred)' },
            { difficulty: 'EMOTIONALDAMAGE', text: 'Emotional Damage' },
        ]
    }

    create() {
        super.create()
        this.createMenu(this.menu, this.setupMenuEvents.bind(this))
    }

    setupMenuEvents(menuItem) {
        const { textGO } = menuItem
        textGO.setInteractive()
        
        textGO.on('pointerover', () => { textGO.setStyle({ fill: '#ff0' }) })
        textGO.on('pointerout', () => { textGO.setStyle({ fill: '#fff' }) })
        textGO.on('pointerup', () => {
            this.setDifficulty(menuItem.difficulty)
            this.setLocalBestScore(0)
            this.scene.stop('DifficultyScene')
            this.scene.start('MenuScene')
        })
    }
}

export default DifficultyScene
