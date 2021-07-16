import { GameStatus } from "./GameStatus";
import { IQuestionModel } from "./IQuestionModel";

export interface IGameState
{
    //elapsedSeconds : number; //TODO - localized to the GameState component. Appears to be causing frequent re renders. This could be readded and set when game is complete.
    gameStatus:GameStatus;
    questions: Array<IQuestionModel>;
}