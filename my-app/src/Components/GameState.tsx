import React from 'react';
import { AnswerStatus } from '../Models/AnswerStatus';
import { GameStateContext } from '../Models/GameStateContext';
import { GameStatus } from '../Models/GameStatus';
import { useTranslation } from 'react-i18next';
import { GameStateView, gameStateViewModel, gameStateActions } from '../Views/GameStateView';

//Trying this one as an MVC-ish (or container/presenter) pattern.
//Clean rendering method, logic separated to create a more testable, easier to debug (see components tab) 'pure' component
export const GameState = (): JSX.Element => {
    const buttonTranslator = useTranslation('buttons').t;
    const wordsTranslator = useTranslation('words').t;
    const phrasesTranslator = useTranslation('phrases').t;

    const context = React.useContext(GameStateContext);

    function getViewModel(): gameStateViewModel {
        return {
            showResults: context.gameState.gameStatus !== GameStatus.Idle,
            currentResults: getCurrentResults(),
            displayReset: context.gameState.gameStatus == GameStatus.Complete,
            startButtonDisabled: context.gameState.gameStatus === GameStatus.Started,
            pauseButtonDisabled: context.gameState.gameStatus !== GameStatus.Started,
            stopButtonDisabled: context.gameState.gameStatus === GameStatus.Idle,
            verbiage: getVerbiage(),
            timerSettings: getTimerSettings(),
        };
    }

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

    function getActions(): gameStateActions {
        return {
            start: () => context.dispatchHelper.start(),
            pause: () => context.dispatchHelper.pause(),
            stop: () => {
                if (confirm(phrasesTranslator('ConfirmStop'))) context.dispatchHelper.stop();
            },
            reset: () => context.dispatchHelper.reset(),
        };
    }

    return <GameStateView viewModel={getViewModel()} viewActions={getActions()}></GameStateView>;
};

export default GameState;
