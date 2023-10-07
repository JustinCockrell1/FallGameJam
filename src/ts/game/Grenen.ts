import { Entity, PhysicsObject2D, Screen } from "watawaeengine";
import { HitboxType } from "watawaeengine";

export default class Grenen extends Entity {
    constructor(public x:number, public y:number, public w:number, public h:number, public vx:number=0, public vy:number=0) {
        super([], vx, vy, HitboxType.Circle);
        this.name="Grenen";
    }

    afterTick(elapsedTime: number): void {
        if(this.x>10) {
            this.vx*=-1;
            this.x=10;
        }
        if(this.y>10) {
            this.y=10;
            this.vy*=-1;
        }
        if(this.x<=0) {
            this.x=0;
            this.vx*=-1;
        }
        if(this.y<=0) {
            this.y=0;
            this.vy*=-1;
        }
    }

    render(screen: Screen): void {
        let color = "green";
        screen.fillCircle(this.x, this.y, this.w, color);
    }

    onCollision(pObject: PhysicsObject2D): void {

    }
}
