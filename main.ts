namespace SpriteKind {
    export const PointDeductor = SpriteKind.create()
    export const PointAdder = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.PointAdder, function (sprite, otherSprite) {
    info.changeScoreBy(2)
    otherSprite.destroy()
    effects.bubbles.startScreenEffect(500)
})
sprites.onOverlap(SpriteKind.PointDeductor, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeScoreBy(-1)
    myPointAdder.destroy(effects.fire, 500)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 8))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    game.over(false, effects.melt)
})
let myPointDeductor: Sprite = null
let dinosaur: Sprite = null
let ghost: Sprite = null
let myPointAdder: Sprite = null
let mySprite: Sprite = null
// On start, the splash "Modified Cherry Pickr" will appear
game.splash("Modified Cherry Pickr")
// Briefly explains the game
game.showLongText("Bananas are your enemy, along with the dinosaurs! Only blocks and trees are your friends!", DialogLayout.Full)
// Engages the user, asking them if they are ready to play the game
game.splash("Are you ready for this?", "Great! Let's get started")
// Tilemap is set to a specially customised map
tiles.setTilemap(tilemap`level1`)
// The player sprite is set to a "Pac-Man" inspired character.
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . 5 5 5 . . . . . . . . . 
    . . . 5 5 5 5 5 . . . . . . . . 
    . . 5 5 5 5 5 5 5 . . . . . . . 
    . 5 5 8 5 5 8 5 5 5 . . . . . . 
    f 5 5 5 5 5 5 5 5 5 f f f . . . 
    f 5 a 5 5 5 5 a 5 5 . . f . . . 
    f . 5 a 5 5 a 5 5 . . . f . . . 
    f . 5 5 a a 5 5 5 . f f f . . . 
    f f . 5 5 5 5 5 . . f f f . . . 
    f f . . e . . e . . . . . . . . 
    . . . . e . . e . . . . . . . . 
    . . . . e . . e . . . . . . . . 
    . . . . e . . e . . . . . . . . 
    . . e e e . e e . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
// Enemy is personally drawn, inspired by "Among Us" series
let myEnemy = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . a a a a . . . . . . 
    . . . . a a a a a a a a . . . . 
    . . . a 9 9 9 9 9 9 9 9 a . . . 
    . . . a 9 3 9 9 9 9 3 9 a . . . 
    . . . a 9 9 9 9 9 9 9 9 a . . . 
    . . . a 9 9 9 9 9 9 9 f a 8 . . 
    . . . a 9 9 9 9 f f f f a 8 . . 
    . . . a a a a a a a a a a 8 . . 
    . . . a a a a a a a a a a 8 . . 
    . . . a a a a a a a a a a 8 . . 
    . . . a a a a a a a a a a 8 . . 
    . . . a a a a a a a a a a . . . 
    . . . a a a a . . a a a a . . . 
    . . . a a a a . . a a a a . . . 
    `, SpriteKind.Enemy)
// Allows the player to move the Player sprite with buttons
controller.moveSprite(mySprite, 150, 150)
// Camera follows sprite to ensure it is in the frame throughout the course of the game
scene.cameraFollowSprite(mySprite)
myEnemy.follow(mySprite, 20)
// Setting the enemy in a fixed position at the start of the game so as to prevent the player sprite from getting killed at the start of the game
myEnemy.setPosition(0, 0)
info.setScore(0)
info.startCountdown(60)
game.onUpdateInterval(1000, function () {
    myPointAdder = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 7 7 7 7 7 7 . . . . . 
        . . . . . 7 7 7 7 7 7 . . . . . 
        . . . . . 7 7 7 7 7 7 . . . . . 
        . . . . . 7 7 7 7 7 7 . . . . . 
        . . . . . 7 7 7 7 7 7 . . . . . 
        . . . . . 7 7 7 7 7 7 . . . . . 
        . . . . . 7 7 7 7 7 7 . . . . . 
        . . . . . 7 7 7 7 7 7 . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . e e . . . . . . . 
        `, SpriteKind.PointAdder)
    myPointAdder.setPosition(randint(0, 256), randint(0, 256))
})
// Plays the theme melody of the game throughout the game nonstop
forever(function () {
    music.playMelody("D E D F E F D E ", 120)
})
game.onUpdateInterval(500, function () {
    ghost = sprites.create(img`
        ....................
        ....................
        ....................
        ....................
        ....................
        .....aaaaaaaaa......
        ....aaaaaaaaaaa.....
        ....aaaaaaaaaaa.....
        ....aaaaaaaaaaa.....
        ....aaf1aaaf1aa.....
        ....aaaaaaaaaaa.....
        ....aaaaa8aaaaa.....
        ....aaaa88aaaaa.....
        ....aaaaaaaaaaa.....
        ....a99999999aa.....
        ....aaaaaaaa9aa.....
        ....aaaaaaaaaaa.....
        .....a.a.a.a.a......
        ....................
        ....................
        `, SpriteKind.Food)
    ghost.setPosition(randint(0, 256), randint(0, 256))
    dinosaur = sprites.create(img`
        . . . . . . . . . . . 8 8 8 8 8 
        . . . . . . . . . 8 8 7 7 7 2 8 
        . . . . . . . . 8 8 7 7 7 8 8 . 
        . . . . . . . . 8 2 7 7 8 . . . 
        . . . . . . . . 8 2 2 2 8 . . . 
        . . . . . . . . 8 2 2 2 8 8 . . 
        . . . 8 8 8 8 8 8 8 2 2 2 8 8 . 
        . . 8 2 2 2 2 2 2 8 8 2 2 2 8 . 
        . 8 2 2 2 2 2 2 2 2 8 2 2 2 8 8 
        8 2 2 2 2 2 2 2 2 2 2 8 2 2 2 8 
        8 2 3 2 2 2 3 8 2 2 2 8 2 2 2 8 
        8 2 8 8 2 2 8 8 2 2 2 a 2 2 2 8 
        8 2 2 a 2 2 a 2 2 2 2 a 2 2 2 8 
        . a 2 2 2 2 2 2 2 2 2 a 2 2 8 . 
        . 8 1 8 a a 1 8 2 2 a 2 2 8 8 . 
        . 8 8 8 8 8 8 8 8 8 8 8 8 . . . 
        `, SpriteKind.Enemy)
    dinosaur.setPosition(randint(0, 256), randint(0, 256))
    myPointDeductor = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . e . . 
        . . . . . . . . . . . . e e e . 
        . . . . . . . . . 5 5 e e e . . 
        . . . . . . . 5 5 5 5 5 e . . . 
        . . . . . . 5 5 5 5 5 5 5 . . . 
        . . . . . 5 5 5 5 f f 5 5 . . . 
        . . . 5 5 5 5 5 f f 5 5 5 . . . 
        . . 5 5 5 5 5 f f 5 5 5 5 . . . 
        . 5 5 5 f f f f 5 5 5 5 . . . . 
        . 5 5 f f 5 5 5 5 5 5 . . . . . 
        . 5 5 5 5 5 5 5 5 5 . . . . . . 
        . . . 5 5 5 5 5 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.PointDeductor)
    myPointDeductor.setPosition(randint(0, 256), randint(0, 256))
})
