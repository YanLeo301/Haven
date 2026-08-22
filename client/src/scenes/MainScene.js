import Phaser from 'phaser'
import LocalPlayer from '../entities/LocalPlayer'
import MessageHandler from '../network/MessageHandler'
import RemotePlayer from '../entities/RemotePlayer'
import Node from '../entities/Node'

const WORLD_CATEGORY = 0x0001;
const PLAYER_CATEGORY = 0x0002;
const DRONE_CATEGORY = 0x0004;
const NODE_CATEGORY = 0x0008;

//TODO: on collision of node and player drone, node should be destroyed and player gets new drone
export default class MainScene extends Phaser.Scene
{
    constructor(network, messageHandler)
    {
        super('MainScene');
        this.localPlayer = null; // stores LocalPlayer object
        this.remotePlayers = new Map(); // maps remote players ids to objects
        this.nodes = new Map();
        this.network = network;
        this.messageHandler = messageHandler;
    }
    
    create()
    {
        this.cameras.main.setBackgroundColor('#202020');
        
        this.messageHandler.addEventListener(
            "nodePos",
            (event) =>
            {
                const receivedNodeMap = event.detail.nodeMap;

                for (const [id, node] of Object.entries(receivedNodeMap))
                {
                    const newNode = new Node(this, node.x, node.y);
                    this.nodes.set(id, newNode);
                }
            }
        )
        
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
        
        this.localPlayer = new LocalPlayer(this, 400, 300, this.network);
        this.messageHandler.addEventListener(
            "connection",
            (event) =>
            {
                this.localPlayer.setId(event.detail.id);
            }
        );

        //TODO: finish this or handle this on backend
        this.matter.world.on(
            'collisionstart',
            (event) =>
            {
                event.pairs.forEach(
                    (pair) =>
                    {
                        const objA = pair.bodyA.gameObject;
                        const objB = pair.bodyB.gameObject;

                        const catA = pair.bodyA.collisionFilter.category;
                        const catB = pair.bodyB.collisionFilter.category;

                        if (catA === DRONE_CATEGORY && catB === NODE_CATEGORY)
                        {

                        }
                    }
                )
            }
        )
    }

    update()
    {
        if (this.localPlayer)
        {
            this.localPlayer.update();
        }
    }
}