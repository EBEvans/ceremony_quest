

besthighscore = localStorage.getItem('bestScore');

var count = 0;

var playState = {
    
    
updateCounter: function() {
    if(!this.gameover && inputcheck == true) {    
        game.global.milescount = game.global.milescount - 1;
        game.global.milestraveled = game.global.milestraveled + 1;
    }
    else {
        game.global.milescount = game.global.milescount;
        game.global.milestraveled = game.global.milestraveled;
    }

},    
    
    

create: function() {
    
document.getElementById('theAdZone').style.display = 'none';

        game.load.image('tweet', 'assets/twitter.png');
    
    
    
    this.checkcollision = false;
    this.gameover = false;

    //console.log(faithlifecheck);
    
    eelShieldAvailable = true;
    eelShieldActive = false;
    
    game.global.milestraveled = 0;


    
    game.global.timer;
    game.global.milescount = 180;
    
    timer = game.time.create(false);
    timer.loop(1000, this.updateCounter, this);
    timer.start();
    color1 = { red: 45, green:140, blue: 186 };
    color2 = { red: 40, green:40, blue: 60};
    color3 = { red: 5, green:26, blue: 96 };

    
    
    game.world.setBounds(0, 0, 1500, 1250);
    
    //Create Game Variables
    game.global.score = 0;
    game.global.health = 3;

    game.global.krillcollected = 0;
    game.global.boostbonus = 0;
    game.global.beachbonus = 0;
    
    ACCELERATION = 200;
    MAXSPEED = 600;  
    SWIMSPEED = 1;

    game.input.gamepad.start();

    //Add graphics and sprites

    skybackground = game.add.tileSprite(0, 0, 1500, 1024, 'sky_day');

    
    sun = game.add.sprite(700, 25, 'sun');
    sun.alpha = 0;
    sun.scale.setTo(1.5,1.5);
    sun.blendMode = Phaser.blendModes.ADD;
    
    moon = game.add.sprite(300, 45, 'moon');
    moon.alpha = 1;
    moon.blendMode = Phaser.blendModes.ADD;
    lightning1 = game.add.sprite(130, 165, 'lightning1');
    lightning1.scale.setTo(1.4,0.7);
    lightning1.alpha = 0;
    lightning1.blendMode = Phaser.blendModes.ADD;
    land = game.add.tileSprite(0, 130, 1500, 128, 'land');

    waterbackground = game.add.tileSprite(0, 256, 1500, 2048, 'water_day');

    farestbg = game.add.tileSprite(0, 600, 1500, 256, 'bg2');
    farestbg.scale.setTo(1.5,1.5);
    farestbg.alpha = 0.1;
        
    farbg = game.add.tileSprite(0, 700, 1500, 128, 'bg1');
    farbg.scale.setTo(2.8,2.8);

    midground1 = game.add.tileSprite(0, 900, 1500, 256, 'midground1');

    this.jonah = game.add.sprite(270, 220, 'jonah');
    this.jonah.anchor.setTo(0.5, 0.5);
    this.jonah.animations.add('run');

    this.jonah.animations.play('run', 44, true);
        oceantop = game.add.tileSprite(0, 253, 1500, 4, 'oceantop');
        this.lightrays1 = game.add.tileSprite(0, 256, 1500, 255,'lightrays1');
    this.lightrays1.scale.setTo(1.4,1.4);
    this.lightrays1.blendMode = Phaser.blendModes.ADD;
    this.firstboat = game.add.sprite(260, 176, 'boat');
    this.jonah.anchor.setTo(0.8, 0.1);
    this.firstboat.scale.setTo(1.25,1.25);


    //Add Whale Sprite
    this.whale = game.add.sprite(-240, 500, 'whaleeat');
    this.whale.scale.setTo(1.25,1.25);

    


    //Add Splash Sprite
    this.splash = game.add.sprite(245, 235, 'splash');
    this.splash.anchor.setTo(0.4, 0.5);
    this.splash.scale.setTo(2.4,2.4);
    this.splash.animations.add('run'); 

    this.eels = game.add.group(); 
    this.eels.enableBody = true; 
    this.eels.createMultiple(25, 'eel');

    this.shields = game.add.group(); 
    this.shields.enableBody = true; 
    this.shields.createMultiple(25, 'shield');
    
        this.pointsboost = game.add.group(); 
    this.pointsboost.enableBody = true; 
    this.pointsboost.createMultiple(25, 'pointsboost');
    
    this.jellys = game.add.group(); 
    this.jellys.enableBody = true; 
    this.jellys.createMultiple(25, 'jelly');
    
    this.boats = game.add.group(); 
    this.boats.enableBody = true; 
    this.boats.createMultiple(25, 'newboat');

    

    
    this.instructions = game.add.text(900, 360, 'Tap & hold to swim up...',{ font: '300 35px Source Sans Pro', fill: '#ffffff', align: 'right' });
    this.instructions.anchor.setTo(1, 0.5);
    this.instructions.alpha = 0;
    this.instructions.fixedToCamera = true;
    
    foreground1 = game.add.tileSprite(0, 970, 1500, 512, 'foreground1');
    //foreground1.scale.setTo(1.4,1.4); 
        this.scoreLabel = game.add.text(35, 690, '0',{ font: '400 42px Source Sans Pro', fill: '#ffffff', align: 'left' });
    this.scoreLabel.anchor.setTo(0, 0.5);
    this.scoreLabel.fixedToCamera = true;
    
    this.distanceLabel = game.add.text(1230, 690, '0',{ font: '300 35px Source Sans Pro', fill: '#ffffff', align: 'right' });
    this.distanceLabel.anchor.setTo(1, 0.5);
    this.distanceLabel.fixedToCamera = true;

    this.nexteel = 0;
    this.nextjelly = 0;
    this.nextshield = 0;
        this.nextpointsboost = 0;
    this.nextboat = 0;


    game.physics.enable(this.whale, Phaser.Physics.ARCADE);
    this.whale.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    this.whale.animations.add('run'); 
    
    this.whale.body.setSize(95, 30, 35, 0);
    this.whale.anchor.setTo(0.4, 0.5);
    this.whale.health = 1;
    
    this.whale.outOfBoundsKill = true;
    
    
    inputcheck = false;
    restartgame = false;
    game.sound.play('rain', 0.5);

    
    this.beach = game.add.sprite(1600, -338, 'beach');
    this.beach.anchor.setTo(0.5, 0);
    //this.beach.blendMode = Phaser.blendModes.MULTIPLY;
    game.physics.enable(this.beach, Phaser.Physics.ARCADE); 
    this.beach.body.setSize(100, 500, 200, 570);
   
    this.jonahout = game.add.sprite(1500, this.whale.position.y-110, 'jonah');
    this.jonahout.anchor.setTo(0.5, 0.5);
    this.jonahout.animations.add('run');
    
    game.physics.enable(this.jonahout, Phaser.Physics.ARCADE);
    
    
        game.time.events.add(1500, this.introAnimation, this).autoDestroy = true;
        game.time.events.add(800, this.introspriteanimation, this).autoDestroy = true;
        game.time.events.add(1200, this.jonahintroanimation, this).autoDestroy = true;
        game.time.events.add(2200, this.changeWhale, this).autoDestroy = true;
        game.time.events.add(4500, this.initWhale, this).autoDestroy = true;


    daychangelength = 1000;
    daychangevar = 180;
    game.time.events.add(2500, this.stormtoday, this).autoDestroy = true;

    game.time.events.add((((daychangevar/9)*1000))*1, this.daytodusk, this).autoDestroy = true;
    game.time.events.add((((daychangevar/9)*1000))*2, this.toNight, this).autoDestroy = true;
    game.time.events.add((((daychangevar/9)*1000))*3, this.stormtoday, this).autoDestroy = true;
    game.time.events.add((((daychangevar/9)*1000))*4, this.daytodusk, this).autoDestroy = true;
    game.time.events.add((((daychangevar/9)*1000))*5, this.toNight, this).autoDestroy = true;
    game.time.events.add((((daychangevar/9)*1000))*6, this.stormtoday, this).autoDestroy = true;
    game.time.events.add((((daychangevar/9)*1000))*7, this.daytodusk, this).autoDestroy = true;
    game.time.events.add((((daychangevar/9)*1000))*8, this.toNight, this).autoDestroy = true;
    game.time.events.add((((daychangevar/9)*1000))*9, this.stormtoday, this).autoDestroy = true;



},

    
introAnimation: function() {

   game.camera.follow(null);
   var whalein = game.add.tween(this.whale).to({ x: 200, y:400 }, 1000, Phaser.Easing.Quadratic.InOut)
                .to({ y:500 }, 1000, Phaser.Easing.Quadratic.InOut).start();
   var whalein2 = game.add.tween(this.whale).from({ angle:-45 }, 2000, Phaser.Easing.Quartic.InOut).start();

},   
    
introspriteanimation: function() {
        this.whale.animations.play('run', 44, false, false);
        game.add.tween(this.instructions).to({ alpha: 1 }, 2000, Phaser.Easing.Quadratic.InOut, true, 2000, 0, true);
},
    
    
destroySprite: function(sprite) {
    sprite.destroy();
},
    

    

    
initWhale: function() {  
   
    this.whale.body.gravity.y = 1100;
    inputcheck = true;
},    
     
    
changeWhale: function() {

    this.whale.loadTexture('whale', 0);
    this.whale.animations.add('run');
    this.whale.animations.play('run', 44, true);

},
  
        isDown: function (buttonCode) {

        for (var i = 0; i < this._gamepads.length; i++)
        {
            if (this._gamepads[i].isDown(buttonCode) === true)
            {
                return true;
            }
        }

        return false;
    },       
    
stormtoday: function() {
    var suntoday = game.add.tween(sun).to({ alpha:1, y:-60 }, 2000, Phaser.Easing.Cubic.InOut, true);
    var moontoday = game.add.tween(moon).to({ alpha:0, y:140 }, 2000, Phaser.Easing.Cubic.InOut, true);
testingtween = game.add.tween(color1).to( { red: 255, green: 255, blue: 255 }, daychangelength, "Linear", true);
testingtween2 = game.add.tween(color2).to( { red: 255, green: 255, blue: 255 }, daychangelength, "Linear", true);
testingtween3 = game.add.tween(color3).to( { red: 33, green: 225, blue: 255 }, daychangelength, "Linear", true);    

   

},     
    
    daytodusk: function() {
       var suntoday = game.add.tween(sun).to({ alpha:0.5, y:65 }, 2000, Phaser.Easing.Cubic.InOut, true);
testingtween = game.add.tween(color1).to( { red: 70, green: 30, blue: 30 }, daychangelength, "Linear", true);
testingtween2 = game.add.tween(color2).to( { red: 247, green: 156, blue: 156 }, daychangelength, "Linear", true);
testingtween3 = game.add.tween(color3).to( { red: 253, green: 89, blue: 116 }, daychangelength, "Linear", true);        
},    
   

    toNight: function() {
       var suntoday = game.add.tween(sun).to({ alpha:0, y:140 }, 2000, Phaser.Easing.Cubic.InOut, true);
        var moontoday = game.add.tween(moon).to({ alpha:1, y:-40 }, 2000, Phaser.Easing.Cubic.InOut, true);
testingtween = game.add.tween(color1).to( { red: 45, green: 140, blue: 186 }, daychangelength, "Linear", true);
testingtween2 = game.add.tween(color2).to( { red: 40, green: 40, blue: 60 }, daychangelength, "Linear", true);
testingtween3 = game.add.tween(color3).to( { red: 5, green: 26, blue: 96 }, daychangelength, "Linear", true);        
},    
       
    

    
// And then we add the new function:
enemytint: function(enemy) { enemy.tint = tintcolor1;},
    
    
    
update: function() {
    
   // this.whale.blendMode = Phaser.blendModes.NORMAL;
    
    color1.red = Math.floor(color1.red); color1.green = Math.floor(color1.green); color1.blue = Math.floor(color1.blue);
    tintcolor1 = Phaser.Color.RGBtoString(color1.red, color1.green, color1.blue, '', '0x');
    
    color2.red = Math.floor(color2.red); color2.green = Math.floor(color2.green); color2.blue = Math.floor(color2.blue);
    tintcolor2 = Phaser.Color.RGBtoString(color2.red, color2.green, color2.blue, '', '0x');
    
    color3.red = Math.floor(color3.red); color3.green = Math.floor(color3.green); color3.blue = Math.floor(color3.blue);
    tintcolor3 = Phaser.Color.RGBtoString(color3.red, color3.green, color3.blue, '', '0x');

    this.whale.tint = tintcolor1;
    
    if (eelShieldActive == true) {
        randomValue = game.rnd.integerInRange(150, 255);
            this.whale.tint = randomValue * 0xffffff;
    }
    
    this.jonah.tint = tintcolor1;
    this.jonahout.tint = tintcolor2;
    this.firstboat.tint = tintcolor1;
    this.splash.tint = tintcolor1;

    this.eels.forEach(this.enemytint, this);
    this.boats.forEach(this.enemytint, this);    

    skybackground.tint = tintcolor2;    
    land.tint = tintcolor2;
this.beach.tint = tintcolor2;
    oceantop.tint = tintcolor3;
    farestbg.tint = tintcolor3;
    farbg.tint = tintcolor3;

    waterbackground.tint = tintcolor3;
    midground1.tint = tintcolor3;
    foreground1.tint = tintcolor3;


    
    
    this.scoreLabel.text = '' + (game.global.score+(game.global.milestraveled*100)+game.global.boostbonus+game.global.krillcollected);
    
    this.distanceLabel.text = '' + (game.global.milescount) + ' Miles Remaining';


     if (game.global.milescount == 0)  { 

         this.gameover = true;
         //this.distanceLabel.text = '' + '0' + ' Miles Remaining';
         game.global.milescount = 180;
         this.playerWin();
     }

    
    game.camera.follow(this.whale);

  
        if (
            (game.input.gamepad.isDown(Phaser.Gamepad.BUTTON_1) && restartgame == true) || 
        (game.input.gamepad.isDown(Phaser.Gamepad.BUTTON_2) && restartgame == true) || 
        (game.input.gamepad.isDown(Phaser.Gamepad.BUTTON_8) && restartgame == true) || 
        (game.input.gamepad.isDown(Phaser.Gamepad.BUTTON_9) && restartgame == true) 
          ) 
        { this.startMenu();  }
    
    
    
    // Game Controls
    if (
        (game.input.gamepad.isDown(Phaser.Gamepad.BUTTON_1) && this.whale.position.y > 260 && inputcheck == true) || 
        (game.input.gamepad.isDown(Phaser.Gamepad.BUTTON_2) && this.whale.position.y > 260 && inputcheck == true) || 
        (game.input.gamepad.isDown(Phaser.Gamepad.BUTTON_8) && this.whale.position.y > 260 && inputcheck == true) || 
        (game.input.gamepad.isDown(Phaser.Gamepad.BUTTON_9) && this.whale.position.y > 260 && inputcheck == true) || 
        (game.input.activePointer.isDown && this.whale.position.y > 260 && inputcheck == true )
       
       
       ) {
        this.whale.body.acceleration.y += -ACCELERATION; 
    }



    else if (this.whale.position.y < 259 ){
        game.global.boostbonus += 10;
        this.whale.body.acceleration.y = -50;
        //this.whale.animations.play('run', 22, true);
    }

    else if (this.whale.position.y > 1100 ){
            this.whale.body.acceleration.y += -ACCELERATION; 
           // this.whale.animations.play('run', 22, true);
    }

    else  {
        this.whale.body.acceleration.y = 0;
        //this.whale.animations.play('run', 44, true);
    }


    //Scrolling & Movement
    this.whale.body.acceleration.x = 0;
    farestbg.tilePosition.x -= SWIMSPEED*0.1;
    farbg.tilePosition.x -= SWIMSPEED*0.4;
    land.tilePosition.x -= SWIMSPEED*0.4;
    midground1.tilePosition.x -= SWIMSPEED*5;
    foreground1.tilePosition.x -= SWIMSPEED*10;
    this.lightrays1.tilePosition.x -= SWIMSPEED*0.7;
    
    // Play Splash
    if (this.whale.position.y > 235 && this.whale.position.y < 245) {
            this.splash.animations.play('run', 44, false); 
     game.sound.play('splash', 0.5);
    }

    //Whale rotation
    bank = this.whale.body.velocity.y / (MAXSPEED*2);
    this.whale.angle = bank * 45;

    //Spawn enemies
    spawntimer = game.time.create(true);
    spawntimer.add(5000, this.spawnenemies, this);
    spawntimer.start();
    
    //Collision checks
    if(!this.gameover && (eelShieldActive == false)) {    
        game.physics.arcade.overlap(this.whale, this.eels, this.onHit, null, this );
        game.physics.arcade.overlap(this.whale, this.jellys, this.onHit, null, this );
        game.physics.arcade.overlap(this.whale, this.boats, this.onHitboat, null, this );

    }
        
    game.physics.arcade.overlap(this.whale, this.shields, this.eelShieldOn, null, this );
    
        game.physics.arcade.overlap(this.whale, this.pointsboost, this.pointsBoostget, null, this );
    
    game.physics.arcade.overlap(this.jonahout, this.beach, this.stopjonah, null, this ); 

},
 
spawnenemies: function() {
    if (this.nexteel < game.time.now && game.global.milescount > 5 && game.global.milescount < 178) {
        this.addEels();
        this.nexteel = game.time.now + 800; 
    }
    if (this.nextboat < game.time.now  && game.global.milescount > 5 && game.global.milescount < 178) {
        this.addBoats();
        this.nextboat = game.time.now + 6000; 
    }
    
     if (this.nextjelly < game.time.now  && game.global.milescount > 5 && game.global.milescount < 178) {
        this.addJelly();
        this.nextjelly = game.time.now + 1700; 
     }
    if (this.nextshield < game.time.now  && game.global.milescount > 5 && game.global.milescount < 170) {
        this.addShields();
        this.nextshield = game.time.now + 22000; 
     }

        if (this.nextpointsboost < game.time.now  && game.global.milescount > 5 && game.global.milescount < 175) {
        this.addPointsboost();
        this.nextpointsboost = game.time.now + 13000; 
     }


},

addPointsboost: function() {
    pointsBoostSprite = this.pointsboost.getFirstDead(); if (!this.pointsboost) {return; }
    
            pointsBoostSprite.animations.add('run'); 
    pointsBoostSprite.animations.play('run', 44, true);
    pointsBoostSprite.body.setSize(95, 30, 35, 0);
    pointsBoostSprite.anchor.setTo(0.5, 1); 
        pointsBoostSprite.scale.setTo(1.7,1.7);
        pointsBoostSprite.blendMode = Phaser.blendModes.ADD;
    pointsBoostSprite.reset(1500, game.rnd.between(600, 1100)); 

    pointsBoostSprite.body.velocity.x = ((game.rnd.between(300, 600))*(-1))*SWIMSPEED; 
    pointsBoostSprite.checkWorldBounds = true;
    pointsBoostSprite.outOfBoundsKill = true;

},    
  
    
addShields: function() {

    if (eelShieldAvailable == true) {
    eelshield = this.shields.getFirstDead(); if (!this.shields) {return; }
            eelshield.animations.add('run'); 
    eelshield.animations.play('run', 44, true);
        

            eelshield.blendMode = Phaser.blendModes.ADD;
    

        
        
    eelshield.body.setSize(95, 30, 35, 0);
    eelshield.anchor.setTo(0.5, 1); 
            eelshield.scale.setTo(1.7,1.7);
    eelshield.reset(1500, game.rnd.between(300, 1100)); 
    eelshield.body.velocity.x = ((game.rnd.between(300, 600))*(-1))*SWIMSPEED; 
    eelshield.checkWorldBounds = true;
    eelshield.outOfBoundsKill = true;
    }
},    
  
addEels: function() {
    enemyeel = this.eels.getFirstDead(); if (!this.eels) {return; }
    
    enemyeel.animations.add('run'); 
    enemyeel.animations.play('run', 44, true);
    enemyeel.body.setSize(95, 30, 35, 0);
    enemyeel.anchor.setTo(0.5, 1); 
    
    enemyeel.reset(1500, game.rnd.between(300, 1100)); 

    enemyeel.body.velocity.x = ((game.rnd.between(300, 600))*(-1))*SWIMSPEED; 
    enemyeel.checkWorldBounds = true;
    enemyeel.outOfBoundsKill = true;

},
     
     
addJelly: function() {
    enemyJelly = this.jellys.getFirstDead(); if (!this.jellys) { return; }
    enemyJelly.animations.add('run'); 
    enemyJelly.animations.play('run', 44, true);
    enemyJelly.blendMode = Phaser.blendModes.ADD;

    enemyJelly.anchor.setTo(0.5, 1); 
    enemyJelly.reset(game.rnd.between(1300, 1600), game.rnd.between(700, 1300)); 

    game.add.tween(enemyJelly).to({ y: game.rnd.between(300, 700), x: ((game.rnd.between(200, 400))*(-1))*SWIMSPEED }, 8000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
    enemyJelly.body.velocity.x = (-400);
    enemyJelly.checkWorldBounds = true;
    enemyJelly.outOfBoundsKill = true;

},
     
addBoats: function() {
    var enemyboat = this.boats.getFirstDead(); if (!this.boats) {return; }
    enemyboat.body.setSize(65, 20, 10, 45);
    enemyboat.reset(1500, 202); 
    enemyboat.scale.setTo(1.2,1.4);
    enemyboat.anchor.setTo(0.8,0.5);
    game.add.tween(enemyboat).to({ y: 192 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
    enemyboat.body.velocity.x = ((game.rnd.between(150, 300))*(-1))*SWIMSPEED; 
    enemyboat.checkWorldBounds = true;
    enemyboat.outOfBoundsKill = true;

},     
     
     
changetexture: function () {
 
    this.whale.loadTexture('skeleton', 0);
    this.whale.animations.add('run');
    this.whale.animations.play('run', 44, true);
},
  
changetextureboat: function () {
 game.sound.play('collision', 0.5);
    this.whale.loadTexture('whalehit', 0);
    this.whale.animations.add('run');
    this.whale.animations.play('run', 44, true);
},
      
      
changetexture2: function () {
    
    this.whale.loadTexture('whale', 0);
    this.whale.animations.add('run');
    this.whale.animations.play('run', 44, true);
},
    
eelShieldOn: function(sprite, sprite2) {
    sprite2.kill();
    shieldtext = game.add.sprite(this.whale.position.x, this.whale.position.y, 'shieldtext');
    shieldtext.anchor.setTo(0.5, 0.5);
    shieldtext.scale.setTo(1.7,1.7);
    shieldtext.animations.add('run');

    shieldtext.animations.play('run', 60, false);
    game.sound.play('powerup', 0.2, true);
    this.whale.blendMode = Phaser.blendModes.ADD;
    eelShieldActive = true;  
    game.time.events.add(6000, this.eelShieldOff, this).autoDestroy = true;
},
        
pointsBoostget: function(sprite, sprite2) {
    game.sound.play('ping', 0.5);
    sprite2.kill();
    game.global.krillcollected += 1000;
    
},  
    
eelShieldOff: function () {
    game.sound.removeByKey('powerup');
    this.whale.blendMode = Phaser.blendModes.NORMAL;
  eelShieldActive = false;  
    this.changetexture2();
},
    
   
onWin: function() {
    
        this.whale.body.velocity.y = 0;
        this.whale.body.acceleration.y = 0;
        this.playerWin();
},


onHitboat: function() {

    this.whale.health -= 1;
    if(this.whale.health == 0)
    {
        this.changetextureboat();
        this.whale.body.velocity.y = 0;
        this.whale.body.acceleration.y = 0;
        this.playerDie();
    }
},    
    
     
onHit: function() {
game.sound.play('zap', 0.5);
    this.whale.health -= 1;
    if(this.whale.health == 0)
    {
        this.changetexture();
        this.whale.body.velocity.y = 0;
        this.whale.body.acceleration.y = 0;
        this.playerDie();
    }
},
    

jonahintroanimation: function() {
    
game.add.tween(lightning1).to({ alpha:1 }, 200, Phaser.Easing.Quadratic.In).to({ alpha:0 }, 200, Phaser.Easing.Quadratic.In).to({ alpha:1 }, 200, Phaser.Easing.Quadratic.In).to({ alpha:0 }, 200, Phaser.Easing.Quadratic.In).start();
    this.jonah.animations.play('run', 44, true);
    var jonahfall = game.add.tween(this.jonah).to({ y:150 }, 500, Phaser.Easing.Quadratic.InOut)
        .to({ y:320, angle: 180 }, 500, Phaser.Easing.Quadratic.InOut).start();

    jonahfall.onComplete.addOnce(this.destroySprite, this);
    game.add.tween(this.firstboat).to({ x:-400, y:136, angle:10 }, 5000, Phaser.Easing.Quadratic.In).start();

},

    

jonahoutroanimation: function() {
    
        // Jonah flying out
        this.jonah.animations.play('run', 44, true);
        this.jonahout.position.setTo(this.whale.position.x+110, this.whale.position.y-110);
        this.jonahout.body.gravity.y = 1400;
        this.jonahout.body.velocity.y = -390;
        this.jonahout.body.velocity.x = 1100;
    
        //Whale Vomit Animation
        game.add.tween(this.jonahout).to({ angle: 120}, 700, Phaser.Easing.Quadratic.InOut, true);
        this.whale.loadTexture('whaleeat', 0);
        this.whale.animations.add('run');
        game.time.events.add(300, this.changetexture2, this).autoDestroy = true;
            

    
},
    
    stopjonah: function() {

        this.jonahout.body.velocity.y = 0;
        this.jonahout.body.velocity.x = 0;
        this.jonahout.body.gravity.y = 0;
        this.jonahout.body.acceleration.y = 0;
        this.jonahout.body.acceleration.x = 0;
},  


playerWin: function() {

    game.add.tween(this.beach).to({ x: 900 }, 2500, Phaser.Easing.Quadratic.Out, true);
    
    game.camera.follow(null);
    

    
    var tween2 = game.add.tween(this.scoreLabel).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None).start();
    this.whale.body.velocity.y = 0;
    this.whale.body.acceleration.y = 0;
    this.whale.body.enable = false;
    whaleSurfaceUpSpeed = 2000;
    
    game.time.events.add(Phaser.Timer.SECOND*(whaleSurfaceUpSpeed/1000), this.jonahoutroanimation, this).autoDestroy = true;

    var whaleout = game.add.tween(this.whale).to({ y:250,angle:-15 }, whaleSurfaceUpSpeed, Phaser.Easing.Quadratic.InOut)
        .to({ x:-350, y:300,angle:0}, whaleSurfaceUpSpeed*1.5, Phaser.Easing.Quadratic.InOut).start();
        //whaleout.onComplete.addOnce(this.destroySprite, this);

    
    var tween3 = game.add.tween(this.distanceLabel).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None).start();
    
    game.global.milestraveled = game.global.milestraveled;
    game.global.beachbonus = 10000;

    game.time.events.add(Phaser.Timer.SECOND*4, this.gameOver, this).autoDestroy = true;


    
}, 
     
     restartgamechange: function() {
         restartgame = true;
     },
     
playerDie: function() {
this.gameover = true;
    var tween3 = game.add.tween(this.distanceLabel).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None).start();
    var tween2 = game.add.tween(this.scoreLabel).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None).start();
    game.global.milestraveled = game.global.milestraveled;
    game.global.beachbonus = 0;
    this.whale.body.enable = false;
    game.camera.follow(null);
    whaleouttween = game.add.tween(this.whale).to({x: -500}, 2000, Phaser.Easing.Bounce.Out, true, 0, false, false);
    //whaleouttween.onComplete.addOnce(this.destroySprite, this);
    gameovertimer = game.time.create(true);
    gameovertimer.add(1600, this.gameOver, this);
    gameovertimer.start();
    
},
     
