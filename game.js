var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics:{
        default: 'arcade',
        debug: true
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
var enemies;
var enemy;
var bullets;
var bullet;
var key_Right;
var key_Left;

var x = 150;
var y = 100;

function preload(){
    this.load.image('player','assets/ship.png');
    this.load.image('bullet','assets/Bullet.png');
    this.load.image('enemy','assets/InvaderA1.png');
    this.load.image('block','assets/FullBlock.png');
}

function create(){
    //Create Player
    player = this.physics.add.sprite(this.sys.game.config.width / 2, 550,'player');

    enemies = this.physics.add.group();

    for(var i = 0; i<6; i++){
        for(var j = 0; j<6; j++){
            enemy = enemies.create(x,y,'enemy');
            enemy.setVelocityY(0);
            x += 100;
            console.log("enemy");
        }
        x = 150;
        y += 50;
    }

    bullets = this.physics.add.group({
        defaultkey: 'bullet',
        maxSize: 20
    });

    //Key Movement
    key_Right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    key_Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    //Boundaries
    player.setCollideWorldBounds(true);

    //Key Shoot
    this.input.keyboard.on('keyup_SPACE',shoot,this);

    this.physics.add.overlap(enemies, bullets, bulletCollide, null, this);
}

function shoot(){
    bullet = bullets.create(player.x,player.y - 10,'bullet');
    if(bullet){
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.setVelocityY(-300);
    }
}

function bulletCollide(enemy,bullet){
    console.log("collide");
    bullet.setActive(false);
    bullet.setVisible(false);
    bullet.x = 1000;
    enemy.setActive(false);
    enemy.setVisible(false);
    enemy.x = 10000;
}

function update(){
    //Movement
    if(key_Right.isDown){
        player.setVelocityX(200);
    }else if(key_Left.isDown){
        player.setVelocityX(-200);
    }else {
        player.setVelocity(0);
    }

    bullets.children.each(function(b) {
        if (b.active) {
            if (b.y < 0) {
                b.setActive(false);
            }
        }
    }.bind(this));
}
