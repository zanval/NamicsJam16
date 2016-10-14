class Preloader extends Phaser.State {

    constructor() {
        super();
        this.asset = null;
        this.ready = false;
    }

    preload() {
        //setup loading bar
        this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
        this.load.setPreloadSprite(this.asset);

        //Setup loading and its events
        //this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.loadResources();
    }

    update() {
        // if (this.ready) {
        this.game.state.start('level');
        // }
    }

    loadResources() {
        // load your resources here
        this.game.load.spritesheet('bricksspritesheet', 'assets/bricks.png', 64, 32, 20, 1, 1);
        this.game.load.image('castle', 'assets/backgrounds/uncolored_castle.png');
        this.game.load.image('desert', 'assets/backgrounds/uncolored_desert.png');
        this.game.load.image('forest', 'assets/backgrounds/uncolored_forest.png');
        this.game.load.image('hills', 'assets/backgrounds/uncolored_hills.png');
        this.game.load.image('peaks', 'assets/backgrounds/uncolored_peaks.png');
        this.game.load.image('piramids', 'assets/backgrounds/uncolored_piramids.png');
        this.game.load.image('plain', 'assets/backgrounds/uncolored_plain.png');
        this.game.load.image('talltrees', 'assets/backgrounds/uncolored_talltrees.png');
        this.game.load.image('paddle', 'assets/paddle.png');
        this.game.load.image('ball', 'assets/ball.png');

        this.game.load.audio('paddleSound', 'assets/sounds/zap1.ogg');
        this.game.load.audio('normalBrickSound', 'assets/sounds/tone1.ogg');
        this.game.load.audio('solidBrickSound', 'assets/sounds/pepSound4.ogg');
        this.game.load.audio('multyBrickSound', 'assets/sounds/zapThreeToneDown.ogg');
    }

    onLoadComplete() {
        this.ready = true;
    }
}

export default Preloader;
