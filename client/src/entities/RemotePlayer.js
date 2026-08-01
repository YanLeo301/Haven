import Phaser from 'phaser'

const remotePlayerWidth = 20;
const remotePlayerHeight = 20;
const remotePlayerColor = 0xff0000;

export default class RemotePlayer extends Phaser.GameObjects.Rectangle // -> Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, network)
    {
        super(scene, x, y, remotePlayerWidth, remotePlayerHeight, remotePlayerColor);

        scene.add.existing(this);

        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

        this.network = network;
    }

    setId(id)
    {
        this.id = id;
        console.log("Remote player id set to: ", id);
    }

    update()
    {
        //TODO: update positon with data from server
    }
}