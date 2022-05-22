import Phaser from 'phaser'
import DIFFICULTY_SETTINGS from '../constants/difficultySettings'

class BaseScene extends Phaser.Scene {
    constructor(key, config) {
        super(key)
        this.config = config
        this.screenCenter = [config.width/2, config.height/2]
        this.fontStyleOptions = {fontSize: '32px', fill: '#fff'}
        this.lineHeight = 50
    }

    preload() {}

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0)

        if (this.config.canGoBack) {
            this.add.image(
                this.config.width - 10,
                this.config.height - 10,
                'back'
            )
            .setScale(2)
            .setOrigin(1)
            .setInteractive()
            .on('pointerup', () => { this.scene.start('MenuScene') })
        }
    }

    createMenu(menu, setupMenuEvents) {
        let lastMenuPositionY = 0

        menu.forEach(menuItem => {
            const menuPosition = [
                this.screenCenter[0], 
                this.screenCenter[1] + lastMenuPositionY
            ]
            menuItem.textGO = this.add.text(
                ...menuPosition, 
                menuItem.text, 
                this.fontStyleOptions
            )
            .setOrigin(0.5, 1)
            
            lastMenuPositionY += this.lineHeight
            setupMenuEvents(menuItem)
        });
    }

    getLocalBestScore() {
        return parseInt(localStorage.getItem('flappyBirdBestScore') || '0', 10)
    }

    setLocalBestScore(newScore) {
        localStorage.setItem('flappyBirdBestScore', newScore)
    }

    getDifficulty() {
        return localStorage.getItem('flappyBirdDifficulty') || 'HARD' 
    }
    
    setDifficulty(newDifficulty) {
        localStorage.setItem('flappyBirdDifficulty', newDifficulty)
    }

    getDifficultySettings() {
        return DIFFICULTY_SETTINGS[this.getDifficulty()]
    }
}



export default BaseScene
