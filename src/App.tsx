import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import PostData from "./components/PostData.tsx";
import PostProvider from "./context/PostContext.tsx";
import ToastContextProvider from "./context/toast.tsx";
import { ToastContainer } from 'react-toastify';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/addpost",
      element: <PostData />,
    },
    {
      path: "/editpost/:id",
      element: <PostData />,
    },
  ]);


  return (
    <>
      <ToastContextProvider>
        <PostProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </PostProvider>
      </ToastContextProvider>
    </>
  )
}

export default App
