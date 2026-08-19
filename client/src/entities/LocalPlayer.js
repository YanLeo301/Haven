import Phaser from 'phaser'

//TODO: find the best feeling values
const playerRadius = 20;
const playerColor = 0xffffff;
const playerSpeed = 5;

const droneRadius = 5;
const droneSeparationDistance = 5;
const attractionStrength = 0.000002;

const PLAYER_CATEGORY = 0x0001;
const DRONE_CATEGORY = 0x0002;

export default class LocalPlayer extends Phaser.GameObjects.Arc
{
    constructor(scene, x, y, network)
    {
        super(scene, x, y, playerRadius, 0, 360, false, 0x000000, 1);

        scene.add.existing(this);
        scene.matter.add.gameObject(this);

        this.body.circleRadius = playerRadius;
        this.body.collisionFilter.category = PLAYER_CATEGORY;
        this.body.collisionFilter.mask = PLAYER_CATEGORY;
        
        this.network = network;

        this.speed = playerSpeed;

        this.keys = scene.input.keyboard.addKeys('W,A,S,D');

        this.drones = [];

        for (let i = 0; i < 20; i++) this.addDrone();
    }
    
    setId(id)
    {
        this.id = id;
        console.log("Local player id set to: ", id);
    }

    addDrone() 
    {
        const spawnAngle = Phaser.Math.FloatBetween(0, Math.PI * 2);
        const spawnDist = Phaser.Math.FloatBetween(playerRadius, playerRadius + 30);

        const drone = this.scene.add.circle(
            this.x + Math.cos(spawnAngle) * spawnDist,
            this.y + Math.sin(spawnAngle) * spawnDist,
            droneRadius,
            playerColor
        )

        this.scene.matter.add.gameObject(
            drone,
            {shape: 
            {
                type: 'circle',
                radius: droneRadius + 3
            }}
        );
        drone.body.circleRadius = droneRadius;

        drone.setBounce(1);
        drone.setFrictionAir(Phaser.Math.FloatBetween(0.03, 0.06));
        drone.setMass(Phaser.Math.FloatBetween(0.8, 1.2));

        drone.body.collisionFilter.category = DRONE_CATEGORY;
        drone.body.collisionFilter.mask = DRONE_CATEGORY;

        this.drones.push(drone);
    }

    // TODO: make it feel more dynamic
    updateSwarm()
    {
        for (const drone of this.drones)
        {
            const dx = this.x - drone.x;
            const dy = this.y - drone.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > playerRadius)
            {
                const dirX = dx / distance;
                const dirY = dy / distance;

                let forceMagnitude = (distance - playerRadius) * attractionStrength;

                const maxForce = 0.005;
                forceMagnitude = Math.min(forceMagnitude, maxForce);

                drone.applyForce({x: dirX * forceMagnitude, y: dirY * forceMagnitude});
            }
        }
    }

    update()
    {
        var vx = 0, vy = 0;

        if (this.keys.W.isDown) vy = -this.speed;
        if (this.keys.A.isDown) vx = -this.speed;
        if (this.keys.S.isDown) vy = this.speed;
        if (this.keys.D.isDown) vx = this.speed;

        this.setVelocity(vx, vy);

        this.updateSwarm();

        //TODO: only send when position changes, but send spawn position
        this.network.send(JSON.stringify({
            type: "PLAYER_POS",
            x: this.body.position.x,
            y: this.body.position.y
        })); 
    }
}