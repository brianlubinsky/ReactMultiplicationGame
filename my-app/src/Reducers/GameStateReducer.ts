import { AnswerStatus } from '../Models/AnswerStatus';
import { GameStatus } from '../Models/GameStatus';
import { IGameState } from '../Models/IGameState';
import { IQuestionModel } from '../Models/IQuestionModel';

export type GameStateReducerAction =
    | { type: 'reset' }
    | { type: 'start' }
    | { type: 'pause' }
    | { type: 'stop' }
   // | { type: 'timerIncrement'; payload: number }
    | { type: 'answer'; payload: IQuestionModel };

export const gameStateReducer = function (gameState: IGameState, action: GameStateReducerAction): IGameState {

    function getStartingGameState(): IGameState {
        const startingState: IGameState = { questions: [], gameStatus: GameStatus.Idle}//, elapsedSeconds: 0 };
        for (let x = 1; x < 10; ++x) {
            for (let y = 1; y < 10; ++y)
                startingState.questions.push({ multiplicand: x, multiplier: y, status: AnswerStatus.Unanswered });
        }
        return startingState;
    }

    switch (action.type) {
        case 'stop':
        case 'reset':
            return getStartingGameState();
        // case 'timerIncrement':
        //     return { ...gameState, elapsedSeconds: gameState.elapsedSeconds + action.payload };
        case 'start':
            return { ...gameState, gameStatus: GameStatus.Started };
        case 'pause':
            if (gameState.gameStatus === GameStatus.Started)
                return { ...gameState, gameStatus: GameStatus.Paused };
            else
                return gameState;
        case 'answer':
            return {
                ...gameState,
                gameStatus: gameState.questions.filter(x=>x.status === AnswerStatus.Unanswered).length > 1 ? gameState.gameStatus : GameStatus.Complete,
                questions: gameState.questions.map((question) => {
                    if (
                        question.multiplier === action.payload.multiplier &&
                        question.multiplicand === action.payload.multiplicand
                    ) {
                        question.status = action.payload.status;
                    }
                    return question;
                }),
            };
    }
};
