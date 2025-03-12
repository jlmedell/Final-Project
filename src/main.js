//Name: Leo Medellin
//Title: Pak-Rat (from the sitcom iCarly)

//Major Phaser Components Used:
//Physics
//Text Objects
//Timers
//Tilemaps
//Math
//Tween Manager

/*
POLISH & STYLE: Rather than just take screenshots of the artwork, I decided
to go the extra mile and replicate the game's entire art style in pixel art.
I kept all of the sprites very similar-looking to how they are in the TV show
but in a pixelated form, giving the game an extra level of aesthetic creativity
and giving it a fun, retro vibe like Pac-Man. Likewise, I got a bit creative
with the pathfinding mechanics for the cats. I initially thought about taking 
and citing pathfinding code from similar games like Pac-Man, but I ultimately 
decided to give myself a bit more of a challenge and write my own algorithm to
make the cats move around in a different manner. At certain time intervals or 
upon hitting a wall, the cats start moving in a different direction determined 
by a randomizer, adding an extra layer of unpredictability to the game. I also
wrote an additional algorithm to make the cats turn at certain coordinates 
where there is an opportunity, ensuring that they spend a fair amount of time in
the inner maze and don't just orbit around the outer rim.
*/

let config = {
    type: Phaser.AUTO,
    width: 464,
    height: 560,
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