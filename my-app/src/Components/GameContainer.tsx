import React from 'react';
import { GameStatus } from '../Models/GameStatus';
import { IGameState } from '../Models/IGameState';
import { QuestionListContext } from '../Models/QuestionListContext';
import { GameStateDispatchHelper } from '../Reducers/GameStateDispatchHelper';
import { gameStateReducer, GameStateReducerAction } from '../Reducers/GameStateReducer';
import { QuestionList } from './QuestionList';
import { GameStateQuestionsDispatchHelper } from '../Reducers/GameStateQuestionsDispatchHelper';
import GameState from './GameState';
import { GameStateContext } from '../Models/GameStateContext';

export const GameContainer = (): JSX.Element => {
    const [gameState, gameStateDispatcher] = React.useReducer<React.Reducer<IGameState, GameStateReducerAction>>(
        gameStateReducer,
        { questions: [], gameStatus: GameStatus.Idle }, //, elapsedSeconds: 0 },
    );

    //separation of concerns - partition dispatch helpers
    const gameStateDispatchHelper = new GameStateDispatchHelper(gameStateDispatcher);
    const gameStateQuestionsDispatchHelper = new GameStateQuestionsDispatchHelper(gameStateDispatcher);

    if (gameState.questions.length === 0) gameStateDispatchHelper.reset();

    return (
        <>
            <GameStateContext.Provider
                value={{
                    gameState: gameState,
                    dispatchHelper: gameStateDispatchHelper,
                }}
            >
                <GameState></GameState>
            </GameStateContext.Provider>

            <QuestionListContext.Provider
                value={{
                    questions: gameState.questions,
                    dispatchHelper: gameStateQuestionsDispatchHelper,
                    gameStatus: gameState.gameStatus,
                }}
            >
                <QuestionList></QuestionList>
            </QuestionListContext.Provider>

            <div
                id="modalAnchor"
                style={{
                    width: '200px',
                    margin: 'auto',
                    borderWidth: '2px',
                    borderStyle: 'dashed',
                    borderColor: 'black',
                }}
            >
                Anchor
            </div>
        </>
    );
};

export default GameContainer;
