import { Game, Screen, TilemapWorld, Entity, TileMap, Tile } from "watawaeengine";
import Rectangle from "./Rectangle";
import Grenen from "./Grenen";
import {Vector2d} from "watawaeengine";
import Circle from "./Circle";
import AARectangle from "./AARectangle";
import GrassTile from "./Tiles/GrassTile";
import Stairs from "./Stairs";



export default class MyGame extends Game {

    screen:Screen;
    world:TilemapWorld;
    selectedEntity:Entity | null = null;
    mouseOffset:Vector2d = new Vector2d(0,0);
    mouse:Vector2d = new Vector2d(0,0);
    stairs: Stairs;

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

        // this.world.entities[0].rotate(1);
        // this.world.entities[1].rotate(.5);
        // this.world.addEntity(new Grenen(3, 3, 1, 1, 15, 15));

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
                this.screen.camera.y-=1*elapsedTime;
            }
            if(this.getKey("r").held) {
                this.screen.camera.y+=1*elapsedTime;
            }
        }


        if(this.selectedEntity) {
            // this.selectedEntity.move(this.mouse.sub(this.mouseOffset))


        if(this.getKey("ArrowLeft").held) {
            this.selectedEntity?.rotate(-1*elapsedTime);
        }
        if(this.getKey("ArrowRight").held) {
            this.selectedEntity?.rotate(1*elapsedTime);
        }




        if(this.getKey("w").held) {
            // this.selectedEntity.forces.set("movement", new Vector2d(0,-1));
            this.selectedEntity.velocity.y = -1;

        }
        else if(this.getKey("s").held) {
            // this.selectedEntity.forces.set("movement", new Vector2d(0,1));
            this.selectedEntity.velocity.y=1;
        }
        else {
            // this.selectedEntity.velocity.y=0;
        }
        // if(this.getKey("w").pressed) {
        //     this.selectedEntity.velocity.y=-5;
        // }
        if(this.getKey("a").held) {
            this.selectedEntity.velocity.x=-1;
        }
        else if(this.getKey("d").held) {
            this.selectedEntity.velocity.x=1;
        }
        else {
            // this.selectedEntity.velocity.x=0;
        }
        }



        // this.screen.fillRect(0, 0, 10, 10, "white");

        // const w = this.screen.getWInTiles();
        // const h = this.screen.getHInTiles();

        // for(let i = 0; i < w; i++) {
        //     for(let j = 0; j < h; j++) {
        //         this.screen.strokeRect(i, j, 1, 1, "red")
        //     }
        // }

        // this.world.tick(elapsedTime);


        // this.world.render(this.screen);
        this.screen.drawBackground();
        // this.stairs.a+=1*elapsedTime;
        this.stairs.render(this.screen);

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
