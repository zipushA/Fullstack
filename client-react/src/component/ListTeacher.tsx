
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/store';
import axios from 'axios';
import '../component/ResumeLinksList.css';
import SendEmailModal from './SendEmailModal';
import { useNavigate } from 'react-router-dom';


interface Teacher {
  id: number;
  name: string;
  link: string;
  email: string;
}

interface AISummary {
  [teacherId: number]: string;
}

const ResumeLinksList: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [aiSummaries, setAiSummaries] = useState<AISummary>({});
  const [openCards, setOpenCards] = useState<{ [teacherId: number]: boolean }>({});
  const [sorting, setSorting] = useState(false);
  const [loadingAI, setLoadingAI] = useState<{ [teacherId: number]: boolean }>({});
  const [notification, setNotification] = useState<{ show: boolean; message: string; isError: boolean }>({
    show: false,
    message: '',
    isError: false
  });
  const [emailModalTeacher, setEmailModalTeacher] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Animation for background particles
    const particles = document.querySelectorAll('.resume-particle');
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

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const response = await axios.get(`https://localhost:7082/api/User/OrderData?id=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeachers(response.data);
      } catch (err: any) {
        setError(err.response?.data || 'שגיאה בטעינת נתונים');
        showNotification('שגיאה בטעינת נתונים', true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, token]);

  const showNotification = (message: string, isError: boolean) => {
    setNotification({
      show: true,
      message,
      isError
    });

    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleDownload = async (url: string, teacherName: string) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(response.data);
      link.download = url.split('/').pop() || 'file';
      link.click();
      showNotification(`קורות החיים של ${teacherName} הורדו בהצלחה`, false);
    } catch {
      showNotification('שגיאה בהורדת הקובץ', true);
    }
  };

  const handleAISummary = async (teacher: Teacher) => {
    setLoadingAI(prev => ({ ...prev, [teacher.id]: true }));
    setAiSummaries((prev) => ({ ...prev, [teacher.id]: '' }));
    try {
      const response = await axios.get('https://localhost:7082/api/AI/summary', {
        params: { resumeUrl: teacher.link },
      });
      setAiSummaries((prev) => ({ ...prev, [teacher.id]: response.data.summary }));
      setOpenCards((prev) => ({ ...prev, [teacher.id]: true }));
    } catch (err: any) {
      setAiSummaries((prev) => ({ ...prev, [teacher.id]: 'שגיאה בניתוח קובץ' }));
      showNotification('שגיאה בניתוח קובץ באמצעות AI', true);
    } finally {
      setLoadingAI(prev => ({ ...prev, [teacher.id]: false }));
    }
  };

  const handleSortByDistance = async () => {
    if (!user) return;
    setSorting(true);
    try {
      const response = await axios.get('https://localhost:7082/api/Matching/sorted-teachers', {
        params: { principalId: user.id },
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(response.data);
      showNotification('המורות מוינו לפי קרבה גיאוגרפית', false);
    } catch (err: any) {
      setError(err.response?.data || 'שגיאה בסידור לפי קרבה');
      showNotification('שגיאה בסידור לפי קרבה', true);
    } finally {
      setSorting(false);
    }
  };

  const toggleCard = (teacherId: number) => {
    setOpenCards(prev => ({ ...prev, [teacherId]: !prev[teacherId] }));
  };

  return (
    <div className="resume-page">
      {/* Background Elements */}
      <div className="resume-background">
        <div className="resume-circle resume-circle-1"></div>
        <div className="resume-circle resume-circle-2"></div>
        <div className="resume-circle resume-circle-3"></div>

        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <div key={i} className="resume-particle"></div>
        ))}
      </div>

      <div className="resume-container">
        <div className="resume-header">
          <div className="resume-logo">
            <div className="resume-logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </div>
          </div>
          <h1 className="resume-title">קורות חיים של מורות מתאימות</h1>
          <p className="resume-subtitle">כאן תוכלו למצוא את כל קורות החיים של המורות המתאימות לדרישות שלכם</p>
        </div>

        <div className="resume-actions">
          <button
            className={`sort-button ${sorting ? 'loading' : ''}`}
            onClick={handleSortByDistance}
            disabled={sorting}
          >
            {sorting ? (
              <div className="button-loader">
                <div className="spinner"></div>
              </div>
            ) : (
              <>
                <div className="button-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span>סידור לפי קרבה גיאוגרפית</span>
              </>
            )}
          </button>
        </div>

        {loading ? (
          <div className="resume-loading">
            <div className="resume-spinner"></div>
            <p>טוען רשימת מורות...</p>
          </div>
        ) : error ? (
          <div className="resume-error">
            <div className="error-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <p>{error}</p>
          </div>
        ) : teachers.length === 0 ? (
          <div className="resume-empty">
            <div className="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 15h8"></path>
                <path d="M9 9h.01"></path>
                <path d="M15 9h.01"></path>
              </svg>
            </div>
            <p>לא נמצאו מורות תואמות.</p>
          </div>
        ) : (
          <div className="resume-list">
            {teachers.map((teacher) => (
              <div key={teacher.id} className={`resume-card ${openCards[teacher.id] ? 'expanded' : ''}`}>
                <div className="resume-card-header">
                  <div className="teacher-avatar">
                    {teacher.name.charAt(0)}
                  </div>
                  <div className="teacher-info">
                    <h3 className="teacher-name">{teacher.name}</h3>
                    <div className="teacher-actions">
                      <a href={teacher.link} target="_blank" rel="noopener" className="view-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <span>צפייה בקו"ח</span>
                      </a>
                      <button
                        className="download-button"
                        onClick={() => handleDownload(teacher.link, teacher.name)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        <span>הורדה</span>
                      </button>
                      <button
                        className={`ai-button ${loadingAI[teacher.id] ? 'loading' : ''}`}
                        onClick={() => handleAISummary(teacher)}
                        disabled={loadingAI[teacher.id]}
                      >
                        {loadingAI[teacher.id] ? (
                          <div className="button-loader">
                            <div className="spinner"></div>
                          </div>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="3" y1="9" x2="21" y2="9"></line>
                              <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                            <span>ניתוח AI</span>
                          </>
                        )}
                      </button>
                      <button
                        className="email-button"
                        onClick={() => setEmailModalTeacher({ name: teacher.name, email: teacher.email })}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16v16H4z" fill="none" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <span>שליחת מייל</span>
                      </button>
                    </div>
                  </div>
                  <button
                    className={`toggle-button ${openCards[teacher.id] ? 'open' : ''}`}
                    onClick={() => toggleCard(teacher.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>

                {openCards[teacher.id] && (
                  <div className="resume-card-content">
                    <div className="ai-summary">
                      <div className="ai-summary-header">
                        <div className="ai-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                            <path d="M12 2a10 10 0 0 1 10 10h-10V2z"></path>
                            <path d="M12 12l0 10"></path>
                            <path d="M12 12l10 0"></path>
                          </svg>
                        </div>
                        <h4>סיכום AI</h4>
                      </div>
                      <div className="ai-summary-content">
                        {aiSummaries[teacher.id] ? (
                          <p>{aiSummaries[teacher.id]}</p>
                        ) : (
                          <div className="ai-loading">
                            <div className="ai-spinner"></div>
                            <p>מנתח את קורות החיים...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {notification.show && (
        <div className={`resume-notification ${notification.isError ? 'error' : 'success'}`}>
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
      {emailModalTeacher && (
        <SendEmailModal
          open={true}
          onClose={() => setEmailModalTeacher(null)}
          teacherEmail={emailModalTeacher.email}
          teacherName={emailModalTeacher.name}
        />
      )}

    </div>
  );
};

export default ResumeLinksList;
