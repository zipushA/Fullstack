
// import { useState, useEffect } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import matchingService from '../component/Services/matchingService';
// import { useNavigate } from 'react-router-dom';
// import { Data } from '../models/dataType';
// import '../component/AuthForms.css';
// import '../component/MatchingForm.css';

// // ולידציה
// const schema = Yup.object().shape({
//   seniority: Yup.number().required('ניסיון הוא שדה חובה').min(0, 'המספר חייב להיות חיובי'),
//   isBoys: Yup.boolean().required('שדה חובה'),
//   isKeruv: Yup.boolean().required('שדה חובה'),
//   residentialArea: Yup.string().required('אזור מגורים הוא שדה חובה'),
// });

// const MatchingForm = () => {
//   const navigate = useNavigate();

//   const { control, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       seniority: 0,
//       isBoys: false,
//       isKeruv: false,
//       residentialArea: '',
//     },
//   });

//   const [notification, setNotification] = useState<{ show: boolean; message: string; isError: boolean }>({
//     show: false,
//     message: '',
//     isError: false
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeField, setActiveField] = useState<string | null>(null);

//   // Animation for background particles
//   useEffect(() => {
//     const particles = document.querySelectorAll('.auth-particle');
//     particles.forEach((particle: any) => {
//       const randomX = Math.random() * 100;
//       const randomY = Math.random() * 100;
//       const randomDelay = Math.random() * 5;
//       const randomDuration = 15 + Math.random() * 15;

//       particle.style.left = `${randomX}%`;
//       particle.style.top = `${randomY}%`;
//       particle.style.animationDelay = `${randomDelay}s`;
//       particle.style.animationDuration = `${randomDuration}s`;
//     });
//   }, []);

//   const onSubmit = async (data: Data) => {
//     setIsLoading(true);
//     try {
//       const createdData = await matchingService.submitMatchingData(data);
//       console.log('נתונים נשלחו בהצלחה:', createdData);
//       sessionStorage.setItem("dataId", createdData.id?.toString() ?? "");
      
//       setNotification({
//         show: true,
//         message: 'הנתונים נשלחו בהצלחה!',
//         isError: false
//       });
      
//       // הסתרת ההודעה אחרי 3 שניות
//       setTimeout(() => {
//         setNotification(prev => ({ ...prev, show: false }));
//         navigate('/auth/register');
//       }, 3000);
      
//     } catch (error: any) {
//       console.error('שגיאה בשליחת הנתונים:', error);
      
//       const errorMessage = error.response ? error.response.data : 'אירעה שגיאה בשליחת הנתונים';
//       setNotification({
//         show: true,
//         message: errorMessage,
//         isError: true
//       });
      
//       // הסתרת הודעת השגיאה אחרי 5 שניות
//       setTimeout(() => {
//         setNotification(prev => ({ ...prev, show: false }));
//       }, 5000);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       {/* Background Elements */}
//       <div className="auth-background">
//         <div className="auth-circle auth-circle-1"></div>
//         <div className="auth-circle auth-circle-2"></div>
//         <div className="auth-circle auth-circle-3"></div>
        
//         {/* Animated particles */}
//         {[...Array(15)].map((_, i) => (
//           <div key={i} className="auth-particle"></div>
//         ))}
//       </div>
      
//       <div className="auth-container">
//         <div className="auth-card-wrapper">
//           <div className="auth-card">
//             <div className="auth-card-inner">
//               <div className="auth-header">
//                 <div className="auth-logo">
//                   <div className="auth-logo-icon">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                       <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                     </svg>
//                   </div>
//                 </div>
//                 <h1 className="auth-title">טופס התאמה</h1>
//                 <p className="auth-subtitle">אנא מלאו את הפרטים הבאים כדי שנוכל להתאים לכם את המשרה המתאימה ביותר</p>
//               </div>
              
//               <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
//                 <div className="form-row">
//                   <div className={`form-floating-group ${activeField === 'seniority' ? 'active' : ''} ${errors.seniority ? 'error' : ''}`}>
//                     <Controller
//                       name="seniority"
//                       control={control}
//                       render={({ field }) => (
//                         <input
//                           id="seniority"
//                           type="number"
//                           {...field}
//                           placeholder=" "
//                           onFocus={() => setActiveField('seniority')}
//                           onBlur={() => setActiveField(null)}
//                         />
//                       )}
//                     />
//                     <label htmlFor="seniority">ותק (בשנים)</label>
//                     <div className="form-icon">
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <circle cx="12" cy="12" r="10"></circle>
//                         <polyline points="12 6 12 12 16 14"></polyline>
//                       </svg>
//                     </div>
//                     {errors.seniority && <div className="form-error">{errors.seniority.message}</div>}
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className={`form-floating-group ${activeField === 'residentialArea' ? 'active' : ''} ${errors.residentialArea ? 'error' : ''}`}>
//                     <Controller
//                       name="residentialArea"
//                       control={control}
//                       render={({ field }) => (
//                         <input
//                           id="residentialArea"
//                           type="text"
//                           {...field}
//                           placeholder=" "
//                           onFocus={() => setActiveField('residentialArea')}
//                           onBlur={() => setActiveField(null)}
//                         />
//                       )}
//                     />
//                     <label htmlFor="residentialArea">אזור מגורים</label>
//                     <div className="form-icon">
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//                         <circle cx="12" cy="10" r="3"></circle>
//                       </svg>
//                     </div>
//                     {errors.residentialArea && <div className="form-error">{errors.residentialArea.message}</div>}
//                   </div>
//                 </div>

