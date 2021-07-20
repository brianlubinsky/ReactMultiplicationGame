/* eslint-disable react/display-name */
import React from 'react';
import { AnswerStatus } from '../Models/AnswerStatus';
import { IQuestionModel } from '../Models/IQuestionModel';
import { QuestionView, questionViewModel, questionActions } from '../Views/QuestionView';
import {} from '../ViewHelpers/IViewProps';
import { ConsoleLogProfiler } from '../ConsoleLogProfiler';

const propsCompare = (oldProps: QuestionProps, newProps: QuestionProps): boolean => {
    return oldProps.gameInProgress === newProps.gameInProgress && oldProps.question.status == newProps.question.status;
};

//TODO: This is a pretty pointless component, get rid of it and just do this stuff in the QuestionList.
//Also background color/cursor can be done via classes changed in the question list
export const Question = React.memo((props: QuestionProps): JSX.Element => {
    function getBackgroundColor(): string {
        if (props.question.status == AnswerStatus.Correct) return 'green';
        else if (props.question.status == AnswerStatus.Incorrect) return 'red';
        else return props.gameInProgress ? 'yellow' : '#efeff5';
    }

    function cursor(): string {
        if (props.question.status == AnswerStatus.Unanswered && props.gameInProgress) return 'pointer';
        else return 'auto';
    }

    function select() {
        props.selectCallback(props.question);
    }

    function getViewModel(): questionViewModel {
        return {
            question: props.question,
            backgroundColor: getBackgroundColor(),
            cursor: cursor(),
        };
    }

    function getViewActions(): questionActions {
        return { select: select };
    }

    return (
        <ConsoleLogProfiler id="question">
            {' '}
            <QuestionView viewModel={getViewModel()} viewActions={getViewActions()}></QuestionView>
        </ConsoleLogProfiler>
    );
}, propsCompare);

type QuestionProps = {
    question: IQuestionModel;
    gameInProgress: boolean;
    selectCallback: (question: IQuestionModel) => void;
};
