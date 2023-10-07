import { Entity, PhysicsObject2D, Screen, Vector2d } from "watawaeengine";
import { HitboxType } from "watawaeengine";

export default class Circle extends Entity {
    constructor(public x:number, public y:number, public w:number, public vx:number=0, public vy:number=0) {
        super([new Vector2d(x, y)], vx, vy, HitboxType.Circle);
        this.size.x=w;
        this.size.y=w;
        this.pos = this.pos.sub(this.size);
        this.acceleration.y= 0;
    }
    render(screen: Screen): void {
        let color = this.inCollision ? "red" : "yellow";

        // screen.fillRect(this.x, this.y, this.w, this.h, color);
        screen.fillCircle(this.points[0].x, this.points[0].y, this.size.x, "green");
        screen.strokeRect(this.pos.x, this.pos.y, this.size.x*2, this.size.y*2, "red");
    }

    onCollision(pObject: PhysicsObject2D): void {
        const entity = pObject as Entity;

        if(entity.name=="Grenen") {
            this.x=500;
        }


    }
}
