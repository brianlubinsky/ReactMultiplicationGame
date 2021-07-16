import * as React from 'react';
import { GameStateQuestionsDispatchHelper } from '../Reducers/GameStateQuestionsDispatchHelper';
import { GameStatus } from './GameStatus';
import { IQuestionModel } from './IQuestionModel';

export interface IQuestionListContextModel {
    dispatchHelper:GameStateQuestionsDispatchHelper;
    questions: Array<IQuestionModel>;
    gameStatus : GameStatus;
}

export const QuestionListContext = React.createContext<IQuestionListContextModel>(<IQuestionListContextModel>{});