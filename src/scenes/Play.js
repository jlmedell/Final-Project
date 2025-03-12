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
        //loading bar
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear()
            loadingBar.fillStyle(0x0000FF, 1)
            //loadingBar.fillRect(game.config.width/2, game.config.height/2, (game.config.width/2) * value, 10)
            loadingBar.fillRect(game.config.width/2 - 50, game.config.height/2, (game.config.width/2) * value, 10)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        this.load.image("tileset","./assets/tileset.png");
        this.load.tilemapTiledJSON("map","./assets/tilemap.json");
    }
    create() {
        score = 0
        lives = 3
        this.animation = 0

        //tilemap
        this.map = this.make.tilemap({key:"map"});
        const tileset = this.map.addTilesetImage("tileset")
        const layer = this.map.createLayer("Tile Layer 1",[tileset])
        layer.setCollisionByProperty({ collides: true })

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
        //this.rat.add.collider(this.rat, layer)
        this.physics.add.collider(this.rat, layer)

        this.cats = this.physics.add.group({
            allowGravity: false, 
            immovable: true 
        })
        let greencat = this.cats.create(32, 512, 'greencat').setScale(0.07) //y = 512
        let bluecat = this.cats.create(32, 80, 'bluecat').setScale(0.07) //y = 80
        let tancat = this.cats.create(432, 80, 'tancat').setScale(0.07)
        let pinkcat = this.cats.create(432, 512, 'pinkcat').setScale(0.07)

        //cat movement
        this.cats.getChildren().forEach(cat => {
            this.moveCat(bluecat, 1) //1=down
            this.moveCat(tancat, 1) //1=down
            this.moveCat(greencat, 0) //0=up
            this.moveCat(pinkcat, 0) //0=up
        })
        this.time.addEvent({
            delay: 30000, //every 30 seconds
            callback: () => {
                this.cats.getChildren().forEach(cat => {
                    this.newDirection(cat);
                })
            },
            loop: true
        })

        //cat hits wall
        this.physics.add.collider(this.cats, this.map.getLayer("Tile Layer 1").tilemapLayer, (cat) => {
            this.newDirection(cat)
        })

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

        //input
        this.cursors = this.input.keyboard.createCursorKeys()

        //score and lives display
        let scoreConfig = {
            fontFamily: 'Arial',
            fontSize: '20px',
            backgroundColor: '#FFFF00',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            }
        }
        this.livesLeft = this.add.text(10, 10, lives, scoreConfig)
        this.scoreLeft = this.add.text(game.config.width - 200, 10, score, scoreConfig)

        //after 1 second, turn blue cat
        this.time.delayedCall(1000, () => { //1500
            //this.moveCat(bluecat, 3) //3=right
        }, [], this)

        //after 4 seconds, turn pink cat
        this.time.delayedCall(4000, () => { //6000
            //this.moveCat(pinkcat, 2) //2=left
        }, [], this)

        //after 3 seconds, turn tan cat
        this.time.delayedCall(3000, () => { //4500
            //this.moveCat(tancat, 2) //2=left
        }, [], this)

        //after 8 seconds, turn green cat
        this.time.delayedCall(8000, () => { //12000
            //this.moveCat(greencat, 3) //3=right
        }, [], this)
    }

    //lose a life upon touching a cat
    catCollision(player, cat) {
        if (this.animation == 0){
            this.sound.play('sfx-hurt')

            this.animation = 1
            //tween respawn animation
            let respawnTween = this.tweens.add({
                targets: this.rat,
                alpha: { from: 0, to: 1 },
                scale: { from: 0.07, to: 0.01 },
                angle: { from: 0, to: 360 },
                ease: 'Linear',
                duration: 1000, //1 second
                onComplete: () => {
                    this.rat.x = this.RATX //return to spawn
                    this.rat.y = this.RATY
                    this.rat.setAngle(0)
                    this.rat.setScale(0.07)
                    this.animation = 0
                    lives = lives - 1 //lose 1 life upon touching cat
                }
            })
        }
    }

    //gain point after eating cheese
    cheeseCollision(player, cheese) {
        cheese.destroy() //eat cheese
        this.cheeses = this.cheeses - 1 
        score = score + 1 //increase score
    }

    //cat movement
    moveCat(cat, direction) {
            //0=up
            if (direction == 0) {
                cat.setVelocity(0, -48); //-32
                cat.direction = 0
            }
            //1=down
            if (direction == 1) {
                cat.setVelocity(0, 48)
                cat.direction = 1
            }
            //2=left
            if (direction == 2) {
                cat.setVelocity(-48, 0)
                cat.direction = 2
            }
            //3=right
            if (direction == 3) {
                cat.setVelocity(48, 0)
                cat.direction = 3
            }
    }

    //change cat movement direction
    newDirection(cat) {
        let newDirection = Phaser.Math.Between(0, 3) //0=up, 1=down, 2=left, 3=right
        while (newDirection == cat.direction) {
            newDirection = Phaser.Math.Between(0, 3) //0=up, 1=down, 2=left, 3=right
        }
    
        this.moveCat(cat, newDirection)
    }


    update() {
        //rat movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown && this.animation == 0) {
            this.direction.x = -1
            this.rat.setFlipX(true) //rat faces left
        } else if(this.cursors.right.isDown && this.animation == 0) {
            this.direction.x = 1
            this.rat.setFlipX(false) //rat faces right
        }
        if(this.cursors.up.isDown && this.animation == 0) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown && this.animation == 0) {
            this.direction.y = 1
        }
        this.direction.normalize()
        this.rat.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)

        //update score and lives display
        this.scoreLeft.text = "Score: " + score
        this.livesLeft.text = "Lives Left: " + lives

        //respawn cheese when none left
        if (this.cheeses == 0) {
            this.sound.play('sfx-checkpoint')
            this.respawnCheese()
        }

        //at certain positions, change cat movement direction
        this.cats.getChildren().forEach(cat => {
            //y = 128, 224, 320, 416, 464
            //x = 32, 432
            if (cat.y >= 125 && cat.y <= 131 && cat.x >= 32 - 16 && cat.x <= 32 + 16) { 
                if (cat.x < this.game.config.width/2) {
                    this.moveCat(cat, 3) //3=right
                } else {
                    this.moveCat(cat, 2) //2=left
                }
            }
            if (cat.y >= 221 && cat.y <= 227 && cat.x >= 432 - 16 && cat.x <= 432 + 16) { 
                if (cat.x < this.game.config.width/2) {
                    this.moveCat(cat, 3) //3=right
                } else {
                    this.moveCat(cat, 2) //2=left
                }
            }
            if (cat.y >= 317 && cat.y <= 323 && cat.x >= 432 - 16 && cat.x <= 432 + 16) { 
                if (cat.x < this.game.config.width/2) {
                    this.moveCat(cat, 3) //3=right
                } else {
                    this.moveCat(cat, 2) //2=left
                }
            }
            if (cat.y >= 413 && cat.y <= 419 && ((cat.x >= 432 - 16 && cat.x <= 432 + 16) || (cat.x >= 32 - 16 && cat.x <= 32 + 16))) { 
                if (cat.x < this.game.config.width/2) {
                    this.moveCat(cat, 3) //3=right
                } else {
                    this.moveCat(cat, 2) //2=left
                }
            }
            if (cat.y >= 461 && cat.y <= 467 && cat.x >= 432 - 16 && cat.x <= 432 + 16) { 
                if (cat.x < this.game.config.width/2) {
                    this.moveCat(cat, 3) //3=right
                } else {
                    this.moveCat(cat, 2) //2=left
                }
            }
        })

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

    //change cat movement direction
    newDirection(cat) {
        let newDirection = Phaser.Math.Between(0, 3) //0=up, 1=down, 2=left, 3=right
        while (newDirection == cat.direction) {
            newDirection = Phaser.Math.Between(0, 3) //0=up, 1=down, 2=left, 3=right
        }
    
        this.moveCat(cat, newDirection)
    }
}