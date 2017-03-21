
//console.log(1 + 2);

var game = new Phaser.Game(800, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//initiates variable game with (width, height, rendering context (AUTO recomended), and Phaser essential functions)            

function preload() {
    game.load.image('track','../assets/track.png');
    //loads 'asset keys' such as 'sky' used to refrence assets when creating objects
    //'../assets/name.png' is the sub-directory within the game directory that assets are found
    //game.load.spritesheet('dude','../assets/dude.png', 32, 48);
    game.load.spritesheet('guy','../assets/guy.png', 30, 49,);
    
    };

var player;
var cursors;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //enables arcade physics system

    game.add.sprite(0, 0, 'track');
 
    //player = game.add.sprite(32, game.world.height/2, 'dude');
    player = game.add.sprite(32, game.world.height/2, 'guy');
    
    game.physics.arcade.enable(player);

    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true; 
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    };

function update() {

    if (player.world.x > game.world.width - 600)
    {
    game.world.resize(game.world.width + 800, game.world.height);
    game.add.sprite(game.world.width - 800, 0, 'track');
    player.bringToTop();
    }

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }
    if (cursors.up.isDown)
    {
        player.body.velocity.y = -150;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 150;
    }
    };
