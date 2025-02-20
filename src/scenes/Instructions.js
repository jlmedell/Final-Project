class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene")
    }
    create() {
        this.cameras.main.setBackgroundColor('#000000')
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FF00FF',
            color: '#0000FF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/4 - borderUISize, 'INSTRUCTIONS', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#0000FF'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2, 'Move using arrow keys', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 2, 'Collect cheese for points', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 4, 'Avoid contact with cats', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#FF0000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 6 + borderPadding, 'Press spacebar to start', menuConfig).setOrigin(0.5)

        keyStart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyStart)) {
            this.scene.start('playScene')
        }
    }
}