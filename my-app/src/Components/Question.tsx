import React from 'react';
import { AnswerStatus } from '../Models/AnswerStatus';
import { IQuestionModel } from '../Models/IQuestionModel';
import { QuestionView, questionViewModel, questionActions } from '../Views/QuestionView';
import { controllerFactory } from '../MVC/controllerFactory';

export const Question = (props: QuestionProps): JSX.Element => {
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

    const controller = controllerFactory.getController<questionViewModel, questionActions>(
        getViewModel,
        getViewActions,
        new QuestionView(),
    );

    return controller.render();
};

type QuestionProps = {
    question: IQuestionModel;
    gameInProgress: boolean;
    selectCallback: (question: IQuestionModel) => void;
};
