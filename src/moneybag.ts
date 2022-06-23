import * as PIXI from 'pixi.js'
export class Moneybag extends PIXI.Sprite{

    public _amount: number

    public get amount() : number {
        return this._amount
    }

    constructor(amount:number, loader:PIXI.Loader){
        super(loader.resources[`moneyImage${amount}`].texture!); 

        this._amount = amount
    
    }
    

    update(delta: number){
       
    }

    
   
    
}
