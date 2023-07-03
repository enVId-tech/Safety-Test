import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../Assets/css/home.css";
import "../Assets/scss/home.scss";

//img: https://frc4079.org/assets/img/logo/logo.svg
const HomePage = () => {
    const saveUser = () => {
        const user = document.getElementById("user").value;

        if (!user) {
            showError("Please enter a valid username");
        } else if (!user.includes(" ")) {
            showError("You must input both your first and last names in the box");
        } else if (user.split(" ")[0].length > 20 || user.split(" ")[1].length > 25) {
            showError("Your first or last name is too long. Try again.");
        } else if (user.split(" ")[0].length < 2 || user.split(" ")[1].length < 2) {
            showError("Your first or last name is too short. Try again.");
        } else if (user.split(" ")[2] !== undefined) {
            showError("You can only have a first and last name. Try again.");
        } else if (
            user.split(" ")[0][0] !== user.split(" ")[0][0].toUpperCase() ||
            user.split(" ")[1][0] !== user.split(" ")[1][0].toUpperCase()
        ) {
            showError("The first letter of your first and last name should be uppercase. Try again.");
        } else {
            document.getElementById("LoginArea").style.transition = "disappearOutOfFrame 0.5s ease-in-out forwards";
            setTimeout(() => {
            window.location.href = "/category";
            }, 1000);
        }

        function showError(error) {
            document.getElementById("Error").innerHTML = error;
            setTimeout(() => {
                document.getElementById("Error").innerHTML = "";
            }, 3000);
        }
    };

    const start = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
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
                    <div className="LoginTop">
                        <h1 id="Login">Oxford Academy Robotics</h1>
                        <h2 id="Test">Performance and Testing</h2>
                        <img className="mainimg" src="4079-transparent.png" alt="4079" />
                    </div>
                    <div className="LoginDetails">
                        <div id="LoginArea">
                            <h1 id="Selection">Test Selection</h1>
                            <form id="LoginForm">
                                <input type="text" placeholder="EX: Erick Tran" id="user" />
                                <br />
                                <select id="typeoftest" disabled>
                                    <option value="safetytest" className="typeoftest">
                                        Safety Test
                                    </option>
                                </select>
                                <br />
                                <h1 id="Error"></h1>
                                <button id="submit" onClick={start}>
                                    Start
                                </button>
                            </form>
                        </div>
                        <footer className="footer">
                            <p className="OARobotics">
                                <a id="RoboticsFooter" href="https://frc4079.org/">
                                    OA Robotics
                                </a>
                                <img src="4079-transparent.png" className="footerimg" />
                            </p>
                            <p>Revision 14.00; 7-2-2023 11:59:00 PT</p>
                        </footer>
                    </div>
                </span>
            </center>
        </HelmetProvider>
    );
};

export default HomePage;
