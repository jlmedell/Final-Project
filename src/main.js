//Name: Leo Medellin
//Title: Pak-Rat (from the sitcom iCarly)

//Major Phaser Components Used:

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: [ Menu, Instructions, Play, Credits ]
}
let game = new Phaser.Game(config)

let cursors

// reserve keyboard bindings
let keyStart, keyUp, keyDown, keyLeft, keyRight

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let score = 0
let lives = 3