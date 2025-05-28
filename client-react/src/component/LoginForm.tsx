
import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '../component/Redux/slices/authSlice';
import { loginUser } from './Services/AuthService';
import '../component/AuthForms.css';
import { useNavigate } from 'react-router-dom';

// ולידציה
const schema = Yup.object().shape({
    email: Yup.string().email('אימייל לא תקין').required('אימייל הוא שדה חובה'),
    password: Yup.string().required('סיסמא היא שדה חובה'),
});
const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState<{ show: boolean; message: string; isError: boolean }>({
        show: false,
        message: '',
        isError: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [activeField, setActiveField] = useState<string | null>(null);

    // Animation for background particles
    useEffect(() => {
        const particles = document.querySelectorAll('.auth-particle');
        particles.forEach((particle: any) => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            const randomDelay = Math.random() * 5;
            const randomDuration = 15 + Math.random() * 15;

            particle.style.left = `${randomX}%`;
            particle.style.top = `${randomY}%`;
            particle.style.animationDelay = `${randomDelay}s`;
            particle.style.animationDuration = `${randomDuration}s`;
        });
    }, []);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit: SubmitHandler<{ email: string; password: string }> = async (data) => {
        setIsLoading(true);
        try {
            const res = await loginUser(data.email, data.password);
            dispatch(setUser({
                user: res.data.user,
                token: res.data.token,
            }));

            reset();

            setNotification({
                show: true,
                message: 'התחברת בהצלחה',
                isError: false
            });

            // הסתרת ההודעה אחרי 3 שניות
            setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
                  navigate('/auth/about');
            }, 3000);

        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response ? error.response.data : 'אירעה שגיאה ברשת';
            setNotification({
                show: true,
                message: errorMessage,
                isError: true
            });

            // הסתרת הודעת השגיאה אחרי 5 שניות
            setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 5000);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="auth-page">
            {/* Background Elements */}
            <div className="auth-background">
                <div className="auth-circle auth-circle-1"></div>
                <div className="auth-circle auth-circle-2"></div>
                <div className="auth-circle auth-circle-3"></div>

                {/* Animated particles */}
                {[...Array(15)].map((_, i) => (
                    <div key={i} className="auth-particle"></div>
                ))}
            </div>

            <div className="auth-container">
                <div className="auth-card-wrapper">
                    <div className="auth-card">
                        <div className="auth-card-inner">
                            <div className="auth-header">
                                <div className="auth-logo">
                                    <div className="auth-logo-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </div>
                                </div>
                                <h1 className="auth-title">התחברות</h1>
                                <p className="auth-subtitle">ברוכים הבאים! אנא הזינו את פרטי ההתחברות שלכם</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                                <div className={`form-floating-group ${activeField === 'email' ? 'active' : ''} ${errors.email ? 'error' : ''}`}>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register("email")}
                                        placeholder=" "
                                        onFocus={() => setActiveField('email')}
                                        onBlur={() => setActiveField(null)}
                                    />
                                    <label htmlFor="email">אימייל</label>
                                    <div className="form-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                    </div>
                                    {errors.email && <div className="form-error">{errors.email.message}</div>}
                                </div>

                                <div className={`form-floating-group ${activeField === 'password' ? 'active' : ''} ${errors.password ? 'error' : ''}`}>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register("password")}
                                        placeholder=" "
                                        onFocus={() => setActiveField('password')}
                                        onBlur={() => setActiveField(null)}
                                    />
                                    <label htmlFor="password">סיסמא</label>
                                    <div className="form-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                    </div>
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        )}
                                    </button>
                                    {errors.password && <div className="form-error">{errors.password.message}</div>}
                                </div>
                                <button
                                    type="submit"
                                    className={`auth-button ${isLoading ? 'loading' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="button-loader">
                                            <div className="spinner"></div>
                                        </div>
                                    ) : 'התחבר'}
                                </button>
                            </form>

                            <div className="auth-footer">
                                <p>אין לך חשבון עדיין?<span style={{ width: '10px' }}></span> <a href="/auth/data" className="auth-link">הירשם עכשיו</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="auth-decoration">
                        <div className="decoration-image">
                            <img src="/logo.jpg" alt="לוגו מורה בלחיצת כפתור" />
                        </div>
                        <div className="decoration-content">
                            <h2>מורה בלחיצת כפתור</h2>
                            <p>הפלטפורמה המתקדמת ביותר להתאמה בין מורות איכותיות למנהלות בתי ספר</p>
                        </div>
                    </div>
                </div>
            </div>

            {notification.show && (
                <div className={`notification ${notification.isError ? 'error' : 'success'}`}>
                    <div className="notification-icon">
                        {notification.isError ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        )}
                    </div>
                    <div className="notification-content">
                        <p>{notification.message}</p>
                    </div>
                </div>
            )}

        </div>

    );
};

export default LoginForm;
