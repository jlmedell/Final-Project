class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload() {
        //loading bar
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear()
            loadingBar.fillStyle(0x0000FF, 1)
            loadingBar.fillRect(this.game.config.width/2, game.config.height/2, (game.config.width/2) * value, 10)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        //load sprite images and sound effects
        this.load.image('rat', './assets/rat.png')
        this.load.image('bluecat', './assets/bluecat.png')
        this.load.image('greencat', './assets/greencat.png')
        this.load.image('tancat', './assets/tancat.png')
        this.load.image('pinkcat', './assets/pinkcat.png')
        this.load.image('cheese', './assets/cheese.png')
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('map', 'tilemap.json')

        this.load.audio('sfx-hurt', './assets/hitHurt.wav')
        this.load.audio('sfx-checkpoint', './assets/powerUp.wav')
    }
    create() {
        this.cameras.main.setBackgroundColor('#FFFF00')
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '56px',
            fontStyle: 'bold',
            color: '#FF0000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //text boxes
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize * 3, 'PAK-RAT', menuConfig).setOrigin(0.5)
        menuConfig.color = '#000'
        menuConfig.backgroundColor = '#FF0000'
        menuConfig.fontSize = '28px'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 5 + borderPadding, 'Press spacebar for instructions', menuConfig).setOrigin(0.5)

        keyStart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyStart)) {
            this.scene.start('instructionsScene')
        }
    }
}