import React from 'react';
import { AnswerStatus } from '../Models/AnswerStatus';
import { IQuestionModel } from '../Models/IQuestionModel';

export const Question = (props: QuestionProps): JSX.Element => {
    function backgroundColor(): string {
        if (props.question.status == AnswerStatus.Correct) return 'green';
        else if (props.question.status == AnswerStatus.Incorrect) return 'red';
        else return props.gameInProgress ? 'yellow' : '#efeff5'; //rgb(255,255,150)';
    }

    function cursor(): string {
        if (props.question.status == AnswerStatus.Unanswered && props.gameInProgress) return 'pointer';
        else return 'auto';
    }

    function onKeyUp(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Enter') {
            select();
        }
        e.preventDefault();
    }

    function select() {
        props.selectCallback(props.question);
    }

    return (
        <>
            <span
                tabIndex={props.question.status == AnswerStatus.Unanswered ? 0 : -1}
                onKeyUp={onKeyUp}
                onClick={select}
                style={{
                    width: '100px',
                    height: '55px',
                    display: 'inline-block',
                    margin: '10px',
                    background: backgroundColor(),
                    lineHeight: '55px',
                    cursor: cursor(),
                }}
            >
                {props.question.multiplicand} X {props.question.multiplier}
            </span>
        </>
    );
};

type QuestionProps = {
    question: IQuestionModel;
    gameInProgress: boolean;
    selectCallback: (question: IQuestionModel) => void;
};