gameOver: function() {


    game.time.events.add(Phaser.Timer.SECOND * 2.5, this.restartgamechange, this).autoDestroy = true;


    var gameoverlayer = game.add.group();    
    this.startgametap = game.add.button(0, 0, 'startgametap', this.startMenu, this);  

    this.startgametap.fixedToCamera = true;
    this.gameoveroverlay = game.add.tileSprite(0, 0, 3200, 3200, 'black50percent');
    this.whiteline = game.add.sprite(0, 0, 'whiteline');
    this.whiteline.anchor.setTo(0.5, 0.5);
    this.whiteline.position.setTo(660, 360);
    this.whale.kill(); 
    //game.time.events.add(4000, this.whale.kill(), this).autoDestroy = true;
    this.finalmilestraveledscore = (game.global.milestraveled*100);
    this.finalcoinscollectedscore = (game.global.krillcollected);
    this.finalairbonusscore = (game.global.boostbonus);
    this.finalbeachbonus = (game.global.beachbonus);
    
    this.milestraveled = game.add.text(game.world.centerX-400, 150, 'Miles Traveled (x100)' ,{ font: '400 36px Source Sans Pro',  fill: 'white', align: 'left' });

    this.krillcollected = game.add.text(game.world.centerX-400, 200, 'Point Orbs Collected (x1000)' ,{ font: '400 36px Source Sans Pro',  fill: 'white', align: 'left' });
    this.boostbonus = game.add.text(game.world.centerX-400, 250, 'Airtime Bonus' ,{ font: '400 36px Source Sans Pro',  fill: 'white', align: 'left' });
    this.beachbonus = game.add.text(game.world.centerX-400, 300, 'Beach Bonus' ,{ font: '400 36px Source Sans Pro',  fill: 'white', align: 'left' });
    this.totaltext = game.add.text(game.world.centerX-400, 380, 'Total' ,{ font: '400 36px Source Sans Pro',  fill: 'white', align: 'left' });

    this.restarttext = game.add.text(game.world.centerX-200, 460, 'Tap to restart!' ,{ font: '700 42px Source Sans Pro',  fill: 'white', align: 'center' });

    this.milestravelednumber = game.add.text(game.world.centerX+160, 150, ' ' + (this.finalmilestraveledscore) ,{ font: '400 36px Source Sans Pro',  fill: 'white', align: 'right' });
    this.krillcollectednumber = game.add.text(game.world.centerX+160, 200, ' ' + (this.finalcoinscollectedscore) ,{ font: '400 36px Source Sans Pro',  fill: 'white', align: 'right' });
    this.boostbonusnumber = game.add.text(game.world.centerX+160, 250, ' ' + (this.finalairbonusscore) ,{ font: '400 36px Source Sans Pro',  fill: 'white', align: 'right' });
    this.beachbonusnumber = game.add.text(game.world.centerX+160, 300, ' ' + (this.finalbeachbonus) ,{ font: '400 36px Source Sans Pro',  fill: 'white', align: 'right' });    
    this.totalscorenumber = game.add.text(game.world.centerX+220, 380, ' ' + ((this.finalbeachbonus)+(this.finalairbonusscore)+(this.finalcoinscollectedscore)+(this.finalmilestraveledscore)) ,{ font: '400 54px Source Sans Pro',  fill: '#fdb232', align: 'right' }); 
    this.totalscorenumber.anchor.setTo(1, 0);
    
    this.milestraveled.fixedToCamera = true;
    this.krillcollected.fixedToCamera = true;
    this.boostbonus.fixedToCamera = true;
    this.beachbonus.fixedToCamera = true;
    this.totaltext.fixedToCamera = true;
    this.restarttext.fixedToCamera = true;
    this.milestravelednumber.fixedToCamera = true;
    
    this.krillcollectednumber.fixedToCamera = true;
    this.boostbonusnumber.fixedToCamera = true;
    this.beachbonusnumber.fixedToCamera = true;
    this.totalscorenumber.fixedToCamera = true;
    this.gameoveroverlay.fixedToCamera = true;
    this.whiteline.fixedToCamera = true;
    
    
    
    
 finalscore = (this.finalbeachbonus)+(this.finalairbonusscore)+(this.finalcoinscollectedscore)+(this.finalmilestraveledscore);

        if (!localStorage.getItem('bestScore')) { localStorage.setItem('bestScore', 0);
}
    
if (finalscore > localStorage.getItem('bestScore')) { localStorage.setItem('bestScore', finalscore);
                                                     besthighscore = localStorage.getItem('bestScore');
}
    
    
//this.randomad = adsArray[game.rnd.integerInRange(0, 3)];
console.log(game.rnd.integerInRange(0, 3));
document.getElementById('theAdZone').style.display = 'block';
        //this.ad = game.add.button(0, 560, this.randomad.name, this.displayAd, this);
       this.twitterpost = game.add.button(game.world.centerX+60, 20, 'tweet', this.tweetscore, this);
    
    
      this.twitterpost.input.useHandCursor = true;
    this.twitterpost.fixedToCamera = true;
    
    
    
    //this.ad.input.useHandCursor = true;
    //this.ad.fixedToCamera = true;
   
        gameoverlayer.add(this.gameoveroverlay); 
        gameoverlayer.add(this.milestraveled); 
        gameoverlayer.add(this.krillcollected);   
        gameoverlayer.add(this.boostbonus); 
        gameoverlayer.add(this.beachbonus);   
        gameoverlayer.add(this.totaltext); 
        gameoverlayer.add(this.milestravelednumber);   
        gameoverlayer.add(this.krillcollectednumber); 
        gameoverlayer.add(this.boostbonusnumber);   
        gameoverlayer.add(this.beachbonusnumber); 
        gameoverlayer.add(this.totalscorenumber);   
     
    gameoverlayer.add(this.restarttext);     

        gameoverlayer.add(this.whiteline);   
        //gameoverlayer.add(this.ad);
    //gameoverlayer.add(this.twitterpost);
    
    this.game.add.tween(gameoverlayer).from( { y:800, alpha: 0 }, 1000, Phaser.Easing.Cubic.InOut, true, 0, 0, false);  



},    


    
    
displayAd: function (adurl) { window.open(this.randomad.url,'_blank');},  
    
tweetscore: function (adurl) { window.open('https://twitter.com/intent/tweet?text=Can+you+beat+my+high+score+on+Whale+Jail?+I+got+'+besthighscore+'!+%23whalejail http://www.whalejail.com','_blank');},      
 
startMenu: function() { 
    game.state.start('play');
}, 
 
render: function() {

}
 
};