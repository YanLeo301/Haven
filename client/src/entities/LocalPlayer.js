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

        this.network = network;

        this.speed = playerSpeed;
    }

    setId(id)
    {
        this.id = id;
        console.log("Local player id set to: ", id);
    }

    update()
    {
        var vx = 0, vy = 0;

        if (this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) 
        {
            vy = -this.speed;
        }
        if (this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) 
        {
            vx = -this.speed;
        }
        if (this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) 
        {
            vy = this.speed;
        }
        if (this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) 
        {
            vx = this.speed;
        }

        this.body.setVelocity(vx, vy);

        if (vx != 0 || vy != 0)
        {
            this.network.send(JSON.stringify({
                type: "PLAYER_POS",
                x: this.body.position.x,
                y: this.body.position.y
            })); 
        }
    }
}