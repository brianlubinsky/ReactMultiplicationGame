import React from 'react';
import { ViewBase } from '../MVC/ViewBase';
import { Timer, TimerProps } from '../Components/Timer';

export class GameStateView extends ViewBase<gameStateViewModel, gameStateActions> {
    render(viewModel: gameStateViewModel, viewActions: gameStateActions): JSX.Element {
        function getElements(): JSX.Element[] {
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
                    <button key="Reset" onClick={viewActions.reset}>
                        {viewModel.verbiage.buttons.reset}
                    </button>,
                );
            else {
                items.push(
                    <button key="Start" onClick={viewActions.start} disabled={viewModel.startButtonDisabled}>
                        {viewModel.verbiage.buttons.start}
                    </button>,
                );
                items.push(
                    <button key="Pause" onClick={viewActions.pause} disabled={viewModel.pauseButtonDisabled}>
                        {viewModel.verbiage.buttons.pause}
                    </button>,
                );
                items.push(
                    <button key="Stop" onClick={viewActions.stop} disabled={viewModel.stopButtonDisabled}>
                        {viewModel.verbiage.buttons.stop}
                    </button>,
                );
            }

            return items;
        }

        return <>{getElements()}</>;
    }
}

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
