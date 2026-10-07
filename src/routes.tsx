import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import AddArticle from "./pages/AddArticle/AddArticle";
import Articles from "./pages/Articles/Articles";
import type React from "react";
import Login from "./pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Panel from "./pages/Panel/Panel";


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