import { createBrowserRouter } from "react-router-dom";
import Auth from "./component/Auth";
import ListTeacher from "./component/ListTeacher";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import HomePage from "./component/Home";
import MatchingForm from "./component/MatchingForm";


export const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>error</div>,
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      { path: 'login', element: <LoginForm /> },
      { path: 'register', element: <RegisterForm /> },
      { path: 'list', element: <ListTeacher /> },
      { path: 'data', element: <MatchingForm /> },

    ]
  }
]);