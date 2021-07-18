import React from 'react';
import { AnswerStatus } from '../Models/AnswerStatus';
import { GameStateContext, IGameStateContextModel } from '../Models/GameStateContext';
import { GameStatus } from '../Models/GameStatus';
import { Timer, TimerProps } from './Timer';
import { useTranslation, UseTranslationResponse } from 'react-i18next';

//Trying this one as an MVC-ish pattern. 'Controller' returns a view model and exposes actions.
//Clean rendering method, logic separated to create a more testable 'pure' component
//Probably should make the controller a class
export const GameState = (): JSX.Element => {
    const { viewModel, actions } = gameStateController(React.useContext(GameStateContext), (ns: string | undefined) => {
        return useTranslation(ns);
    });

    function getItems(): JSX.Element[] {
        const items: JSX.Element[] = [];
        items.push(<div key="gameStateMarginDiv" style={{ marginTop: '10px' }}></div>);

        if (viewModel.showResults) {
            items.push(
                <Timer
                    key={'Timer'}
                    gameStatus={viewModel.timerSettings.gameStatus}
                    intervalMilliseconds={viewModel.timerSettings.intervalMilliseconds}
                    incrementValue={viewModel.timerSettings.incrementValue}
                    renderMethod={viewModel.timerSettings.renderMethod}
                ></Timer>,
            );
            items.push(<div key={'Results'}>{viewModel.currentResults}</div>);
        }

        if (viewModel.displayReset)
            items.push(
                <button key="Reset" onClick={actions.reset}>
                    {viewModel.verbiage.buttons.reset}
                </button>,
            );
        else {
            items.push(
                <button key="Start" onClick={actions.start} disabled={viewModel.startButtonDisabled}>
                    {viewModel.verbiage.buttons.start}
                </button>,
            );
            items.push(
                <button key="Pause" onClick={actions.pause} disabled={viewModel.pauseButtonDisabled}>
                    {viewModel.verbiage.buttons.pause}
                </button>,
            );
            items.push(
                <button key="Stop" onClick={actions.stop} disabled={viewModel.stopButtonDisabled}>
                    {viewModel.verbiage.buttons.stop}
                </button>,
            );
        }

        return items;
    }

    return <>{getItems()}</>;
};

export default GameState;

type gameStateActions = { start: () => void; pause: () => void; stop: () => void; reset: () => void };

type gameStateViewModel = {
    showResults: boolean;
    currentResults: string;
    displayReset: boolean;
    startButtonDisabled: boolean;
    pauseButtonDisabled: boolean;
    stopButtonDisabled: boolean;
    verbiage: {
        phrases: { elapsedTime: string };
        words: { progress: string; correct: string };
        buttons: { reset: string; start: string; pause: string; stop: string };
    };
    timerSettings: TimerProps;
};

const gameStateController = (
    context: IGameStateContextModel,
    useTranslationFunction: (ns: string | undefined) => UseTranslationResponse<string>,
): { viewModel: gameStateViewModel; actions: gameStateActions } => {
    const buttonTranslator = useTranslationFunction('buttons').t;
    const wordsTranslator = useTranslationFunction('words').t;
    const phrasesTranslator = useTranslationFunction('phrases').t;

    const viewModel = {
        showResults: context.gameState.gameStatus !== GameStatus.Idle,
        currentResults: getCurrentResults(),
        displayReset: context.gameState.gameStatus == GameStatus.Complete,
        startButtonDisabled: context.gameState.gameStatus === GameStatus.Started,
        pauseButtonDisabled: context.gameState.gameStatus !== GameStatus.Started,
        stopButtonDisabled: context.gameState.gameStatus === GameStatus.Idle,
        verbiage: getVerbiage(),
        timerSettings: getTimerSettings(),
    };

    function getCurrentResults(): string {
        return context.gameState.gameStatus == GameStatus.Complete
            ? 'Final Result '
            : wordsTranslator('Progress') +
                  ' : ' +
                  context.gameState.questions.filter((x) => x.status === AnswerStatus.Correct).length +
                  ' / ' +
                  context.gameState.questions.filter((x) => x.status !== AnswerStatus.Unanswered).length +
                  ' ' +
                  wordsTranslator('Correct');
    }

    function getVerbiage() {
        return {
            phrases: { elapsedTime: phrasesTranslator('Elapsed_Time') },
            words: { progress: wordsTranslator('Progress'), correct: wordsTranslator('Correct') },
            buttons: {
                reset: buttonTranslator('reset'),
                start: buttonTranslator('start'),
                pause: buttonTranslator('pause'),
                stop: buttonTranslator('stop'),
            },
        };
    }

    function getTimerSettings() {
        return {
            renderMethod: function renderTimer(seconds: number): JSX.Element {
                const date = new Date(0);
                date.setSeconds(seconds);

                return (
                    <div>
                        {phrasesTranslator('Elapsed_Time')} : {date.toISOString().substr(11, 8)}
                    </div>
                );
            },
            incrementValue: 1,
            intervalMilliseconds: 1000,
            gameStatus: context.gameState.gameStatus,
        };
    }

    const actions = {
        start: () => context.dispatchHelper.start(),
        pause: () => context.dispatchHelper.pause(),
        stop: () => {
            if (confirm(phrasesTranslator('ConfirmStop'))) context.dispatchHelper.stop();
        },
        reset: () => context.dispatchHelper.reset(),
    };

    return { viewModel, actions };
};
