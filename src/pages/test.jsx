import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const TestPage = () => {
    const [test, setTest] = useState("");

    setTest("Safety Test");

    return (
        <HelmetProvider>
            <Helmet>
                <title>OA Robotics - {test}</title>
                <link rel="icon" href="4079-transparent.png" alt="4079"></link>
            </Helmet>
            <center>
                <span className="main">
                    <div className="QuestionContent">
                        
                    </div>
                    <div className="QuestionSelections">

                    </div>
                </span>
            </center>
        </HelmetProvider>
    )
}

export default TestPage;