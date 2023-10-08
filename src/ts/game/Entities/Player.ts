
import Circle from "../Circle";
import { Graphics, Screen, Animation } from "watawaeengine";

export default class Player extends Circle {
    animation:Animation;
    constructor(x:number, y:number, w:number) {
        super(x, y, w);
        this.animation = new Animation([{name:"player", time:.1},{name:"player2", time:.1},{name:"player3", time:.1}]);
    }

    render(screen: Screen): void {
        screen.drawImage(this.pos.x, this.pos.y, this.size.x*2, this.size.y*2, Graphics.get(this.animation.get()));
        // super.render(screen);
    }

    tick(elapsedTime:number) {
        super.tick(elapsedTime);
        this.animation.tick(elapsedTime);

    }

}


