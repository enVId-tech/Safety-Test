import React, { useState, useEffect, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

const HomePage = () => {
    const LOGINDETAILS = useRef(null);
    const LOGINAREA = useRef(null);
    const FOOTER = useRef(null);
    const LOGINTOP = useRef(null);
    const LOGIN = useRef(null);
    const TEST = useRef(null);
    const MAINIMG = useRef(null);
    const USER = useRef(null);
    const TYPEOFTEST = useRef(null);
    const ERROR = useRef(null);

    const [error, setError] = useState(null);
    const [folders, setFolders] = useState([]);
    const [SelectedValue, setSelectedValue] = useState("");
    const [User, setUser] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getFolders = await fetch("/home/get/folders");
                const foldersJson = await getFolders.json();
                const folders = foldersJson.fileNames;
                const foldersWithoutDashes = folders.map(folder =>
                    folder.replace("-", " ")
                );
                setFolders(foldersWithoutDashes);
            } catch (error) {
                console.error(error);
            }
        };

        setSelectedValue("Safety-Test");
        fetchData();

    }, []);

    const showError = (errorMessage) => {
        setError(errorMessage);
    };

    const hideError = () => {
        setError(null);
    };


    const handleSelectChange = (event) => {
        setUser(event.target.value);
    };

    const handleSelectChange2 = (event) => {
        setSelectedValue(event.target.value);
    };

    const saveUser = async () => {
        const user = USER.current.value;

        if (!user) {
            showError("Please enter a valid username");
            // Hide error message after 3 seconds
            const timer = setTimeout(hideError, 3000);

            // Cleanup the timer on unmount
            return () => clearTimeout(timer);
        } else if (!user.includes(" ")) {
            showError("You must input both your first and last names in the box");
            // Hide error message after 3 seconds
            const timer = setTimeout(hideError, 3000);

            // Cleanup the timer on unmount
            return () => clearTimeout(timer);
        } else if (user.split(" ")[0].length > 20 || user.split(" ")[1].length > 25) {
            showError("Your first or last name is too long. Try again.");
            // Hide error message after 3 seconds
            const timer = setTimeout(hideError, 3000);

            // Cleanup the timer on unmount
            return () => clearTimeout(timer);
        } else if (user.split(" ")[0].length < 2 || user.split(" ")[1].length < 2) {
            showError("Your first or last name is too short. Try again.");
            // Hide error message after 3 seconds
            const timer = setTimeout(hideError, 3000);

            // Cleanup the timer on unmount
            return () => clearTimeout(timer);
        } else if (user.split(" ")[2] !== undefined) {
            showError("You can only have a first and last name. Try again.");
            // Hide error message after 3 seconds
            const timer = setTimeout(hideError, 3000);

            // Cleanup the timer on unmount
            return () => clearTimeout(timer);
        } else if (
            user.split(" ")[0][0] !== user.split(" ")[0][0].toUpperCase() ||
            user.split(" ")[1][0] !== user.split(" ")[1][0].toUpperCase()
        ) {
            showError("The first letter of your first and last name should be uppercase. Try again.");
            // Hide error message after 3 seconds
            const timer = setTimeout(hideError, 3000);

            // Cleanup the timer on unmount
            return () => clearTimeout(timer);
        } else {
            LOGINAREA.current.classList.add("removeOffPage");
            FOOTER.current.classList.add("removeOffPage");
            LOGIN.current.classList.add("removeOffPage");
            TEST.current.classList.add("removeOffPage");
            MAINIMG.current.classList.add("removeOffPage");
            setTimeout(() => {
                LOGINTOP.current.classList.add("slideOffPage");
                LOGINDETAILS.current.classList.add("slideOnPage");
            }, 1000);

            setSelectedValue(TYPEOFTEST.current.value);

            try {
                const response = await fetch("/home/post/folders/dir", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ SelectedValue, User }), // Use current value directly in the request
                });

                const data = await response.json();
                //console.log(data);

                setTimeout(() => {
                    window.location.href = "/selection";
                }, 3000);
            } catch (error) {
                console.error(error);
            }
        }

    };

    const start = event => {
        event.preventDefault();
        saveUser();
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>OA Robotics - Testing</title>
                <link rel="icon" href="4079-transparent.png" alt="4079" />
            </Helmet>
            <center>
                <span className="main">
                    <div id="LoginDetails" ref={LOGINDETAILS}>
                        <div id="LoginArea" ref={LOGINAREA}>
                            <h1 id="Selection">Test Selection</h1>
                            <form id="LoginForm">
                                <input
                                    type="text"
                                    placeholder="EX: Erick Tran"
                                    id="user"
                                    ref={USER}
                                    onChange={handleSelectChange}
                                />
                                <br />
                                {folders.length === 1 ? (
                                    <select id="typeoftest" disabled ref={TYPEOFTEST}>
                                        <option value="Safety-Test" className="typeoftest">
                                            Safety Test
                                        </option>
                                    </select>
                                ) : (
                                    <select id="typeoftest" ref={TYPEOFTEST} onChange={handleSelectChange2}>
                                        {folders.map(folder => (
                                            <option
                                                key={folder}
                                                value={folder}
                                                className="typeoftest"
                                            >
                                                {folder}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <br />
                                {error && <h1 id="Error">{error}</h1>}
                                <button id="submit" onClick={start}>
                                    Start
                                </button>
                            </form>
                        </div>
                        <footer id="footer" ref={FOOTER}>
                            <p className="OARobotics">
                                <Link id="RoboticsFooter" to="https://frc4079.org/">OA Robotics</Link>
                                <img src="4079-transparent.png" className="footerimg" alt="4079" />
                            </p>
                            <p>Revision 16.00; 7-15-2023 00:14:12 PT</p>
                        </footer>
                    </div>
                    <div id="LoginTop" ref={LOGINTOP}>
                        <h1 id="Login" ref={LOGIN}>
                            Oxford Academy Robotics
                        </h1>
                        <h2 id="Test" ref={TEST}>
                            Performance and Testing
                        </h2>
                        <img id="MainImg" ref={MAINIMG} src="4079-transparent.png" alt="4079" />
                    </div>
                </span>
            </center>
        </HelmetProvider>
    );
};

export default HomePage;
