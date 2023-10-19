import React from "react";
import '../Assets/scss/test.scss';

const Test: React.FC = (): React.JSX.Element => {
    const [loadedAnimFinished, setLoadedAnimFinished] = React.useState<boolean>(false);
    return (
        <div id="Test">
            <img alt="4079" id="backgroundImage" />
            <div className={`QuestionContent ${!loadedAnimFinished ? 'active' : loadedAnimFinished ? 'passive' : ''}`}>
                <div id="QuestionContainer">
                    <div id="ContentDiv">
                        <div id="QuestionDetails">
                            <h1 id="QuestionTitle">Question Title</h1>
                        </div>
                        <div id="QuestionContainerContent">
                            <p id="QuestionDescription">Question Content</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test;