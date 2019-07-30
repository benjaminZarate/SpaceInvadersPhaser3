var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics:{
        default: 'arcade'
    },
    scene: {
        key: 'game',
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player;
var enemy = [];
var  bullet;

var key_Right;
var key_Left;

function preload(){
    this.load.image('player','assets/ship.png');
    this.load.image('bullet','assets/Bullet.png');
    this.load.image('enemy','assets/InvaderA1.png');
    this.load.image('block','assets/FullBlock.png');
}

function create(){
    player = this.physics.add.image(this.sys.game.config.width / 2, 550,'player');

    key_Right = this.Phaser.Input.keyboard

}

function update(){
    player.setVelocity(0);
}