//                 <div className="form-row">
//                   <div className="checkbox-group">
//                     <div className="checkbox-title">אפשרויות נוספות</div>
                    
//                     <div className="checkbox-item">
//                       <Controller
//                         name="isBoys"
//                         control={control}
//                         render={({ field: { onChange, value, ref } }) => (
//                           <label className="checkbox-container">
//                             <input
//                               type="checkbox"
//                               onChange={onChange}
//                               checked={value}
//                               ref={ref}
//                             />
//                             <span className="checkmark"></span>
//                             <span className="checkbox-text">מתאים לבנים</span>
//                           </label>
//                         )}
//                       />
//                       {errors.isBoys && <div className="form-error">{errors.isBoys.message}</div>}
//                     </div>
                    
//                     <div className="checkbox-item">
//                       <Controller
//                         name="isKeruv"
//                         control={control}
//                         render={({ field: { onChange, value, ref } }) => (
//                           <label className="checkbox-container">
//                             <input
//                               type="checkbox"
//                               onChange={onChange}
//                               checked={value}
//                               ref={ref}
//                             />
//                             <span className="checkmark"></span>
//                             <span className="checkbox-text">תוכנית קירוב</span>
//                           </label>
//                         )}
//                       />
//                       {errors.isKeruv && <div className="form-error">{errors.isKeruv.message}</div>}
//                     </div>
//                   </div>
//                 </div>

//                 <button 
//                   type="submit" 
//                   className={`auth-button ${isLoading ? 'loading' : ''}`}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <div className="button-loader">
//                       <div className="spinner"></div>
//                     </div>
//                   ) : 'שלח ועבור להרשמה'}
//                 </button>
//               </form>
//             </div>
//           </div>
          
//           <div className="auth-decoration">
//             <div className="decoration-image">
//               <img src="/logo.jpg" alt="לוגו מורה בלחיצת כפתור" />
//             </div>
//             <div className="decoration-content">
//               <h2>מורה בלחיצת כפתור</h2>
//               <p>הפלטפורמה המתקדמת ביותר להתאמה בין מורות איכותיות למנהלות בתי ספר</p>
//               <div className="decoration-features">
//                 <div className="feature-item">
//                   <div className="feature-icon">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                       <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                     </svg>
//                   </div>
//                   <div className="feature-text">התאמה מדויקת</div>
//                 </div>
//                 <div className="feature-item">
//                   <div className="feature-icon">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <circle cx="12" cy="12" r="10"></circle>
//                       <polyline points="12 6 12 12 16 14"></polyline>
//                     </svg>
//                   </div>
//                   <div className="feature-text">חיסכון בזמן</div>
//                 </div>
//                 <div className="feature-item">
//                   <div className="feature-icon">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                       <circle cx="9" cy="7" r="4"></circle>
//                       <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//                       <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//                     </svg>
//                   </div>
//                   <div className="feature-text">מועמדים איכותיים</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {notification.show && (
//         <div className={`notification ${notification.isError ? 'error' : 'success'}`}>
//           <div className="notification-icon">
//             {notification.isError ? (
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="10"></circle>
//                 <line x1="15" y1="9" x2="9" y2="15"></line>
//                 <line x1="9" y1="9" x2="15" y2="15"></line>
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                 <polyline points="22 4 12 14.01 9 11.01"></polyline>
//               </svg>
//             )}
//           </div>
//           <div className="notification-content">
//             <p>{notification.message}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MatchingForm;
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import matchingService from '../component/Services/matchingService';
import { useNavigate } from 'react-router-dom';
import { Data } from '../models/dataType';
import '../component/AuthForms.css';
import '../component/MatchingForm.css';
// import { useSelector } from 'react-redux';
// import { RootState } from './Redux/store';

// ולידציה
const schema = Yup.object().shape({
  seniority: Yup.number().required('ניסיון הוא שדה חובה').min(0, 'המספר חייב להיות חיובי'),
  isBoys: Yup.boolean().required('שדה חובה'),
  isKeruv: Yup.boolean().required('שדה חובה'),
  residentialArea: Yup.string().required('אזור מגורים הוא שדה חובה'),
});

