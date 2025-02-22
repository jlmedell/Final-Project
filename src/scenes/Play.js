class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        this.VEL = 100  //rat velocity constant
        this.RATX = game.config.width/2 //rat spawn point
        this.RATY = game.config.height/2 - 10
    }
    preload() {
        //this.load.image('tilesetImage', 'tileset.png')
        //this.load.tilemapTiledJSON('tilemapJSON', 'tilemap.json')
        this.load.image("tileset","./assets/tileset.png");
        this.load.tilemapTiledJSON("map","./assets/tilemap.json");
    }
    create() {
        score = 0
        lives = 3

        //tilemap
        //const map = this.add.tilemap('tilemapJSON')
        //const tileset = map.addTilesetImage('tileset', 'tilesetImage') //tileset name from json file
        //const bgLayer = map.createLayer('Tile Layer 1', tileset, 0, 0) //layer name in Tiled
        this.map = this.make.tilemap({key:"map"});
        const tileset = this.map.addTilesetImage("tileset");
        const layer = this.map.createLayer("Tile Layer 1",[tileset])
        layer.setCollisionByExclusion(-1,true)

        //add cheese
        this.cheese = this.physics.add.group({
            allowGravity: false, 
            immovable: true
        })
        for (let i = 32; i < 16*28; i = i + 16){ //26 cheeses
            this.cheese.create(i, 80, 'cheese').setScale(0.01)
        }
        for (let i = 32; i < 16*28; i = i + 16){ //26 cheeses
            this.cheese.create(i, 512, 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*14); i < 16*25; i = i + 16){ //9 cheeses
            this.cheese.create(i, 80 + (16 * 12), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*12); i < 16*25; i = i + 16){ //11 cheeses
            this.cheese.create(i, 80 + (16 * 15), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*5); i < 16*31; i = i + 16){ //24 cheeses
            this.cheese.create(32, i, 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*5); i < 16*31; i = i + 16){ //24 cheeses
            this.cheese.create(432, i, 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*10); i < 16*21; i = i + 16){ //9 cheeses
            this.cheese.create(32 + (6*16), i, 'cheese').setScale(0.01)
        } 
        for (let i = 32+(16*10); i < 16*21; i = i + 16){ //9 cheeses
            this.cheese.create(32 + (3*16), i, 'cheese').setScale(0.01)
        } 
        for (let i = 32+(16*4); i < 16*25; i = i + 16){ //19 cheeses
            this.cheese.create(i, 80 + (16 * 3), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*4); i < 16*25; i = i + 16){ //19 cheeses
            this.cheese.create(i, 80 + (16 * 21), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*4); i < 16*14; i = i + 16){ //8 cheeses
            this.cheese.create(i, 80 + (16 * 24), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*19); i < 16*24; i = i + 16){ //3 cheeses
            this.cheese.create(i, 80 + (16 * 24), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*17); i < 16*24; i = i + 16){ //5 cheeses
            this.cheese.create(i, 80 + (16 * 6), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*9); i < 16*14; i = i + 16){ //3 cheeses
            this.cheese.create(i, 80 + (16 * 9), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*12); i < 16*22; i = i + 16){ //8 cheeses
            this.cheese.create(i, 80 + (16 * 18), 'cheese').setScale(0.01)
        }
        this.cheeses = 203



        //add rat and cats
        this.rat = this.physics.add.sprite(this.RATX, this.RATY, 'rat', 0).setScale(0.07)
        this.rat.body.setCollideWorldBounds(true)

        this.cats = this.physics.add.group({
            allowGravity: false, 
            immovable: true 
        })

        let greencat = this.cats.create(32, 512, 'greencat').setScale(0.07) //y = 512
        let bluecat = this.cats.create(32, 80, 'bluecat').setScale(0.07) //y = 80
        let tancat = this.cats.create(432, 80, 'tancat').setScale(0.07)
        let pinkcat = this.cats.create(432, 512, 'pinkcat').setScale(0.07)

        //rat collides with cat
        this.physics.add.overlap(
            this.rat,
            this.cats,
            this.catCollision,
            null,
            this
        )

        //rat collides with cheese
        this.physics.add.overlap(
            this.rat,
            this.cheese,
            this.cheeseCollision,
            null,
            this
        )

        // input
        this.cursors = this.input.keyboard.createCursorKeys()

        //score and lives display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            }
        }
        this.livesLeft = this.add.text(10, 10, lives, scoreConfig)
        this.scoreLeft = this.add.text(200, 10, score, scoreConfig)
    }

    //lose a life upon touching a cat
    catCollision(player, cat) {
        this.sound.play('sfx-hurt')
        lives = lives - 1 //lose 1 life upon touching cat
        this.rat.x = this.RATX //return to spawn
        this.rat.y = this.RATY
    }


    cheeseCollision(player, cheese) {
        cheese.destroy() //eat cheese
        this.cheeses = this.cheeses - 1 
        score = score + 1 //increase score
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

        //update score and lives display
        this.scoreLeft.text = "Score: " + score
        this.livesLeft.text = "Lives Left: " + lives

        if (this.cheeses === 0) {
            this.respawnCheese()
        }

        //game over
        if (lives <= 0) {
            this.scene.start('creditsScene')
        }
    }

    respawnCheese() {
        for (let i = 32; i < 16*28; i = i + 16){ //26 cheeses
            this.cheese.create(i, 80, 'cheese').setScale(0.01)
        }
        for (let i = 32; i < 16*28; i = i + 16){ //26 cheeses
            this.cheese.create(i, 512, 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*14); i < 16*25; i = i + 16){ //9 cheeses
            this.cheese.create(i, 80 + (16 * 12), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*12); i < 16*25; i = i + 16){ //11 cheeses
            this.cheese.create(i, 80 + (16 * 15), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*5); i < 16*31; i = i + 16){ //24 cheeses
            this.cheese.create(32, i, 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*5); i < 16*31; i = i + 16){ //24 cheeses
            this.cheese.create(432, i, 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*10); i < 16*21; i = i + 16){ //9 cheeses
            this.cheese.create(32 + (6*16), i, 'cheese').setScale(0.01)
        } 
        for (let i = 32+(16*10); i < 16*21; i = i + 16){ //9 cheeses
            this.cheese.create(32 + (3*16), i, 'cheese').setScale(0.01)
        } 
        for (let i = 32+(16*4); i < 16*25; i = i + 16){ //19 cheeses
            this.cheese.create(i, 80 + (16 * 3), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*4); i < 16*25; i = i + 16){ //19 cheeses
            this.cheese.create(i, 80 + (16 * 21), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*4); i < 16*14; i = i + 16){ //8 cheeses
            this.cheese.create(i, 80 + (16 * 24), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*19); i < 16*24; i = i + 16){ //3 cheeses
            this.cheese.create(i, 80 + (16 * 24), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*17); i < 16*24; i = i + 16){ //5 cheeses
            this.cheese.create(i, 80 + (16 * 6), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*9); i < 16*14; i = i + 16){ //3 cheeses
            this.cheese.create(i, 80 + (16 * 9), 'cheese').setScale(0.01)
        }
        for (let i = 32+(16*12); i < 16*22; i = i + 16){ //8 cheeses
            this.cheese.create(i, 80 + (16 * 18), 'cheese').setScale(0.01)
        }
        this.cheeses = 203
    }
}