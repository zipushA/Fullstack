
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setUserType } from "./Redux/slices/authSlice";
import { School, User, MapPin, Award} from 'lucide-react';
import "../component/Home.css";


const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const aboutRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    const handleTeacherLogin = () => {
        dispatch(setUserType('teacher'));
        sessionStorage.setItem("userType", "teacher");
        navigate('/auth/login');
    };

    const handleManagerLogin = () => {
        dispatch(setUserType('principal'));
        navigate('/auth/login');
    };

    // const scrollToAbout = () => {
    //     aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    // };

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="home-page" dir="rtl">
            <div className="hero-background">
                <div className="particles-container">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${5 + Math.random() * 10}s`
                            }}
                        ></div>
                    ))}
                </div>
                <div className="gradient-overlay"></div>
                <section className="hero-section">
                    <div className="hero-background">
                        <div className="particles-container">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="particle"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 5}s`,
                                        animationDuration: `${5 + Math.random() * 10}s`
                                    }}
                                ></div>
                            ))}
                        </div>
                        <div className="gradient-overlay"></div>
                    </div>
                    <div className="hero-content-wrapper">
                        <motion.div
                            className="hero-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isLoaded ? 1 : 0 }}
                            transition={{ duration: 0.8 }}
                            style={{ opacity, scale }}
                        >
                            <motion.div
                                className="logo-container"
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="logo-glow"></div>
                                <motion.img
                                    src="/logo.jpg"
                                    alt="לוגו מורה בלחיצת כפתור"
                                    className="logo-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                />
                            </motion.div>

                            <motion.h1
                                className="hero-tagline"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                מורה בלחיצת כפתור
                            </motion.h1>

                            <motion.p
                                className="hero-description"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                הפלטפורמה המתקדמת ביותר להתאמה בין מורות איכותיות למנהלות בתי ספר
                            </motion.p>

                            <motion.div
                                className="hero-features"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1 }}
                            >
                                <div className="feature">
                                    <div className="feature-icon-container">
                                        <User size={24} />
                                    </div>
                                    <span>מורות מקצועיות</span>
                                </div>
                                <div className="feature">
                                    <div className="feature-icon-container">
                                        <School size={24} />
                                    </div>
                                    <span>בתי ספר איכותיים</span>
                                </div>
                                <div className="feature">
                                    <div className="feature-icon-container">
                                        <MapPin size={24} />
                                    </div>
                                    <span>התאמה גיאוגרפית</span>
                                </div>
                                <div className="feature">
                                    <div className="feature-icon-container">
                                        <Award size={24} />
                                    </div>
                                    <span>תהליך מהיר ויעיל</span>
                                </div>
                            </motion.div>

                            {/* <motion.div
                                className="scroll-indicator"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                onClick={scrollToAbout}
                            >
                                <span>גלול למטה</span>
                                <ChevronDown className="scroll-arrow" size={24} />
                            </motion.div> */}

                            <motion.div
                                className="hero-buttons"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.2 }}
                            >
                                <motion.button
                                    className="primary-button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleTeacherLogin}
                                >
                                    <User size={20} />
                                    <span>כניסה למורות</span>
                                </motion.button>

                                <motion.button
                                    className="primary-button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleManagerLogin}
                                >
                                    <School size={20} />
                                    <span>כניסה למנהלות</span>
                                </motion.button>
                            </motion.div>

                        </motion.div>
                    </div>
                </section>

                <section ref={aboutRef} className="about-section">
                    <div className="about-header">
                        <h2>אודות הפלטפורמה</h2>
                        <div className="about-divider">
                            <span></span>
                            <div className="divider-icon"><School size={40} /></div>
                            <span></span>
                        </div>
                    </div>

                    <motion.div
                        className="about-grid"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="about-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="card-icon">
                                <span className="icon-bg">🎯</span>
                            </div>
                            <h3>המטרה שלנו</h3>
                            <p>
                                אנו מאמינים שכל מורה ראויה למצוא את המקום המושלם עבורה, וכל בית ספר ראוי למצוא את המורים המתאימים ביותר. הפלטפורמה שלנו נועדה לחבר בין מורות איכותיות למנהלות בתי ספר בצורה יעילה, מהירה ומדויקת.
                            </p>
                        </motion.div>

                        <motion.div
                            className="about-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="card-icon">
                                <span className="icon-bg">💼</span>
                            </div>
                            <h3>למורות</h3>
                            <p>
                                העלי את קורות החיים שלך, הצגי את הכישורים הייחודיים שלך ומצאי את בית הספר המושלם עבורך. המערכת תתאים אותך לבתי ספר בהתאם למיקום הגיאוגרפי ולדרישות המקצועיות שלך.
                            </p>
                            <ul className="feature-list">
                                <li className="feature-item">
                                    <span className="feature-check">✓</span>
                                    <span>יצירת פרופיל מקצועי מרשים</span>
                                </li>
                                <li className="feature-item">
                                    <span className="feature-check">✓</span>
                                    <span>חיפוש משרות לפי מיקום גיאוגרפי</span>
                                </li>
                                <li className="feature-item">
                                    <span className="feature-check">✓</span>
                                    <span>קבלת התראות על משרות מתאימות</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="about-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className="card-icon">
                                <span className="icon-bg">🏫</span>
                            </div>
                            <h3>למנהלות</h3>
                            <p>
                                חפשי מורות לפי קריטריונים מדויקים, כולל מיקום גיאוגרפי, ומצאי את המועמדת המושלמת לבית הספר שלך. המערכת מאפשרת לך לסנן מועמדות לפי מגוון פרמטרים ולמצוא את ההתאמה הטובה ביותר.
                            </p>
                            <ul className="feature-list">
                                <li className="feature-item">
                                    <span className="feature-check">✓</span>
                                    <span>חיפוש מתקדם לפי מגוון קריטריונים</span>
                                </li>
                                <li className="feature-item">
                                    <span className="feature-check">✓</span>
                                    <span>צפייה בקורות חיים של מורות מתאימות</span>
                                </li>
                                <li className="feature-item">
                                    <span className="feature-check">✓</span>
                                    <span>יצירת קשר ישיר עם מועמדות פוטנציאליות</span>
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="how-it-works"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h3>איך זה עובד?</h3>

                        <div className="steps-container">
                            <motion.div
                                className="step"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="step-number">1</div>
                                <h4>הרשמה</h4>
                                <p>מורות מעלות קורות חיים ומנהלות יוצרות פרופיל בית ספר</p>
                            </motion.div>

                            <div className="step-connector"></div>

                            <motion.div
                                className="step"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="step-number">2</div>
                                <h4>חיפוש והתאמה</h4>
                                <p>המערכת מתאימה בין מורות למנהלות לפי קריטריונים מדויקים</p>
                            </motion.div>

                            <div className="step-connector"></div>

                            <motion.div
                                className="step"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <div className="step-number">3</div>
                                <h4>חיבור</h4>
                                <p>יצירת קשר ישיר בין המורה למנהלת להמשך התהליך</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="cta-section"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h3>מוכנים להתחיל?</h3>
                        <p>הצטרפו לפלטפורמה והתחילו ליצור חיבורים מקצועיים משמעותיים</p>
                        <div className="cta-buttons">
                            <motion.button
                                className="cta-button teacher"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleTeacherLogin}
                            >
                                <User size={20} />
                                <span>כניסה למורות</span>
                            </motion.button>

                            <motion.button
                                className="cta-button principal"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleManagerLogin}
                            >
                                <School size={20} />
                                <span>כניסה למנהלות</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </section>

                <footer className="footer">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <img src="/logo.jpg" alt="לוגו" className="footer-logo-img" />
                            <h3>מורה בלחיצת כפתור</h3>
                        </div>
                        <p>© {new Date().getFullYear()} מורה בלחיצת כפתור. כל הזכויות שמורות.</p>
                        <div className="footer-links">
                            <a href="#">תנאי שימוש</a>
                            <a href="#">מדיניות פרטיות</a>
                            <a href="#">צור קשר</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default HomePage;
