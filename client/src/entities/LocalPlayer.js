import Phaser from 'phaser'

const playerWidth = 20;
const playerHeight = 20;
const playerColor = 0xffffff;
const playerSpeed = 300;

export default class LocalPlayer extends Phaser.GameObjects.Rectangle // -> Phaser.GameObjects.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, playerWidth, playerHeight, playerColor);

        scene.add.existing(this);

        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setSize(playerWidth, playerHeight);

        this.wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.speed = playerSpeed;
    }

    // TODO: send input to server
    update()
    {
        var vx = 0, vy = 0;

        if (this.wKey.isDown) 
        {
            vy = -this.speed;
        }
        if (this.aKey.isDown) 
        {
            vx = -this.speed;
        }
        if (this.sKey.isDown) 
        {
            vy = this.speed;
        }
        if (this.dKey.isDown) 
        {
            vx = this.speed;
        }

        this.body.setVelocity(vx, vy);
    }
}