class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        this.VEL = 100  //rat velocity constant
        this.RATX = game.config.width/2 //rat spawn point
        this.RATY = game.config.height/2
    }
    preload() {
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'tilemap.json')
    }
    create() {
        score = 0
        lives = 3

        //tilemap
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage') //tileset name from json file
        const bgLayer = map.createLayer('Tile Layer 1', tileset, 0, 0) //layer name in Tiled

        //add rat and cats
        this.rat = this.physics.add.sprite(this.RATX, this.RATY, 'rat', 0).setScale(0.2)
        this.rat.body.setCollideWorldBounds(true)

        this.cats = this.physics.add.group({
            allowGravity: false, 
            immovable: true 
        })

        let greencat = this.cats.create(80, 20, 'greencat').setScale(0.2)
        let bluecat = this.cats.create(160, 20, 'bluecat').setScale(0.2)
        let tancat = this.cats.create(240, 20, 'tancat').setScale(0.2)
        let pinkcat = this.cats.create(320, 20, 'pinkcat').setScale(0.2)

        //rat collides with cat
        this.physics.add.overlap(
            this.rat,
            this.cats,
            this.catCollision,
            null,
            this
        )

        //this.greencat = this.physics.add.sprite(80, 20, 'greencat', 0).setScale(0.2)
        //this.bluecat = this.physics.add.sprite(160, 20, 'bluecat', 0).setScale(0.2)
        //this.tancat = this.physics.add.sprite(240, 20, 'tancat', 0).setScale(0.2)
        //this.pinkcat = this.physics.add.sprite(320, 20, 'pinkcat', 0).setScale(0.2)

        // input
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    //
    catCollision(player, arrow) {
        this.sound.play('sfx-hurt')
        lives = lives - 1 //lose 1 life upon touching cat
        this.rat.x = this.RATX //return to spawn
        this.rat.y = this.RATY
    }

    update() {
        //rat movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
            this.rat.setFlipX(true) //rat faces left
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
            this.rat.setFlipX(false) //rat faces right
        }
        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }
        this.direction.normalize()
        this.rat.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)

        //game over
        if (lives <= 0) {
            this.scene.start('creditsScene')
        }
    }
}