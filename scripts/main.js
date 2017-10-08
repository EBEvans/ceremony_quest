
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//initiates variable game with 
//(width, height, rendering context (AUTO recomended), and Phaser essential functions)            

function preload() {

    game.load.image('background','../assets/camp_background.png');
    //loads 'asset keys' such as 'sky' used to refrence assets when creating objects
    //'../assets/name.png' is the sub-directory within the game directory that assets are found
    game.load.spritesheet('guy','../assets/test2.png', 32, 51);
    //loads the file 'test2.png' as a  spritesheat named 'guy' from directory '../assets/'
    //frames are specified as being 32 px wide and 51 px tall
    game.load.image('dead_fire','../assets/dead_fire.png', 64, 64);
    game.load.image('sitting_log_vertical','../assets/sitting_log_vertical.png', 32, 96);
    game.load.image('sitting_log_horizontal','../assets/sitting_log_horizontal.png', 96, 32);
    game.load.image('burned_candle','../assets/burned_candle.png', 8, 16);
    
    };

var player;
var cursors;
var background;
var props;
var decorations;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //enables arcade physics system

    background = game.add.sprite(0, 0, 'background');
    //adds a sprite at location (0, 0), or the top left of the screen
    //sprite icon is the 'track' image loaded in preload function

    props = game.add.group();
    props.enableBody = true;
    
    var fire = props.create(368, 268, 'dead_fire');
    fire.body.immovable = true;

    var log = props.create(352, 170, 'sitting_log_horizontal');
    log.body.immovable = true;

    var log = props.create(272, 252, 'sitting_log_vertical');
    log.body.immovable = true;
    var log = props.create(496, 252, 'sitting_log_vertical');
    log.body.immovable = true;

    decorations = game.add.group();
    decorations = game.add.sprite(396, 144, 'burned_candle');
    decorations = game.add.sprite(360, 144, 'burned_candle');
    decorations = game.add.sprite(436, 144, 'burned_candle');

    decorations = game.add.sprite(256, 364, 'burned_candle');
    decorations = game.add.sprite(256, 340, 'burned_candle');
    decorations = game.add.sprite(256, 316, 'burned_candle');
    decorations = game.add.sprite(256, 292, 'burned_candle');
    decorations = game.add.sprite(256, 268, 'burned_candle');
    decorations = game.add.sprite(256, 244, 'burned_candle');

    decorations = game.add.sprite(548, 364, 'burned_candle');
    decorations = game.add.sprite(548, 340, 'burned_candle');
    decorations = game.add.sprite(548, 316, 'burned_candle');
    decorations = game.add.sprite(548, 292, 'burned_candle');
    decorations = game.add.sprite(548, 268, 'burned_candle');
    decorations = game.add.sprite(548, 244, 'burned_candle');
 
    player = game.add.sprite(game.world.width/2, 728, 'guy');
    //initiates player variable by adding a sprite at location (game.world.width/2, 728)
    //and uses the 'guy' spritesheet as an image resource
    
    game.physics.arcade.enable(player);
    //enables arcade physics for player

    player.body.gravity.y = 0;
    player.body.collideWorldBounds = true; 
    player.animations.add('left', [0, 1, 2, 3], 5, false);
    player.animations.add('right', [5, 6, 7, 8], 5, false);
    player.animations.add('still', [4], 5, false);
    //adds animations based off of the player spritesheet
    //('animation name', [frame numbers], fps, repeat)
    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    };

function update() {
    
    game.physics.arcade.collide(player, props);

    player_movement();
    };

function player_movement() {

    player.body.velocity.y = 0;
    player.body.velocity.x = 0;
    
    if (cursors.up.isDown)
    {
        player.body.velocity.y = -250;
        player.animations.play('still');
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 250;
        player.animations.play('still');
    }
    else if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
        player.animations.play('right');
    }
    else
    {
        player.animations.play('still');
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
    }
    
    };
