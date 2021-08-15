sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    game.over(false)
})
let dinosaur: Sprite = null
let ghost: Sprite = null
game.splash("Modified Cherry Pickr")
tiles.setTilemap(tilemap`level1`)
let mySprite = sprites.create(img`
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
let mySprite2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 150, 150)
scene.cameraFollowSprite(mySprite)
info.setScore(0)
info.startCountdown(60)
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
})
game.onUpdateInterval(20000, function () {
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
})
