import { GameStateReducerAction } from "./GameStateReducer";

export class GameStateDispatchHelper
{
        constructor(private dispatcher: React.Dispatch<GameStateReducerAction>) {}

        reset() : void {
            this.dispatcher({type:"reset"});
        }
        
        start() : void {
            this.dispatcher({type:"start"});
        }

        pause() : void {
            this.dispatcher({type:"pause"});
        }

        stop() : void {
            this.dispatcher({type:"stop"});
        }

       /*  timerIncrement(incrementValue:number) : void {
            this.dispatcher({type:'timerIncrement',payload:incrementValue});
        } */
}