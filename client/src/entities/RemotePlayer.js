import Phaser from 'phaser'

const remotePlayerWidth = 20;
const remotePlayerHeight = 20;
const remotePlayerColor = 0xff0000;

export default class RemotePlayer extends Phaser.GameObjects.Rectangle // -> Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, id, messageHandler)
    {
        super(scene, x, y, remotePlayerWidth, remotePlayerHeight, remotePlayerColor);

        scene.add.existing(this);

        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

        this.id = id;
        this.messageHandler = messageHandler;

        this.messageHandler.addEventListener(
            "gameState",
            (event) =>
            {
                const map = event.detail.gameStateMap;

                for (const [key, value] of Object.entries(map))
                {
                    if (key === this.id)
                    {
                        this.x = value.x;
                        this.y = value.y;
                    }
                }
            }
        )
    }

    update()
    {
        this.setPosition(this.x, this.y);
    }
}