import { Entity, PhysicsObject2D, Screen, Vector2d } from "watawaeengine";
import { HitboxType } from "watawaeengine";

export default class AARectangle extends Entity {
    constructor(public x:number, public y:number, public w:number, public h:number, public vx:number=0, public vy:number=0) {
        super([new Vector2d(x, y),new Vector2d(x+w, y),new Vector2d(x+w, y+h),new Vector2d(x, y+h)], vx, vy, HitboxType.AARectangle);


    }
    render(screen: Screen): void {
        let color = this.inCollision ? "red" : "yellow";

        const center = this.getCenter();
        // screen.fillPolygon(this.points, color);
        screen.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y, color);
        screen.fillCircle(center.x, center.y, this.size.x/10, "green");
    }

    onCollision(pObject: PhysicsObject2D): void {
        const entity = pObject as Entity;

        if(entity.name=="Grenen") {
            this.x=500;
        }
    }
}
