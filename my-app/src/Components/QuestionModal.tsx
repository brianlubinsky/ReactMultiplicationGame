import React from 'react';
import { useTranslation } from 'react-i18next';
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

    const buttonTranslator = useTranslation('buttons').t;
    const punctuationTranslator = useTranslation('punctuation').t;
    const phrasesTranslator = useTranslation('phrases').t;

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
                    phrasesTranslator('Sorry_the_correct_answer_is') +
                        props.question.multiplicand * props.question.multiplier,
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
                    {punctuationTranslator('questionStart')} {phrasesTranslator('What_is')}{' '}
                    {props.question.multiplicand} X {props.question.multiplier} {punctuationTranslator('questionEnd')}
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
                        {buttonTranslator('answer')}
                    </button>
                    <button
                        id="modalCloseButton"
                        onClick={() => {
                            props.completeCallback(answerValue ? true : false, answerCorrect());
                        }}
                    >
                        {buttonTranslator('close')}
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
