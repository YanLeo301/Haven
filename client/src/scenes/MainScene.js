import Phaser from 'phaser'
import LocalPlayer from '../entities/LocalPlayer'

export default class MainScene extends Phaser.Scene
{
    constructor(network)
    {
        super('MainScene');
        this.localPlayer = null;
        this.remotePlayers = [];
        this.network = network;
    }
    
    create()
    {
        this.cameras.main.setBackgroundColor('#1a1a2e');
        this.localPlayer = new LocalPlayer(this, 400, 300, this.network);
    }

    update()
    {
        if (this.localPlayer)
        {
            this.localPlayer.update();
        }
    }
}