const MatchingForm = () => {
  const navigate = useNavigate();

const userType = sessionStorage.getItem("userType")
  const isTeacher = userType === "teacher";
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      seniority: 0,
      isBoys: false,
      isKeruv: false,
      residentialArea: '',
    },
  });

  const [notification, setNotification] = useState<{ show: boolean; message: string; isError: boolean }>({
    show: false,
    message: '',
    isError: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

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

  const onSubmit = async (data: Data) => {
    setIsLoading(true);
    try {
      const createdData = await matchingService.submitMatchingData(data);
      console.log('נתונים נשלחו בהצלחה:', createdData);
      sessionStorage.setItem("dataId", createdData.id?.toString() ?? "");

      setNotification({
        show: true,
        message: 'הנתונים נשלחו בהצלחה!',
        isError: false
      });

      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
        navigate('/auth/register');
      }, 3000);

    } catch (error: any) {
      console.error('שגיאה בשליחת הנתונים:', error);

      const errorMessage = error.response ? error.response.data : 'אירעה שגיאה בשליחת הנתונים';
      setNotification({
        show: true,
        message: errorMessage,
        isError: true
      });

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
          <div className="auth-card">
            <div className="auth-card-inner">
              <div className="auth-header">
                <div className="auth-logo">
                  <div className="auth-logo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                </div>
                <h1 className="auth-title">
                  {isTeacher ? "טופס התאמה למורה" : "דרישות המנהלת ופרטי בית הספר"}
                </h1>
                <p className="auth-subtitle">
                  {isTeacher
                    ? "אנא מלאי את הפרטים הבאים כדי שנוכל להתאים לך את המשרה המתאימה ביותר"
                    : "אנא מלאי את הדרישות לאיוש המשרה והפרטים על בית הספר שלך"}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <div className="form-row">
                  <div className={`form-floating-group ${activeField === 'seniority' ? 'active' : ''} ${errors.seniority ? 'error' : ''}`}>
                    <Controller
                      name="seniority"
                      control={control}
                      render={({ field }) => (
                        <input
                          id="seniority"
                          type="number"
                          {...field}
                          placeholder=" "
                          onFocus={() => setActiveField('seniority')}
                          onBlur={() => setActiveField(null)}
                        />
                      )}
                    />
                    <label htmlFor="seniority">ותק (בשנים)</label>
                    <div className="form-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    {errors.seniority && <div className="form-error">{errors.seniority.message}</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className={`form-floating-group ${activeField === 'residentialArea' ? 'active' : ''} ${errors.residentialArea ? 'error' : ''}`}>
                    <Controller
                      name="residentialArea"
                      control={control}
                      render={({ field }) => (
                        <input
                          id="residentialArea"
                          type="text"
                          {...field}
                          placeholder=" "
                          onFocus={() => setActiveField('residentialArea')}
                          onBlur={() => setActiveField(null)}
                        />
                      )}
                    />
                    <label htmlFor="residentialArea">
                      {isTeacher ? "אזור מגורים" : "אזור בית הספר"}
                    </label>
                    <div className="form-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    {errors.residentialArea && <div className="form-error">{errors.residentialArea.message}</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="checkbox-group">
                    <div className="checkbox-title">אפשרויות נוספות</div>

                    <div className="checkbox-item">
                      <Controller
                        name="isBoys"
                        control={control}
                        render={({ field: { onChange, value, ref } }) => (
                          <label className="checkbox-container">
                            <input
                              type="checkbox"
                              onChange={onChange}
                              checked={value}
                              ref={ref}
                            />
                            <span className="checkmark"></span>
                            <span className="checkbox-text">
                              {isTeacher ? " מלמדת בנים" : "מיועד לכיתה של בנים"}
                            </span>
                          </label>
                        )}
                      />
                      {errors.isBoys && <div className="form-error">{errors.isBoys.message}</div>}
                    </div>

                    <div className="checkbox-item">
                      <Controller
                        name="isKeruv"
                        control={control}
                        render={({ field: { onChange, value, ref } }) => (
                          <label className="checkbox-container">
                            <input
                              type="checkbox"
                              onChange={onChange}
                              checked={value}
                              ref={ref}
                            />
                            <span className="checkmark"></span>
                            <span className="checkbox-text">
                              {isTeacher ? " מתאימה לקרוב" : "תפקיד במסגרת בית ספר קירוב"}
                            </span>
                          </label>
                        )}
                      />
                      {errors.isKeruv && <div className="form-error">{errors.isKeruv.message}</div>}
                    </div>
                  </div>
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
                  ) : 'שלח ועבור להרשמה'}
                </button>
              </form>
            </div>
          </div>

          <div className="auth-decoration">
            <div className="decoration-image">
              <img src="/logo.jpg" alt="לוגו מורה בלחיצת כפתור" />
            </div>
            <div className="decoration-content">
              <h2>מורה בלחיצת כפתור</h2>
              <p>הפלטפורמה המתקדמת ביותר להתאמה בין מורות איכותיות למנהלות בתי ספר</p>
              <div className="decoration-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className="feature-text">התאמה מדויקת</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="feature-text">חיסכון בזמן</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="feature-text">מועמדים איכותיים</div>
                </div>
              </div>
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

export default MatchingForm;
