class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }
    create() {

        //const borderUISize = 20; // Example value
        //const borderPadding = 10; // Example value

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

        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'Final Score: ' + score, menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize, 'Sprites made using Piskel', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize * 3, 'Sounds made with jsfxr', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize * 5, 'Tilemap made using Tiled', menuConfig).setOrigin(0.5)
        //menuConfig.backgroundColor = '#0000FF'
        //menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/4 + borderUISize * 7 + borderUISize, 'Press spacebar to restart', menuConfig).setOrigin(0.5)

        keyStart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        //keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyStart)) {
            //this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}