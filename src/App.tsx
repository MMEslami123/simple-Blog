import { useRoutes } from "react-router-dom"
import { Routes } from "./routes"
import { Suspense } from "react";


function App() {
  const router = (useRoutes(Routes));
  return <Suspense fallback={<>loading...</>}>
    {router}
  </Suspense>;

}

export default App
