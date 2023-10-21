import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Hompage from "./pages/Hompage";
import About from "./pages/About";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AppLayout from "./AppLayout";
import Modal from "./components/Modal";
import { AuthProvider } from "./contexts/FakeAuthentication";
import ProtectedRoutes from "./pages/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hompage />,
  },
  {
    path: "/about",
    element: <About />,
  },

  { path: "/support", element: <Support /> },

  { path: "/contact", element: <Contact /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoutes>
        <AppLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/app/modal",
        element: <Modal />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
