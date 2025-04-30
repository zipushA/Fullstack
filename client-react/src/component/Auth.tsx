
// import { Button } from "@mui/material";
// import { Outlet, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "./Redux/store";
//   // יבוא ה-RootState מה-store שלך

// const Auth = () => {
//     const navigate = useNavigate();
//     const userType = useSelector((state: RootState) => state.auth.userType); // גישה ל-userType ב-Redux

//     const signIn = (): void => {
//         navigate('/login');
//     }

//     const signUp = (): void => {
//         navigate('/register');
//     }

//     const sign = (): void => {
//         navigate('/list');
//     }

//     return (
//         <>
//             <div>
//                 {/* הודעה מותאמת לפי סוג המשתמש */}
//                 {userType === 'teacher' && <p>שלום מורה, ברוך הבא</p>}
//                 {userType === 'manager' && <p>שלום מנהלת, ברוך הבא</p>}
//                 {!userType && <p>ברוך הבא אנא בחר את סוג המשתמש שלך</p>}
//             </div>

//             <div>
//                 <Button onClick={signIn}>Sign In</Button>
//                 <Button onClick={signUp}>Sign Up</Button>
//                 <Button onClick={sign}>Sign </Button>
//             </div>
//             <Outlet />
//         </>
//     );
// }

// export default Auth;
import React from 'react';
import { Outlet } from 'react-router-dom';

const Auth: React.FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default Auth;
