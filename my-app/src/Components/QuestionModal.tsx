import React from 'react';
import Modal from 'react-modal';
import { IQuestionModel } from '../Models/IQuestionModel';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: { zIndex: 1000 },
};

export const QuestionModal = (props: QuestionModalProps): JSX.Element => {
    const [answerValue, setAnswerValue] = React.useState('');
    const [userMessage, setUserMessage] = React.useState('');

    function onAfterOpen() {
        setAnswerValue('');
        setUserMessage('');
        document.getElementById('modalInput')?.focus();
    }

    function onAnswerChanged(e: React.FormEvent<HTMLInputElement>) {
        if (!e.currentTarget.value || (Number(e.currentTarget.value) && !e.currentTarget.value.includes('.')))
            setAnswerValue(e.currentTarget.value);
    }

    function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (answerValue) {
            if (answerCorrect()) {
                setUserMessage('Correct!');
                props.completeCallback(true, true);
            } else {
                setUserMessage(
                    'Sorry, the correct answer is ' + props.question.multiplicand * props.question.multiplier,
                );
                document.getElementById('modalCloseButton')?.focus();
            }
        }
    }

    function answerCorrect(): boolean {
        return Number(answerValue) == props.question.multiplicand * props.question.multiplier;
    }

    if (props.question)
        return (
            <Modal isOpen={props.isOpen} onAfterOpen={onAfterOpen} style={customStyles}>
                <div>
                    What is {props.question.multiplicand} X {props.question.multiplier} ?
                </div>

                <form onSubmit={onFormSubmit}>
                    <input
                        id="modalInput"
                        name="answer"
                        onChange={onAnswerChanged}
                        value={answerValue}
                        disabled={!!userMessage}
                    />
                    <br></br>
                    <button
                        type="submit"
                        disabled={answerValue ? false : true}
                        style={{ display: userMessage ? 'none' : '' }}
                    >
                        Answer
                    </button>
                    <button
                        id="modalCloseButton"
                        onClick={() => {
                            props.completeCallback(answerValue ? true : false, answerCorrect());
                        }}
                    >
                        Close
                    </button>
                </form>

                <div>{userMessage}</div>
            </Modal>
        );
    else return <></>;
};

type QuestionModalProps = {
    question: IQuestionModel;
    isOpen: boolean;
    completeCallback: (answerIsComplete: boolean, answerIsCorrect: boolean) => void;
};
