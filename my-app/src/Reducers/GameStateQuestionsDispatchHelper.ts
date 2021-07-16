import { IQuestionModel } from "../Models/IQuestionModel";
import { GameStateReducerAction } from "./GameStateReducer";

export class GameStateQuestionsDispatchHelper
{
        constructor(private dispatcher: React.Dispatch<GameStateReducerAction>) {}

        answer(answer:IQuestionModel) : void{
            this.dispatcher({type:"answer",payload:answer});
        }

}