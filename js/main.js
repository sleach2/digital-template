window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        //game.load.image( 'logo', 'assets/phaser.png' );
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('dog', 'assets/dog.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.audio('boden', 'assets/audio/bodenstaendig_2000_in_rock_4bit.mp3');
    }
    
    //var bouncy;
    var platforms;
    var player;
    var score = 0;
    var scoreText;
    var cursors;
    var dogs;
    
    function create() {
        var music=game.add.audio('boden');
        music.play();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,'sky');
        platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        cursors = game.input.keyboard.createCursorKeys();
        dogs = game.add.group();
        dogs.enableBody = true;
        for (var i = 0; i < 6; i++){
        var dog = dogs.create(i*140, 0, 'dog');
        dog.body.gravity.y = 75;
        }
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }
    
    function update() {
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.overlap(player, dogs, collectDogs, null, this);
        player.body.velocity.x = 0;
        if (cursors.left.isDown){
            player.body.velocity.x = -250;
            player.animations.play('left');
        }else if (cursors.right.isDown){
            player.body.velocity.x = 250;
            player.animations.play('right');
        }else{
            player.animations.stop();
            player.frame = 4;
        }
        if (cursors.up.isDown && player.body.touching.down){
            player.body.velocity.y = -350;
        }
    }

    function collectDogs(player, dog) {
    dog.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
    }
};
