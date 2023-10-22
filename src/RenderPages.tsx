import React from "react";
import { BrowserRouter as ReactRouter, Routes as Pathhub, Route as Path, Navigate as Redirect } from "react-router-dom";

// Pages
import Home from "./pages/home";
import Select from "./pages/selection";
import Test from "./pages/test";
import AdminPanel from "./pages/admin/adminpanel";
import Responses from './pages/admin/responses';
import Questions from './pages/admin/questions';

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
                <Path path="/admin/*" element={<Redirect to="/admin/login" />} />
                <Path path="/admin/responses/*" element={<Redirect to="/admin/responses" />} />
                <Path path="/admin/questions/*" element={<Redirect to="/admin/questions" />} />

                {/* Pages */}
                <Path path="/" element={<Home />} />
                <Path path="/selection" element={<Select />} />
                <Path path="/test" element={<Test />} />
                <Path path="/admin/login" element={<AdminPanel />} />
                <Path path="/admin/responses" element={<Responses />} />
                <Path path="/admin/questions" element={<Questions />} />
            </Pathhub>
        </ReactRouter>
    );
}

export default RenderPages;