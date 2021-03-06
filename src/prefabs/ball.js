class Ball extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y, "ball");
        this.origWidth = this.scale.x;
        this.origHeight = this.scale.y;

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.anchor.set(0.5);
        this.checkWorldBounds = true;

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.collideWorldBounds = true;
        this.body.bounce.set(1);
        this.setVelocity();
        this.initInput();
        this.initSound();

        let ballLostSound;

    }

    initInput() {
        this.inputEnabled = true;
        this.ballSizeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.pad1 = this.game.input.gamepad.pad1;
    }

    initSound() {
        this.ballLostSound = this.game.add.audio('ballLostSound');
    }

    update() {
        this.updateInput();
    }

    updateInput() {
        if (this.ballSizeKey.isDown || this.pad1.isDown((Phaser.Gamepad.XBOX360_A))) {
            this.enlargeBall();
        }
        else if (this.ballSizeKey.isUp || !this.pad1.isDown((Phaser.Gamepad.XBOX360_A))) {
            this.shrinkBall();
        }
    }

    enlargeBall() {
        if (this.scale.x < 4) {
            this.scale.x = this.scale.x + 0.2;
            this.scale.y = this.scale.y + 0.2;
        }
    }

    shrinkBall() {
        if (this.scale.x > this.origWidth) {
            this.scale.x = this.scale.x - 0.1;
            this.scale.y = this.scale.y - 0.1;
        }
    }

    resetBall() {
        this.reset(this.game.canvas.width / 2, this.game.canvas.height - 100 - this.width);
        this.setVelocity();
    }

    setVelocity() {
        this.body.velocity.y = -300;
        this.body.velocity.x = -75;
    }

    duplicateBall() {
        var newBall = new Ball(this.game, this.x, this.y);
        newBall.body.velocity.x = -this.body.velocity.x;
        return newBall;
    }
}
export default Ball;
