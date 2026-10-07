import {useRoutes } from "react-router-dom"
import { Routes } from "./routes"


function App() {
  const router = (useRoutes(Routes));
  return router;

}

export default App
