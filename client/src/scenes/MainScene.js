import Phaser from 'phaser'
import LocalPlayer from '../entities/LocalPlayer'
import MessageHandler from '../network/MessageHandler';

export default class MainScene extends Phaser.Scene
{
    constructor(network, messageHandler)
    {
        super('MainScene');
        this.localPlayer = null;
        this.remotePlayers = [];
        this.network = network;
        this.messageHandler = messageHandler;
    }
    
    create()
    {
        this.cameras.main.setBackgroundColor('#1a1a2e');
        this.localPlayer = new LocalPlayer(this, 400, 300, this.network);

        this.messageHandler.addEventListener(
            "connection",
            (event) =>
            {
                this.localPlayer.setId(event.detail.id);
            }
        );
    }

    update()
    {
        if (this.localPlayer)
        {
            this.localPlayer.update();
        }
    }
}