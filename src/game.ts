import * as PIXI from 'pixi.js'
import money1I from "./images/money1-1.png.png"
import money2I from "./images/money2-1.png.png"
import money3I from "./images/money3-1.png.png"
import money4I from "./images/money4-1.png.png"
import money5I from "./images/money5-1.png.png"
import money6I from "./images/money6-1.png.png"
import money7I from "./images/money7-1.png.png"
import money8I from "./images/money8-1.png.png"
import money9I from "./images/money9-1.png.png"
import money10I from "./images/money10-1.png.png"
import rex from "./images/agentrex.png"
import { Moneybag } from './moneybag';
export class Game{
    
    pixiWidth = 800;
    pixiHeight = 450;
    
    pixi : PIXI.Application;
    loader : PIXI.Loader;
    moneybags:Moneybag[] = [] 
    moneybag: Moneybag
    rex: PIXI.Sprite
    rexspeed: number = 1
    moneyspeed: number = 1
    score: number = 0
    collided: boolean = false

    
    
    constructor(){
        this.pixi = new PIXI.Application({ width: this.pixiWidth, height: this.pixiHeight });
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);
        this.loader = new PIXI.Loader();
        this.loader.add('moneyImage1', money1I)
            .add('moneyImage2', money2I)
            .add('moneyImage3', money3I)
            .add('moneyImage4', money4I)
            .add('moneyImage5', money5I)
            .add('moneyImage6', money6I)
            .add('moneyImage7', money7I)
            .add('moneyImage8', money8I)
            .add('moneyImage9', money9I)
            .add('moneyImage10', money10I)
            .add('agentrex', rex);

        this.loader.load(()=>this.loadCompleted());
        
    }

    
    loadCompleted() {
    
        for(let i = 1; i < 11; i++){
             let bag = new Moneybag(i, this.loader)
             this.moneybags.push(bag) 
            console.log()
        }   
      
      this.testcollision();
      
      
      
    }

    testcollision(){
        this.rex = new PIXI.Sprite(this.loader.resources["agentrex"].texture!)
        this.rex.anchor.set(0,5);
        this.rex.x = 100;
        this.rex.y = 400;
        this.pixi.stage.addChild(this.rex);

        this.Newmoneybag()

        this.pixi.ticker.add(() => this.gameLoop())
        
        
        
    }

    Newmoneybag(){
        this.moneybag = this.moneybags[Math.floor(Math.random() * this.moneybags.length)];
        this.moneybag.anchor.set(0,5);
        this.moneybag.x = 700;
        this.moneybag.y = 400;
        this.pixi.stage.addChild(this.moneybag);
    
    }

    gameLoop(){
        this.rex.x += this.rexspeed;
        if(this.collided === false) {

        
        this.moneybag.x -= this.moneyspeed;
    
        if(this.rectsIntersect(this.rex, this.moneybag)){
            this.rexspeed = 0
            this.pixi.stage.removeChild(this.moneybag)
            this.score = this.score += this.moneybag.amount
            console.log(this.score)
            this.collided = true
            this.Newmoneybag()
            this.collided = false
        }
    }
    
       
    }
    rectsIntersect (a: PIXI.Sprite, b: PIXI.Sprite){
        let aBox = a.getBounds();
        let bBox = b.getBounds();
    
        return aBox.x + aBox.width > bBox.x &&
        aBox.x < bBox.x + bBox.width &&
        aBox.y + aBox.height > bBox.y &&
        aBox.y < bBox.y + bBox.height;
        
    
    }
    }
    

new Game();
