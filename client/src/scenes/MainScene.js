import Phaser from 'phaser'
import LocalPlayer from '../entities/LocalPlayer'

export default class MainScene extends Phaser.Scene
{
    constructor()
    {
        super('MainScene');
        this.localPlayer = null;
    }
    
    create()
    {
        this.cameras.main.setBackgroundColor('#1a1a2e');
        this.localPlayer = new LocalPlayer(this, 400, 300);
    }

    update()
    {
        if (this.localPlayer)
        {
            this.localPlayer.update();
        }
    }
}