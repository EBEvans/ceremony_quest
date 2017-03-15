
//console.log(1 + 2);

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//initiates variable game with (width, height, rendering context (AUTO recomended), and Phaser essential functions)            

function preload() {
    game.load.image('sky','../assets/sky.png');
    //loads 'asset keys' such as 'sky' used to refrence assets when creating objects
    //'../assets/name.png' is the sub-directory within the game directory that assets are found
    game.load.spritesheet('dude','../assets/dude.png', 32, 48);
    
    };

var player;
var cursors;

function create() {
    
    game.world.resize(1600, 600);
    //console.log(game.camera.position);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //enables arcade physics system

    game.add.sprite(0, 0, 'sky');
 
    player = game.add.sprite(400, game.world.height/2, 'dude');
    
    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true; 
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
    };

function update() {
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
        player.body.velocity.y = 150;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = -150;
    }
    if (player.world.x > game.camera.position.x + 400)
    {
        var adjustment = player.world.x - game.camera.position.x + 400;
        game.camera.x = game.camera.position.x + adjustment;
    }
    else if (player.world.x < game.camera.position.x + 400)
    {
        var adjustment = game.camera.position.x + 400 - player.world.x;
        game.camera.x = game.camera.position.x - adjustment;
    }
    };
