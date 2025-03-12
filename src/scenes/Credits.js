class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }
    create() {

        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'Final Score: ' + score, menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize, 'Sprites made using Piskel', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize * 3, 'Sounds made with jsfxr', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize * 5, 'Tilemap made using Tiled', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#FF0000'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize * 7 + borderUISize, 'Press spacebar to restart', menuConfig).setOrigin(0.5)

        keyStart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyStart)) {
            this.scene.start('playScene')
        }
    }
}