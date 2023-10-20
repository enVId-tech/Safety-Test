import React from "react";
import '../Assets/scss/test.scss';

const Test: React.FC = (): React.JSX.Element => {
    const [loadedContentAnimFinished, setLoadedContentAnimFinished] = React.useState<boolean>(false);
    const [loadedSelectionAnimFinished, setLoadedSelectionAnimFinished] = React.useState<boolean>(false);
    const [questionNumber, setQuestionNumber] = React.useState<number>(0);
    return (
        <div id="Test">
            <img alt="4079" id="backgroundImage" />
            <div className={`QuestionContent ${!loadedContentAnimFinished ? 'active' : loadedContentAnimFinished ? 'passive' : ''}`}>
                <div id="QuestionContainer">
                    <div id="ContentDiv">
                        <div id="QuestionDetails">
                            <h1 id="QuestionTitle">Question {questionNumber+1}</h1>
                        </div>
                        <div id="QuestionContainerContent">
                            <p id="QuestionDescription">Question Content</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`SelectionContent ${!loadedSelectionAnimFinished ? 'active' : loadedSelectionAnimFinished ? 'passive' : ''}`}>
                
            </div>
        </div>
    )
}

export default Test;