import { createBrowserRouter } from "react-router-dom";
import Auth from "./component/Auth";
import ListTeacher from "./component/ListTeacher";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import HomePage from "./component/Home";
import MatchingForm from "./component/MatchingForm";
import UserProfile from "./component/Profile";
import UserEditForm from "./component/UserEditForm";
import About from "./component/About";
import Layout from "./component/Layout";
export const Router = createBrowserRouter([
{
  path: '/',
  element: <Layout />, // עוטף את הכל
  errorElement: <div>error</div>,
  children: [
    { index: true, element: <HomePage /> },
    {
      path: 'Auth',
      element: <Auth />,
      children: [
        { path: 'profile', element: <UserProfile /> },
        { path: 'login', element: <LoginForm /> },
        { path: 'register', element: <RegisterForm /> },
        { path: 'list', element: <ListTeacher /> 
        },
        { path: 'data', element: <MatchingForm /> },
        { path: 'edit', element: <UserEditForm /> },
        { path: 'about', element: <About /> },
       
      ],
    },
  ],
}
])
