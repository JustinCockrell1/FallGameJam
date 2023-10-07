import { Screen } from "watawaeengine";

export default class Stairs {

    constructor(
        public numberOfStairs = 10,
        public a = 1,
    ) {

    }

    render(screen:Screen) {
        for(let i = this.numberOfStairs; i >= 0; i--) {
        screen.fillRect(5+(i/10)-(this.a/2),5+(10/i)+this.a,5-(i/5)+this.a,.5, "white");
        screen.strokeRect(5+(i/10)-(this.a/2),5+(10/i)+this.a,5-(i/5)+this.a,.5, "black");
        }
    }
}
