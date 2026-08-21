import Phaser from 'phaser'

const nodeRadius = 5;
const nodeColor = 0xffffff;

const WORLD_CATEGORY = 0x0001;
const PLAYER_CATEGORY = 0x0002;
const DRONE_CATEGORY = 0x0004;
const NODE_CATEGORY = 0x0008;

export default class Node extends Phaser.GameObjects.Arc
{
    constructor(scene, x, y)
    {
        super(scene, x, y, nodeRadius, 0, 360, false, nodeColor, 1)

        scene.add.existing(this);

        scene.matter.add.gameObject(this);

        this.body.circleRadius = nodeRadius;
        this.body.collisionFilter.category = NODE_CATEGORY;
        this.body.collisionFilter.mask = DRONE_CATEGORY | WORLD_CATEGORY | NODE_CATEGORY;
    }
}