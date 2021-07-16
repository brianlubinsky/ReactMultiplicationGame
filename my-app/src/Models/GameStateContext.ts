import * as React from 'react';
import { GameStateDispatchHelper } from '../Reducers/GameStateDispatchHelper';
import { IGameState } from './IGameState';

export interface IGameStateContextModel {
    gameState: IGameState;
    dispatchHelper: GameStateDispatchHelper;
}

export const GameStateContext = React.createContext<IGameStateContextModel>(<IGameStateContextModel>{});