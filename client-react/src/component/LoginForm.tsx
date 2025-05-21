

// import React, { useState } from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { InputAdornment, IconButton, Button, Container, Typography, Card, Link, Snackbar } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import FormInput from './FormInput'; // ייבוא הקומפוננטה הגנרית
// import { loginUser } from './Services/AuthService';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../component/Redux/slices/authSlice';
// import { useNavigate } from 'react-router-dom'; // הוספתי ייבוא


// // 🔹 ולידציה
// const schema = Yup.object().shape({
//     email: Yup.string().email('אימייל לא תקין').required('אימייל הוא שדה חובה'),
//     password: Yup.string().required('סיסמא היא שדה חובה'),
// });

// const LoginForm: React.FC = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate(); // ייבוא הפונקציה לניווט


//     const { control, handleSubmit, formState: { errors },reset } = useForm({
//         resolver: yupResolver(schema),
//         defaultValues: {
//             email: '',
//             password: '',
//         },
//     });

//     const [showPassword, setShowPassword] = useState(false);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const onSubmit: SubmitHandler<{ email: string; password: string }> = async (data) => {
//         try {
//             const res = await loginUser(data.email, data.password);
//             console.log('Success:', res.data); 
//             dispatch(setUser({
//                 user: res.data.user,
//                 token: res.data.token,
//             }));
               
//             reset();
//             setSnackbarMessage('התחברת בהצלחה');
//             setSnackbarOpen(true);
//             // אפשר גם לנווט פה אחרי התחברות מוצלחת אם תרצי
//              navigate('/auth/list');
//         } catch (error: any) {
//             console.log(error);
//             const errorMessage = error.response ? error.response.data : 'אירעה שגיאה ברשת';
//             setSnackbarMessage(errorMessage);
//             setSnackbarOpen(true);
//         }
//     };

//     const handleNavigateToRegister = () => {
//         navigate('/auth/data');
//     };

//     return (
//         <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
//             <Card sx={{ padding: '30px', backgroundColor: '#FFFCF5', width: '100%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
//                 <Typography variant="h4" align="center" sx={{ color: '#00A3A3', fontWeight: 'bold' }}>התחברות</Typography>
//                 <form onSubmit={handleSubmit(onSubmit)}>

//                     {/* 🔹 שדה אימייל */}
//                     <FormInput
//                         name="email"
//                         label="אימייל"
//                         control={control}
//                         error={errors.email ? errors.email.message : undefined}
//                         sx={{ marginBottom: '20px' }}
//                     />

//                     {/* 🔹 שדה סיסמא עם כפתור הצגת סיסמא */}
//                     <FormInput
//                         name="password"
//                         label="סיסמא"
//                         type={showPassword ? 'text' : 'password'}
//                         control={control}
//                         error={errors.password ? errors.password.message : undefined}
//                         endAdornment={
//                             <InputAdornment position="end">
//                                 <IconButton onClick={handleClickShowPassword} edge="end" sx={{ color: '#00A3A3' }}>
//                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                         }
//                         sx={{ marginBottom: '20px' }}
//                     />

//                     <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#00A3A3', marginTop: '20px', color: '#fff', '&:hover': { backgroundColor: '#006666' } }}>
//                         התחבר
//                     </Button>
//                 </form>

//                 <Typography align="center" sx={{ marginTop: '15px' }}>
//                     <Link
//                         onClick={handleNavigateToRegister}
//                         sx={{ color: '#00A3A3', textDecoration: 'underline', cursor: 'pointer' }}
//                     >
//                         אין לך סיסמא עדיין? לחצי כאן
//                     </Link>
//                 </Typography>

//                 <Snackbar
//                     open={snackbarOpen}
//                     autoHideDuration={6000}
//                     onClose={() => setSnackbarOpen(false)}
//                     message={snackbarMessage}
//                 />
//             </Card>
//         </Container>
        
//     );
// };

// export default LoginForm;
import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '../component/Redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './Services/AuthService';
import '../component/AuthForms.css';

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
                navigate('/auth/list');
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

    // const handleNavigateToRegister = () => {
    //     navigate('/auth/data');
    // };

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

                                {/* <div className="form-options">
                  <div className="remember-me">
                    <label className="checkbox-container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">זכור אותי</span>
                    </label>
                  </div>
                  <a href="#" className="forgot-password">שכחת סיסמא?</a>
                </div> */}

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

                            {/* <div className="auth-divider">
                <span className="divider-line"></span>
                <span className="divider-text">או</span>
                <span className="divider-line"></span>
              </div>

              <div className="social-login">
                <button className="social-button google">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"></path>
                    <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"></path>
                    <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"></path>
                    <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"></path>
                  </svg>
                  <span>התחבר עם Google</span>
                </button>
                <button className="social-button facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>התחבר עם Facebook</span>
                </button>
              </div> */}

                            <div className="auth-footer">
                                <p>אין לך חשבון עדיין?<span style={{width: '10px'}}></span> <a href="/auth/data" className="auth-link">הירשם עכשיו</a></p>
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
