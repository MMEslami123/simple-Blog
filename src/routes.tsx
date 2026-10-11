/* eslint-disable react-refresh/only-export-components */
import Home from "./pages/Home/Home";
import type React from "react";
import PrivateRoute from "./PrivateRoute";
import { lazy } from "react";

const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const AddArticle = lazy(() => import("./pages/AddArticle/AddArticle"));
const Articles = lazy(() => import("./pages/Articles/Articles"));
const Login = lazy(() => import("./pages/Login/Login"));
const Panel = lazy(() => import("./pages/Panel/Panel"));

export interface MyRoute {
    path: string,
    element: React.JSX.Element
}

export const Routes: MyRoute[] = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <AboutUs /> },
    { path: "/add-article", element: <AddArticle /> },
    { path: "/edit-article/:articleId", element: <AddArticle /> },
    { path: "/article/:articleId", element: <Articles /> },
    { path: "/login", element: <Login /> },
    { path: "/panel", element: <PrivateRoute><Panel /></PrivateRoute> }
]