
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
var obstacles;
var track;
var progress;

function create() {
    progress = 0;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //enables arcade physics system

    obstacles = game.add.group();
    obstacles.enableBody = true;

    track = game.add.sprite(0, 0, 'track');
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
    player.body.velocity.x = 150;

    cursors = game.input.keyboard.createCursorKeys();
    };

function update() {
    
    //game.physics.arcade.collide(player, obstacles);
    game.physics.arcade.overlap(player, obstacles, restart_game, null, this);

    if (player.world.x > game.world.width - 600)
    {
        game.world.resize(game.world.width + 800, game.world.height);
        track = game.add.sprite(game.world.width - 800, 0, 'track');
        track.sendToBack();
        track.autoCull = true;
        
        progress += 1;
        obstacle_count = Math.floor(progress/4) + 1;

        for (var i=0; i < obstacle_count; i++) {
            random_x = Math.floor(800*Math.random());
            random_y = Math.floor(350*Math.random());
            var new_obstacle = obstacles.create(game.world.width - random_x, random_y + 25, 'obstacle');
            new_obstacle.body.immovable = true;
            new_obstacle.bringToTop();
            player.bringToTop();
        };

        player.body.velocity.x += 50;
    }
    player_movement();
    };

function player_movement() {

    player.body.velocity.y = 0;
    player.animations.play('right');
    
    if (cursors.up.isDown)
    {
        player.body.velocity.y = -250;
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 250;
    }
    };

function restart_game() {
    obstacles.removeAll(true, false, false);
    player.reset(32, game.world.height/2);
    game.world.resize(800, 400);
    player.body.velocity.x = 200;
    progress = 0;
    };
