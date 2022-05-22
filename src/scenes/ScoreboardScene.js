import BaseScene from "./BaseScene";

class ScoreboardScene extends BaseScene {
    constructor(config) {
        super('ScoreboardScene', {...config, canGoBack: true })
    }

    create() {
        super.create()

        this.add.text(
            ...this.screenCenter, 
            `Best Score: ${this.getLocalBestScore()}`, 
            this.fontStyleOptions
        )
        .setOrigin(0.5, 1)
    }
}

export default ScoreboardScene
