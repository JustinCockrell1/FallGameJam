import { Game, Screen, TilemapWorld, Entity, TileMap, Tile, Graphics } from "watawaeengine";
import Rectangle from "./Rectangle";
import Grenen from "./Grenen";
import {Vector2d} from "watawaeengine";
import Circle from "./Circle";
import AARectangle from "./AARectangle";
import GrassTile from "./Tiles/GrassTile";
import Stairs from "./Stairs";
import Player from "./Entities/Player";
import Obstacle from "./Entities/Obstacle";



export default class MyGame extends Game {

    screen:Screen;
    world:TilemapWorld;
    selectedEntity:Entity | null = null;
    mouseOffset:Vector2d = new Vector2d(0,0);
    mouse:Vector2d = new Vector2d(0,0);
    stairs: Stairs;
    depth:number;
    stairW:number;
    stairX:number;
    stairH:number;
    player:Player;
    obstacles:Obstacle[];


    constructor(root:HTMLElement|null) {
        super();

        const canvas:HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
        canvas.style.position="fixed";
        canvas.style.left="0px";
        canvas.style.top="0px";
        const ctx:CanvasRenderingContext2D = canvas.getContext("2d")!;
        this.screen = new Screen(ctx, 0,0,1,1,10,this.screenH);


        this.world = new TilemapWorld( new TileMap(0,0,[],10,10));

        // this.world.addEntity(new Rectangle(2,1, 1,1 ));
        this.world.addEntity(new Rectangle(4,3, 1,1 ));
        this.world.addEntity(new Circle(5,6, .5, 0, 0 ));
        // this.world.addEntity(new Rectangle(3,2, 1,1 ));
        this.world.addEntity(new AARectangle(6,2, 1,1 ));
        this.world.addEntity(new AARectangle(7,4, 1,1 ));
        // this.world.addEntity(new Circle(5,6, .5, 0, 0 ));
        // this.world.addEntity(new Circle(5,6, .5, 0, 0 ));
        this.stairs = new Stairs(1000);
        this.depth = 0;
        // this.world.entities[0].rotate(1);
        // this.world.entities[1].rotate(.5);
        // this.world.addEntity(new Grenen(3, 3, 1, 1, 15, 15));
        this.player = new Player(3, 3, .5);
        this.obstacles = [];
        this.obstacles[0]=new Obstacle(2, 1, 1, 1);

        this.stairW = 0;
        this.stairX = 0;
        this.stairH = 0;

        Graphics.add("player", "../images/guy1.png");
        Graphics.add("player2", "../images/guy2.png");
        Graphics.add("player3", "../images/guy3.png");
        Graphics.add("obstacle", "../images/obstacle.png");

    }

    update(elapsedTime: number, controllers: any): void {
        // this.world.entities[0].rotate(.01);



        if(this.getKey(".").pressed) {
            this.settings.debugMode=!this.settings.debugMode;
        }

        if(this.settings.debugMode) {
            if(this.getKey("z").held) {
                this.screen.zoomIn(1, elapsedTime);
            }
            if(this.getKey("x").held) {
                this.screen.zoomOut(1, elapsedTime);
            }
            if(this.getKey("f").held) {
                this.screen.camera.x-=1*elapsedTime;
            }
            if(this.getKey("g").held) {
                this.screen.camera.x+=1*elapsedTime;
            }
            if(this.getKey("t").held) {
                this.screen.camera.y-=.4*elapsedTime;
            }
            if(this.getKey("r").held) {
                this.screen.camera.y+=1*elapsedTime;
            }
        }

        if(this.getKey("a").held) {
            this.player.moveBy(new Vector2d(-1, 0).scale(elapsedTime));
        }
        if(this.getKey("d").held) {
            this.player.moveBy(new Vector2d(1, 0).scale(elapsedTime));
        }

        this.player.tick(elapsedTime);


        // this.world.render(this.screen);
        this.screen.drawBackground();

        const vanishingPoint = new Vector2d(4.5, 4);

        const numOfStairs = 100;
        let depth = 0;//.3*numOfStairs;//5*10;
        let change = .5;

        let x = 2;
        let y = 7;
        let w = 4;
        let h = .5;
        for(let i = 0; i <numOfStairs;i++) {
            const height = .5-(0.1*i);

            // this.screen.strokePolygon([new Vector2d(4, 7), new Vector2d(5, 7), new Vector2d(5, 7.5), new Vector2d(4, 7.5)], "black");
            this.screen.strokeRect(x+this.stairX, y+this.depth, w+this.stairW ,h+this.stairH, "black");
            // this.screen.fillIsometricShape([new Vector2d(4, 7), new Vector2d(5, 7), new Vector2d(5, 7.5), new Vector2d(4, 7.5)],4.5, 4, depth+this.depth);
            const oldW = w;
            w*=.95;
            h*=.95;
            y-=h;
            x+=(oldW-w)/2;
            // depth-=.1;

        }
        this.screen.fillCircle(4.5, 4, .1, "red")

        this.player.render(this.screen);
        this.obstacles[0].render(this.screen);
        this.stairX/=(.95*elapsedTime);
        this.stairW/=(.95*elapsedTime);
        this.depth+=this.stairH*elapsedTime;


    }

    mouseDown(x: number, y: number): void {
        const pos = this.screen.getWorldPosFromScreen(x, y);

        console.log(pos);

        if(this.settings.debugMode) {
        this.world.tilemap.setTile(Math.floor(pos.x), Math.floor(pos.y), new GrassTile());
        }

        // console.log(this.world.getEntitiesOverlappingPoint(pos.x, pos.y));
        if(this.selectedEntity){
            this.selectedEntity = null;
        }
        else {

        this.selectedEntity = this.world.getEntitiesOverlappingPoint(pos.x, pos.y)[0];
        if(this.selectedEntity) {
            console.log(this.selectedEntity.pos, this.selectedEntity.size);

        this.mouseOffset = new Vector2d(pos.x, pos.y).sub(this.selectedEntity.pos);
        }
        }

    }

    mouseMove(x: number, y: number): void {
        const pos = this.screen.getWorldPosFromScreen(x, y);
        this.mouse.x = pos.x;
        this.mouse.y = pos.y;
    }

    mouseUp(x: number, y: number): void {
        const pos = this.screen.getWorldPosFromScreen(x, y);

    }




}
