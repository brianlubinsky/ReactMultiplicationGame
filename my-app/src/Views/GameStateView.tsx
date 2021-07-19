import React from 'react';
//import { ViewBase } from '../MVC/ViewBase';
import { Timer, TimerProps } from '../Components/Timer';

//export class GameStateView extends ViewBase<gameStateViewModel, gameStateActions> {
export const GameStateView = (props: { viewModel: gameStateViewModel; viewActions: gameStateActions }): JSX.Element => {
    function getElements(): JSX.Element[] {
        const items: JSX.Element[] = [];
        items.push(<div key="gameStateMarginDiv" style={{ marginTop: '10px' }}></div>);

        if (props.viewModel.showResults) {
            items.push(
                <Timer
                    key={'Timer'}
                    gameStatus={props.viewModel.timerSettings.gameStatus}
                    intervalMilliseconds={props.viewModel.timerSettings.intervalMilliseconds}
                    incrementValue={props.viewModel.timerSettings.incrementValue}
                    renderMethod={props.viewModel.timerSettings.renderMethod}
                ></Timer>,
            );
            items.push(<div key={'Results'}>{props.viewModel.currentResults}</div>);
        }

        if (props.viewModel.displayReset)
            items.push(
                <button key="Reset" onClick={props.viewActions.reset}>
                    {props.viewModel.verbiage.buttons.reset}
                </button>,
            );
        else {
            items.push(
                <button key="Start" onClick={props.viewActions.start} disabled={props.viewModel.startButtonDisabled}>
                    {props.viewModel.verbiage.buttons.start}
                </button>,
            );
            items.push(
                <button key="Pause" onClick={props.viewActions.pause} disabled={props.viewModel.pauseButtonDisabled}>
                    {props.viewModel.verbiage.buttons.pause}
                </button>,
            );
            items.push(
                <button key="Stop" onClick={props.viewActions.stop} disabled={props.viewModel.stopButtonDisabled}>
                    {props.viewModel.verbiage.buttons.stop}
                </button>,
            );
        }

        return items;
    }

    return <>{getElements()}</>;
};

export type gameStateActions = { start: () => void; pause: () => void; stop: () => void; reset: () => void };

export type gameStateViewModel = {
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
