import React from 'react';
import { AnswerStatus } from '../Models/AnswerStatus';
import { IQuestionModel } from '../Models/IQuestionModel';
import { ViewBase } from '../MVC/ViewBase';

export class QuestionView extends ViewBase<questionViewModel, questionActions> {
    render(viewModel: questionViewModel, viewActions: questionActions): JSX.Element {
        function onKeyUp(e: React.KeyboardEvent<HTMLDivElement>) {
            if (e.key === 'Enter') {
                viewActions.select();
            }
            e.preventDefault();
        }

        return (
            <>
                <span
                    tabIndex={viewModel.question.status == AnswerStatus.Unanswered ? 0 : -1}
                    onKeyUp={onKeyUp}
                    onClick={viewActions.select}
                    style={{
                        width: '100px',
                        height: '55px',
                        display: 'inline-block',
                        margin: '10px',
                        background: viewModel.backgroundColor,
                        lineHeight: '55px',
                        cursor: viewModel.cursor,
                    }}
                >
                    {viewModel.question.multiplicand} X {viewModel.question.multiplier}
                </span>
            </>
        );
    }
}

export type questionViewModel = { question: IQuestionModel; backgroundColor: string; cursor: string };

export type questionActions = { select: () => void };
