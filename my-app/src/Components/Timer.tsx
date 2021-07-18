import React, { useEffect } from 'react';
import { GameStatus } from '../Models/GameStatus';

export const Timer = (props: TimerProps): JSX.Element => {
    const [elapsedSeconds, setElapsedSeconds] = React.useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            //if (context.gameState.gameStatus === 1) context.dispatchHelper.timerIncrement(1); //for enums check number value, at least if using ===
            if (props.gameStatus === 1) setElapsedSeconds(elapsedSeconds + props.incrementValue);
        }, props.intervalMilliseconds);

        return () => clearTimeout(timeout);
    });

    const items = props.renderMethod(elapsedSeconds);
    return <>{items}</>;
};

export type TimerProps = {
    gameStatus: GameStatus;
    intervalMilliseconds: number;
    incrementValue: number;
    renderMethod: (seconds: number) => JSX.Element;
};
