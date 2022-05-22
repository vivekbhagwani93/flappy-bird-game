import BaseScene from "./BaseScene"

class PlayScene extends BaseScene {
    constructor(config) {
        super("PlayScene", config)

        this.initialBirdPosition = { 
            x: config.startPosition.x || 80, 
            y: config.startPosition.y || 300 
        }
        this.bird = null
        this.pipes = null
        this.pauseBtn = null
        this.isPaused = false
        this.pipesToRender = 4
        this.score = 0
        this.timeLeft = 0
        this.scoreText = ''
        this.bestScoreText = ''
        this.countdownText = ''
        this.difficultyText = ''
        this.difficultySettings = {}
    }

    preload() {}

    create() {
        super.create()
        this.difficultySettings = this.getDifficultySettings()
        this.createBird()
        this.createPipes()
        this.createColliders()
        this.createScore()
        this.createPauseBtn()
        this.handleInputs()
        this.listenToEvents()

        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers('bird', { start: 8, end: 15 }),
            frameRate: 24,
            repeat: -1
        })

        this.bird.play('fly')
    }

    update() {
        this.checkGameStatus()
        this.recyclePipes()
    }

    createBG() {
        this.add.image(0, 0, 'sky').setOrigin(0)
    }

    createBird() {
        this.bird = this.physics.add.sprite(
            this.initialBirdPosition.x, 
            this.initialBirdPosition.y, 
            'bird'
        )
        .setFlipX(true)
        .setScale(3)
        .setOrigin(0)

        this.bird.setBodySize(15, 10)
  
        this.initMoveBird()
    }

    initMoveBird() {
        this.bird.body.gravity.x = this.difficultySettings.birdGravity.x
        this.bird.body.gravity.y = this.difficultySettings.birdGravity.y
        this.bird.body.velocity.x = this.difficultySettings.initialBirdVelocity.x
        this.bird.body.velocity.y = this.difficultySettings.initialBirdVelocity.y
    }

    createPipes() {
        this.pipes = this.physics.add.group()

        for(let i = 0; i < this.pipesToRender; i++) {
            const upperPipe = this.pipes
                .create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0, 1)
            const lowerPipe = this.pipes
                .create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0, 0)

            this.placePipe(upperPipe, lowerPipe)
        }

        this.initMovePipes()
    }

    initMovePipes() {
        this.pipes.setVelocityX(this.difficultySettings.initialPipesVelocity.x)
        this.pipes.setVelocityY(this.difficultySettings.initialPipesVelocity.y)
        this.pipes.getChildren().forEach((pipe) => {
            pipe.body.setGravityX(this.difficultySettings.initialPipesGravity.x)
            pipe.body.setGravityY(this.difficultySettings.initialPipesGravity.y)
        })
        // this.pipes.setGravityX(initialPipesGravity.x)
        // this.pipes.setGravityY(initialPipesGravity.y)
    }

    createColliders() {
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this)
    }
    
    createScore() {
        this.score = 0
        this.difficultyText = this.add.text(16, 10, `Difficulty: ${this.getDifficulty()}`, {
            fontSize: '24px', fill: '#000'
        })
        this.scoreText = this.add.text(16, 36, `Score: ${this.score}`, {
            fontSize: '32px', fill: '#000'
        })
        const bestScore = localStorage.getItem('flappyBirdBestScore') || '0'
        this.bestScoreText = this.add.text(16, 70, `Best Score: ${bestScore}`, {
            fontSize: '18px', fill: '#000'
        })
    }

    createPauseBtn() {
        this.isPaused = false

        this.pauseBtn = this.add.image(
            this.config.width - 40,
            20,
            'pause'
        )
        .setScale(2)
        .setOrigin(0, 0)
        .setInteractive()
        .on('pointerdown', () => {
            this.isPaused = true
            this.physics.pause()
            this.scene.pause()
            this.scene.launch('PauseScene')
        })
    }

    handleInputs() {
        this.input.on('pointerdown', this.flap, this)
        this.input.on('keydown_SPACE', this.flap, this)
    }

    listenToEvents() {
        if (this.pauseEvent) { return }

        this.pauseEvent = this.events.on('resume', () => {
            this.timeLeft = 3
            this.countdownText = this.add.text(
                ...this.screenCenter,
                `Resume in ${this.timeLeft}`,
                this.fontStyleOptions,
            )
            .setOrigin(0.5)
            this.timedEvent = this.time.addEvent({
                delay: 1000,
                callback: this.countDown,
                callbackScope: this,
                loop: true
            })
        })
    }

    countDown() {
        this.timeLeft--
        this.countdownText.setText(`Resume in ${this.timeLeft}`)

        if (this.timeLeft === 0) {
            this.countdownText.setText('')
            this.isPaused = false
            this.physics.resume()
            this.timedEvent.remove()
        }
    }

    flap() {
        if (this.isPaused) { return }
        this.bird.body.velocity.y -= this.difficultySettings.birdFlapVelocity
    }

    increaseScore() {
        this.score++
        this.scoreText.setText(`Score: ${this.score}`)
        if (this.score > this.getLocalBestScore()) {
            this.bestScoreText.setText(`Best Score: ${this.score}`)
        }
    }

    checkGameStatus() {
        if (this.bird.y >= (this.config.height - this.bird.height) || this.bird.y <= -this.bird.height) {
            this.gameOver()
        }
    }

    saveBestScore() {
        const bestScoreText = localStorage.getItem('flappyBirdBestScore')
        const bestScore = parseInt(bestScoreText || '', 10)
        if (!bestScore || bestScore < this.score) {
            localStorage.setItem('flappyBirdBestScore', this.score)
        }
    }

    gameOver() {
        this.bird.setTint(0xEE4824)
        this.physics.pause()
        // alert('you lost. click OK to restart')
        // this.resetBirdPosition()
        this.saveBestScore()

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.restart()
            },
            loop: false
        })
    }

    resetBirdPosition() {
        this.bird.x = this.initialBirdPosition.x
        this.bird.y = this.initialBirdPosition.y
        this.bird.body.velocity.x = this.difficultySettings.initialBirdVelocity.x
        this.bird.body.velocity.y = this.difficultySettings.initialBirdVelocity.y
    }

    placePipe(uPipe, lPipe) {
        const pipeVerticalDistance = Phaser.Math.Between(...this.difficultySettings.pipeVerticalDistanceRange)
        const pipeHorizontalDistance = Phaser.Math.Between(...this.difficultySettings.pipeHorizontalDistanceRange)
        const pipeVerticalPositionRange = [0 + 20, this.config.height - 20 - pipeVerticalDistance]
        const pipeVerticalPosition = Phaser.Math.Between(...pipeVerticalPositionRange)
      
        uPipe.x = this.getRightMostPipe(this.pipes) + pipeHorizontalDistance
        uPipe.y = pipeVerticalPosition
      
        lPipe.x = uPipe.x
        lPipe.y = uPipe.y + pipeVerticalDistance
    }

    getRightMostPipe() {
        let X = 0
        
        this.pipes.getChildren().forEach(function(pipe) {
            X = Math.max(pipe.x, X);
        })
      
        return X
    }
      
    recyclePipes() {
        const tempPipes = []
      
        this.pipes.getChildren().forEach(pipe => {
            if (pipe.getBounds().right <= 0) {
                tempPipes.push(pipe)
                if (tempPipes.length === 2) {
                    this.placePipe(...tempPipes, this.pipes)
                    this.increaseScore();
                }
            }
        })
    }
}

export default PlayScene