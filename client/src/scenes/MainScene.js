import Phaser from 'phaser'
import LocalPlayer from '../entities/LocalPlayer'
import MessageHandler from '../network/MessageHandler';
import RemotePlayer from '../entities/RemotePlayer';

export default class MainScene extends Phaser.Scene
{
    constructor(network, messageHandler)
    {
        super('MainScene');
        this.localPlayer = null; // stores LocalPlayer object
        this.remotePlayers = new Map(); // maps remote players ids to objects
        this.network = network;
        this.messageHandler = messageHandler;
    }
    
    create()
    {
        this.cameras.main.setBackgroundColor('#202020');
        this.localPlayer = new LocalPlayer(this, 400, 300, this.network);

        this.messageHandler.addEventListener(
            "connection",
            (event) =>
            {
                this.localPlayer.setId(event.detail.id);
            }
        );
        
        this.messageHandler.addEventListener(
            "playerPos",
            (event) =>
            {
                const map = event.detail.playerMap;
                
                for (const id of this.remotePlayers.keys())
                {
                    if (!Object.hasOwn(map, id))
                    {
                        const goneRemotePlayer = this.remotePlayers.get(id);
                        goneRemotePlayer.remove();
                        this.remotePlayers.delete(id);
                        console.log("RemotePlayer removed");
                    }
                }

                for (const [key, value] of Object.entries(map))
                {
                    if (key === this.localPlayer.id) continue;

                    if (!this.remotePlayers.has(key))
                    {
                        const newRemotePlayer = new RemotePlayer(this, value.x, value.y, key, this.messageHandler);
                        this.remotePlayers.set(key, newRemotePlayer);
                    }
                }
            }
        )

        //TODO: receive nodePosMessage and create nodes
    }

    update()
    {
        if (this.localPlayer)
        {
            this.localPlayer.update();
        }
    }
}