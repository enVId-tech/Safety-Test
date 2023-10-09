import React from "react";
import { BrowserRouter as ReactRouter, Routes as Pathhub, Route as Path, Navigate as Redirect } from "react-router-dom";
import Home from "./pages/home";
import Select from "./pages/selection";

// TS

// SCSS

// Pages

const RenderPages: React.FC = () => {
    return (
        <ReactRouter>
            <Pathhub>
                {/* Redirect */}
                <Path path="/*" element={<Redirect to="/" />} />
                <Path path="/selection/*" element={<Redirect to="/selection" />} />

                {/* Pages */}
                <Path path="/" element={<Home />} />
                <Path path="/selection" element={<Select />} />
            </Pathhub>
        </ReactRouter>
    );
}

export default RenderPages;