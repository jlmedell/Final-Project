class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene")
    }
    create() {
        this.cameras.main.setBackgroundColor('#FFFF00')
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/4 - borderUISize, 'INSTRUCTIONS', menuConfig).setOrigin(0.5)
        menuConfig.color = '#0000FF'
        this.add.text(game.config.width/2, game.config.height/2 - 50, 'Move using arrow keys', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 2 - 50, 'Collect cheese for points', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 4 - 50, 'Avoid contact with cats', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#FF0000'
         menuConfig.color = '#000000'
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