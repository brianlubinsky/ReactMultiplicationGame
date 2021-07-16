import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { GameStatus } from '../Models/GameStatus';
import { QuestionListContext } from '../Models/QuestionListContext';
import { Question } from './Question';
import { QuestionModal } from './QuestionModal';
import { IQuestionModel } from '../Models/IQuestionModel';
import { AnswerStatus } from '../Models/AnswerStatus';

Modal.setAppElement('#root');

export const QuestionList = (): JSX.Element => {
    const context = React.useContext(QuestionListContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<IQuestionModel>({
        multiplicand: 0,
        multiplier: 0,
        status: 1,
    });

    //avoid race condition by only opening modal after setCurrentQuestion completes
    useEffect(() => {
        if (currentQuestion.multiplicand > 0 && currentQuestion.multiplier > 0) setIsModalOpen(true);
    }, [currentQuestion]);

    function onQuestionSelected(question: IQuestionModel) {
        if (context.gameStatus == GameStatus.Started) {
            setCurrentQuestion(question);
        }
    }

    function onModalComplete(answerIsComplete: boolean, answerIsCorrect: boolean) {
        setIsModalOpen(false);
        if (answerIsComplete)
            context.dispatchHelper.answer({
                ...currentQuestion,
                status: answerIsCorrect ? AnswerStatus.Correct : AnswerStatus.Incorrect,
            });
    }

    function getItemsForRow(multiplicand: number): JSX.Element[] {
        return context.questions
            .filter((x) => x.multiplicand === multiplicand)
            .map((question) => {
                return (
                    <Question
                        key={100 * question.multiplicand + question.multiplier}
                        question={question}
                        gameInProgress={context.gameStatus == GameStatus.Started}
                        selectCallback={onQuestionSelected}
                    ></Question>
                );
            });
    }

    function getAllItems(): JSX.Element[] {
        const rowArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const items = rowArray.map((x) => {
            return <div key={x * 1000}>{getItemsForRow(x)}</div>;
        });

        items.push(
            <QuestionModal
                key="Modal"
                isOpen={isModalOpen}
                completeCallback={onModalComplete}
                question={currentQuestion}
            ></QuestionModal>,
        );
        return items;
    }

    return <>{getAllItems()}</>;
};
