import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/Home";
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import PointageEmp from "./Pages/HomeE"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const client = new QueryClient();




const router = createBrowserRouter([
  {
    path: "/Signup",
    element: <Signup/>
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Login",
    element: <Login/>
  },
  {
    path: "/HomeE",
    element: <PointageEmp/>
  },

]);

function App() {
  return <QueryClientProvider client={client}>
  <RouterProvider router={router}/>
</QueryClientProvider>
}

export default App;
