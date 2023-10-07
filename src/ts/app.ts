import MyGame from "./game/game";

const game = new MyGame(document.getElementById("canvas"));
game.setUpEventListeners();
game.start();

const a = new WebSocket("ws://localhost:8080");

class Test {
    a:number = 5;
    b:number = 5;
}

a.onopen = function(ev:Event) {
    console.log(ev);
    const test = new Test();
    a.send(JSON.stringify(test));
}
