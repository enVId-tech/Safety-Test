import React from "react";
import { BrowserRouter as ReactRouter, Routes as Pathhub, Route as Path, Navigate as Redirect } from "react-router-dom";

// Pages
import Home from "./pages/home";
import Select from "./pages/selection";
import Test from "./pages/test";

// TS

// SCSS



const RenderPages: React.FC = () => {
    return (
        <ReactRouter>
            <Pathhub>
                {/* Redirect */}
                <Path path="/*" element={<Redirect to="/" />} />
                <Path path="/selection/*" element={<Redirect to="/selection" />} />
                <Path path="/test/*" element={<Redirect to="/test" />} />

                {/* Pages */}
                <Path path="/" element={<Home />} />
                <Path path="/selection" element={<Select />} />
                <Path path="/test" element={<Test />} />
            </Pathhub>
        </ReactRouter>
    );
}

export default RenderPages;