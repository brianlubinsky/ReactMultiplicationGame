/* eslint-disable react/display-name */
import React, { Profiler } from 'react';
import { AnswerStatus } from '../Models/AnswerStatus';
import { IQuestionModel } from '../Models/IQuestionModel';
import { IViewProps, viewPropsComparer } from '../ViewHelpers/IViewProps';
import { ConsoleLogProfiler } from '../ConsoleLogProfiler';

export const QuestionView = React.memo<IViewProps<questionViewModel, questionActions>>(
    (props: { viewModel: questionViewModel; viewActions: questionActions }): JSX.Element => {
        function onKeyUp(e: React.KeyboardEvent<HTMLDivElement>) {
            if (e.key === 'Enter') {
                props.viewActions.select();
            }
            e.preventDefault();
        }

        return (
            <>
                <ConsoleLogProfiler id="questionView">
                    <span
                        tabIndex={props.viewModel.question.status == AnswerStatus.Unanswered ? 0 : -1}
                        onKeyUp={onKeyUp}
                        onClick={props.viewActions.select}
                        style={{
                            width: '100px',
                            height: '55px',
                            display: 'inline-block',
                            margin: '10px',
                            background: props.viewModel.backgroundColor,
                            lineHeight: '55px',
                            cursor: props.viewModel.cursor,
                        }}
                    >
                        {props.viewModel.question.multiplicand} X {props.viewModel.question.multiplier}
                    </span>
                </ConsoleLogProfiler>
            </>
        );
    },
    viewPropsComparer,
);

export type questionViewModel = { question: IQuestionModel; backgroundColor: string; cursor: string };

export type questionActions = { select: () => void };
