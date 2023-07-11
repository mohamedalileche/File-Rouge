import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/Home";
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import PointageEmp from "./Pages/HomeE"
import HomeM from "./Pages/HomeM";
import Tache from "./Pages/Tache";
import TacheM from "./Pages/TacheM";
import Ensavoir from "./Pages/Ensavoir";
import TacheS from "./Pages/TacheS";
import {  QueryClient,  QueryClientProvider,} from '@tanstack/react-query'





const client = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Signup",
    element: <Signup/>
  },
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/HomeE",
    element: <PointageEmp/>
  },
  {
    path: "/HomeM",
    element: <HomeM/>
  },
  {
    path: "/Tache",
    element: <Tache/>
  },
  {
    path: "/TacheM",
    element: <TacheM/>
  },
  {
    path: "/TacheS",
    element: <TacheS/>
  },
  {
    path: "/Ensavoirplus",
    element: <Ensavoir/>
  },

]);
function App() {
  return <QueryClientProvider client={client}>
  <RouterProvider router={router}/>
</QueryClientProvider>
}

export default App;
