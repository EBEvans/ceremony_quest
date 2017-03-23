
//console.log(1 + 2);

var game = new Phaser.Game(800, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//initiates variable game with 
//(width, height, rendering context (AUTO recomended), and Phaser essential functions)            

function preload() {
    game.load.image('track','../assets/track.png');
    //loads 'asset keys' such as 'sky' used to refrence assets when creating objects
    //'../assets/name.png' is the sub-directory within the game directory that assets are found
    game.load.spritesheet('guy','../assets/test2.png', 32, 51);
    //loads the file 'test2.png' as a  spritesheat named 'guy' from directory '../assets/'
    //frames are specified as being 32 px wide and 51 px tall
    game.load.image('obstacle','../assets/test3.png');
    
    };

var player;
var cursors;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //enables arcade physics system

    game.add.sprite(0, 0, 'track');
    //adds a sprite at location (0, 0), or the top left of the screen
    //sprite icon is the 'track' image loaded in preload function
 
    player = game.add.sprite(32, game.world.height/2, 'guy');
    //initiates player variable by adding a sprite at location (32, gmae.world.height/2)
    //and uses the 'guy' spritesheet as an image resource
    
    game.physics.arcade.enable(player);
    //enables arcade physics for player

    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true; 
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    //adds animations based off of the player spritesheet
    //('animation name', [frame numbers], fps, repeat)
    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    };

function update() {
    
    if (player.world.x > game.world.width - 600)
    {
        world_generation();
    }
    player_movement();
    };

function world_generation() {

    game.world.resize(game.world.width + 800, game.world.height);
    game.add.sprite(game.world.width - 800, 0, 'track');

    new_obstacle_count = Math.floor(Math.random() * (4)) + 1
    while (new_obstacle_count > 0)
    {
        new_obstacle_location_y = Math.floor(Math.random() * (370 - 30 + 1)) + 30;
        new_obstacle_location_x = Math.floor(Math.random() * (820 - 30 + 1)) + 30;
        game.add.sprite(new_obstacle_location_x, new_obstacle_location_Y, 'obstacle');
        game.add.sprite(100, 100, 'obstacle');
        new_obstacle_count = new_obstacle_count - 1;
    }
    //player.body.velocity.x = player.body.velocity + 1;
    player.bringToTop();
    //brings the player to the top of the render order
    };

function player_movement() {

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
