
import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './Redux/slices/authSlice';
import { RootState } from './Redux/store';
import { registerUser } from './Services/AuthService';
import { UserPostModel, UserRegister } from '../models/UserType';
import '../component/AuthForms.css';
import RequestService from './Services/RequestService';

// ולידציה
const schema = Yup.object().shape({
  name: Yup.string().required('שם הוא שדה חובה'),
  email: Yup.string().email('אימייל לא תקין').required('אימייל הוא שדה חובה'),
  password: Yup.string().required('סיסמא היא שדה חובה'),
  matchingDataId: Yup.number().required('dataId הוא שדה חובה'),
  link: Yup.string().required('קישור הוא שדה חובה'),
  role: Yup.string().oneOf(['teacher', 'principal'], 'תפקיד לא תקין').required('תפקיד הוא שדה חובה'),
});

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const storedDataId = sessionStorage.getItem('dataId');
  const matchingDataId = storedDataId ? parseInt(storedDataId, 10) : 0;
  const userRole = useSelector((state: RootState) => state.auth.userType);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserRegister>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      matchingDataId: matchingDataId,
      link: '',
      role: userRole || 'teacher'
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean; message: string; isError: boolean }>({
    show: false,
    message: '',
    isError: false
  });
  const [fileName, setFileName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [progress, setProgress] = useState(0);
  const linkValue = watch('link');
  const passwordValue = watch('password');

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

  // Password strength checker
  useEffect(() => {
    if (!passwordValue) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    
    // Length check
    if (passwordValue.length >= 8) strength += 1;
    
    // Contains number
    if (/\d/.test(passwordValue)) strength += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(passwordValue)) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(passwordValue)) strength += 1;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(passwordValue)) strength += 1;
    
    setPasswordStrength(strength);
  }, [passwordValue]);

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'חלשה';
    if (passwordStrength <= 4) return 'בינונית';
    return 'חזקה';
  };

  const getPasswordStrengthClass = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'weak';
    if (passwordStrength <= 4) return 'medium';
    return 'strong';
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(0)
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
       const presignedUrl = await RequestService.getPresignedUrl(file.name, file.type);
      await RequestService.uploadFile(presignedUrl, file, setProgress);
      const publicUrl = `https://zipushresume.s3.amazonaws.com/resume/${file.name}`; // החלף ל-S3 שלך
      setValue('link', publicUrl);
    }
  };
  const onSubmit: SubmitHandler<UserRegister> = async (data) => {
    setIsLoading(true);
    try {
      const userPostModel: UserPostModel = {
        name: data.name,
        email: data.email,
        password: data.password,
        matchingDataId: data.matchingDataId,
        link: data.link
      };

      const res = await registerUser(userPostModel, data.role);
      dispatch(setUser({
        user: res.data.user,
        token: res.data.token,
      }));
      
      setNotification({
        show: true,
        message: 'הרשמה הצליחה!',
        isError: false
      });
      
      // הסתרת ההודעה אחרי 3 שניות
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);
      
    } catch (error: any) {
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
      <div className="auth-background">
        <div className="auth-circle auth-circle-1"></div>
        <div className="auth-circle auth-circle-2"></div>
        <div className="auth-circle auth-circle-3"></div>
        
        {[...Array(15)].map((_, i) => (
          <div key={i} className="auth-particle"></div>
        ))}
      </div>
      
      <div className="auth-container">
        <div className="auth-card-wrapper">
          <div className="auth-card register-card">
            <div className="auth-card-inner">
              <div className="auth-header">
                <div className="auth-logo">
                  <div className="auth-logo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <line x1="20" y1="8" x2="20" y2="14"></line>
                      <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                  </div>
                </div>
                <h1 className="auth-title">הרשמה</h1>
                <p className="auth-subtitle">צור חשבון חדש ותתחיל להשתמש בפלטפורמה</p>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <div className="form-row">
                  <div className={`form-floating-group ${activeField === 'name' ? 'active' : ''} ${errors.name ? 'error' : ''}`}>
                    <input
                      id="name"
                      type="text"
                      {...register("name")}
                      placeholder=" "
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                    />
                    <label htmlFor="name">שם מלא</label>
                    <div className="form-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    {errors.name && <div className="form-error">{errors.name.message}</div>}
                  </div>
                </div>

                <div className="form-row">
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
                </div>

                <div className="form-row">
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
                </div>

                {passwordValue && (
                  <div className="password-strength">
                    <div className="strength-meter">
                      <div className={`strength-bar ${getPasswordStrengthClass()}`} style={{ width: `${(passwordStrength / 5) * 100}%` }}></div>
                    </div>
                    <div className="strength-text">
                      <span>חוזק הסיסמה: </span>
                      <span className={getPasswordStrengthClass()}>{getPasswordStrengthText()}</span>
                    </div>
                  </div>
                )}

                <div className="form-row">
                  <div className="file-upload-wrapper">
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileUpload}
                      className="file-input"
                    />
                    <label htmlFor="file-upload" className="file-upload-label">
                      <div className="file-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                      </div>
                      <div className="file-info">
                        <span className="file-title">{fileName || 'העלאת קובץ'}</span>
                        <span className="file-subtitle">{fileName ? 'הקובץ נבחר' : 'גרור קובץ לכאן או לחץ לבחירה'}</span>
                      </div>
                    </label>
                  </div>
                </div>

                {linkValue && (
                  <div className="form-row">
                    <div className="link-preview">
                      <div className="link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                      </div>
                      <div className="link-text">
                        <span className="link-title">קישור לקובץ</span>
                        <span className="link-url">{linkValue}</span>
                      </div>
                    </div>
                  </div>
                )}

                <input type="hidden" {...register("matchingDataId")} />
                <input type="hidden" {...register("role")} />

                {/* <div className="form-row">
                  <div className="terms-checkbox">
                    <label className="checkbox-container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">אני מסכים/ה ל<a href="#">תנאי השימוש</a> ול<a href="#">מדיניות הפרטיות</a></span>
                    </label>
                  </div>
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
                  ) : 'הרשמה'}
                </button>
              </form>

              <div className="auth-footer">
                <p>יש לך כבר חשבון?<span style={{width: '10px'}}></span> <a href="/auth/login" className="auth-link">התחבר</a></p>
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

export default RegisterForm;