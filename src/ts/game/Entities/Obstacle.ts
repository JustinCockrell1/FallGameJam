
import Rectangle from "../Rectangle";
import { Graphics, Screen } from "watawaeengine";

export default class Obstacle extends Rectangle {
    constructor(x:number, y:number, w:number, h:number) {
        super(x, y, w, h);
    }

    render(screen: Screen): void {
        screen.drawImage(this.pos.x, this.pos.y, this.size.x, this.size.y, Graphics.get("obstacle"));

    }
}
