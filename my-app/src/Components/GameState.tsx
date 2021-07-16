import React from 'react';
import { AnswerStatus } from '../Models/AnswerStatus';
import { GameStateContext } from '../Models/GameStateContext';
import { GameStatus } from '../Models/GameStatus';
import { Timer } from './Timer';
import { useTranslation } from 'react-i18next';

export const GameState = (): JSX.Element => {
    const context = React.useContext(GameStateContext);
    const buttonTranslator = useTranslation('buttons').t;
    const phrasesTranslator = useTranslation('phrases').t;
    const wordsTranslator = useTranslation('words').t;

    //IMPORTANT - dispatch helper calls must all be wrapped in functions (arrow function in jsx will also work), otherwise closures get broken and this keyword gets confused
    function onStartClick() {
        context.dispatchHelper.start();
    }

    function onPauseClick() {
        context.dispatchHelper.pause();
    }

    function onStopClick() {
        if (confirm('Are you sure you want to stop? This will clear all results of this game.'))
            context.dispatchHelper.stop();
    }

    function onResetClick() {
        context.dispatchHelper.reset();
    }

    //Timer in it's own component to minimize frequently rerendered html
    function renderTimer(seconds: number): JSX.Element {
        const date = new Date(0);
        date.setSeconds(seconds);

        return (
            <div>
                {phrasesTranslator('Elapsed_Time')} : {date.toISOString().substr(11, 8)}
            </div>
        );
    }

    function getItems(): JSX.Element[] {
        const items: JSX.Element[] = [];
        items.push(<div key="gameStateMarginDiv" style={{ marginTop: '10px' }}></div>);

        if (context.gameState.gameStatus !== GameStatus.Idle) {
            items.push(
                <Timer
                    key={'Timer'}
                    gameStatus={context.gameState.gameStatus}
                    intervalMilliseconds={1000}
                    incrementValue={1}
                    renderMethod={renderTimer}
                ></Timer>,
            );
            items.push(
                <div key={'Results'}>
                    {context.gameState.gameStatus == GameStatus.Complete
                        ? 'Final Result '
                        : wordsTranslator('Progress')}{' '}
                    :{context.gameState.questions.filter((x) => x.status === AnswerStatus.Correct).length} /
                    {context.gameState.questions.filter((x) => x.status !== AnswerStatus.Unanswered).length}
                    {' ' + wordsTranslator('Correct')}
                </div>,
            );
        }

        if (context.gameState.gameStatus == GameStatus.Complete)
            items.push(
                <button key="Reset" onClick={onResetClick}>
                    {buttonTranslator('reset')}
                </button>,
            );
        else {
            items.push(
                <button
                    key="Start"
                    onClick={onStartClick}
                    disabled={context.gameState.gameStatus === GameStatus.Started}
                >
                    {buttonTranslator('start')}
                </button>,
            );
            items.push(
                <button
                    key="Pause"
                    onClick={onPauseClick}
                    disabled={context.gameState.gameStatus !== GameStatus.Started}
                >
                    {buttonTranslator('pause')}
                </button>,
            );
            items.push(
                <button key="Stop" onClick={onStopClick} disabled={context.gameState.gameStatus === GameStatus.Idle}>
                    {buttonTranslator('stop')}
                </button>,
            );
        }

        return items;
    }

    return <>{getItems()}</>;
};

export default GameState;
