
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setUserType } from "./Redux/slices/authSlice";
// ייבוא הפעולה

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTeacherLogin = () => {
        dispatch(setUserType('teacher'));  // הגדרת סוג המשתמש ל-mTeacher
        navigate('/auth/login');  // מעבר לדף הכניסה למורות
    };

    const handleManagerLogin = () => {
        dispatch(setUserType('manager'));  // הגדרת סוג המשתמש ל-manager
        navigate('/auth/login');  // מעבר לדף הכניסה למנהלות
    };
   
    return (
        <div className="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center p-6">
            {/* לוגו */}
            <motion.img
                src="/logo.jpg"
                alt="לוגו"
                className="w-48 mb-8"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            />

            {/* כותרת */}
            <motion.h1
                className="text-4xl md:text-5xl font-bold text-[#40BEBE] mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                מורה בלחיצת כפתור
            </motion.h1>
                {/* כפתורים */}
                <div className="flex gap-6">
                    <motion.button
                        className="bg-[#40BEBE] hover:bg-[#349d9d] text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTeacherLogin}
                    >
                        כניסה למורות
                    </motion.button>

                    <motion.button
                        className="bg-[#40BEBE] hover:bg-[#349d9d] text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleManagerLogin}
                    >
                        כניסה למנהלות
                    </motion.button>
                   
                </div>
            </div>
    );
};

export default HomePage;
