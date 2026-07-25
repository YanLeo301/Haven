import Phaser from 'phaser'

const playerWidth = 20;
const playerHeight = 20;
const playerColor = 0xffffff;
const playerSpeed = 300;

export default class LocalPlayer extends Phaser.GameObjects.Rectangle // -> Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, network)
    {
        super(scene, x, y, playerWidth, playerHeight, playerColor);

        scene.add.existing(this);

        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setSize(playerWidth, playerHeight);

        this.network = network;

        this.wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.speed = playerSpeed;
    }

    update()
    {
        const input =
        {
            left: this.aKey.isDown,
            right: this.dKey.isDown,
            up: this.wKey.isDown,
            down: this.sKey.isDown
        };

        var vx = 0, vy = 0;

        if (input.up) 
        {
            vy = -this.speed;
        }
        if (input.left) 
        {
            vx = -this.speed;
        }
        if (input.down) 
        {
            vy = this.speed;
        }
        if (input.right) 
        {
            vx = this.speed;
        }

        this.body.setVelocity(vx, vy);

        //TODO: fix this
        // this.network.send(JSON.stringify({
        //     type: "PLAYER_POS",
        //     x: this.body.position.x,
        //     y: this.body.position.y
        // }));
    }
}