import Constants from '../util/constants';
import BricksBuilder from '../builders/bricksbuilder'
import Utils from '../util/utils';
import Paddle from '../prefabs/paddle';
import Ball from '../prefabs/ball';

class Level extends Phaser.State {

    constructor() {
        super();
    }

    preload() {
        Utils.loadRandomBackground(this.game);
        this.addBasicGroups();
        new BricksBuilder(this, this.bricksGroup).addBricks();
        this.game.add.existing(this.rootGroup);
    }

    create() {
        this.addPaddle();
        this.addBall();
    }

    update() {
        this.game.physics.arcade.collide(this.ballGroup, this.playerGroup, this.ballHitPaddle, null, this);
        this.game.physics.arcade.collide(this.ballGroup, this.bricksGroup, this.ballHitBrick, null, this);
    }

    endGame() {
        this.game.state.start('gameover');
    }

    addBasicGroups() {
        this.rootGroup = this.game.add.group('', Constants.GROUP_ROOT);
        this.uiGroup = this.game.add.group(Constants.GROUP_ROOT, Constants.GROUP_UI);
        this.bricksGroup = this.game.add.group(Constants.GROUP_ROOT, Constants.GROUP_BRICKS);
        this.playerGroup = this.game.add.group(Constants.GROUP_ROOT, Constants.GROUP_PLAYER);
        this.ballGroup = this.game.add.group(Constants.GROUP_ROOT, Constants.GROUP_BALL);

    }

    ballHitPaddle() {
        console.log('Treffer !');
    }

    ballHitBrick(ball, brick) {
        this.destroyBrick(brick);
    }

    destroyBrick(brick) {
        brick.destroy();
        console.log(this.bricksGroup.children.length );
        if (this.bricksGroup.children.length == 0){
            this.endGame();
        }
    }

    addPaddle() {
        var paddle = new Paddle(this.game, this.game.canvas.width / 2, this.game.canvas.height - 100);
        this.playerGroup.add(paddle);
    }

    addBall() {
        let ball = new Ball(this.game, 0, 0);
        this.ballGroup.add(ball)
    }
}

export default Level;
