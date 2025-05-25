
"use client"

import  React from "react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "./Redux/store"
//import { Card, CardContent, CardHeader, CardTitle } from "./UI/Card"
import { Badge } from "./UI/Badge"
//import { Separator } from "./UI/Saparator"
import { User, Mail, Calendar, MapPin, Users, Heart, Edit3, Shield, Award, Eye } from "lucide-react"
import matchingService, { type MatchingData } from "./Services/matchingService"
import "./Profile.css"
import { Button } from "./UI/Button"
import { useNavigate } from "react-router-dom"
const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const role=useSelector((state: RootState) => state.auth.userType)
  console.log("roleeee",role);
  
  const [matchingData, setMatchingData] = useState<MatchingData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
const navigate=useNavigate();
  useEffect(() => {
    // Animation for background particles
    const particles = document.querySelectorAll(".profile-particle")
    particles.forEach((particle: any) => {
      const randomX = Math.random() * 100
      const randomY = Math.random() * 100
      const randomDelay = Math.random() * 5
      const randomDuration = 15 + Math.random() * 15

      particle.style.left = `${randomX}%`
      particle.style.top = `${randomY}%`
      particle.style.animationDelay = `${randomDelay}s`
      particle.style.animationDuration = `${randomDuration}s`
    })
  }, [])

  useEffect(() => {
    const fetchMatchingData = async () => {
      if (user?.matchingDataId) {
        try {
          setIsLoading(true)
          const data = await matchingService.getMatchingDataById(user.matchingDataId)
          setMatchingData(data)
        } catch (err: any) {
          setError("שגיאה בטעינת נתוני התאמה")
          console.error(err.message)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    fetchMatchingData()
  }, [user])

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-background">
          <div className="profile-circle profile-circle-1"></div>
          <div className="profile-circle profile-circle-2"></div>
          <div className="profile-circle profile-circle-3"></div>
          {[...Array(15)].map((_, i) => (
            <div key={i} className="profile-particle"></div>
          ))}
        </div>

        <div className="profile-container">
          <div className="profile-empty">
            <div className="empty-icon">
              <User />
            </div>
            <h3>לא מחובר למערכת</h3>
            <p>אנא התחבר כדי לצפות בפרופיל</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      {/* Background Elements */}
      <div className="profile-background">
        <div className="profile-circle profile-circle-1"></div>
        <div className="profile-circle profile-circle-2"></div>
        <div className="profile-circle profile-circle-3"></div>

        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <div key={i} className="profile-particle"></div>
        ))}
      </div>

      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-logo">
            <div className="profile-logo-icon">
              <User />
            </div>
          </div>
          <h1 className="profile-title">פרופיל משתמש</h1>
          <p className="profile-subtitle">כאן תוכל לצפות ולנהל את הפרטים האישיים שלך</p>
        </div>

        {/* Profile Actions */}
        <div className="profile-actions">
          <Button className="action-button edit-button" onClick={()=>navigate('/Auth/edit')}>
            <div className="button-icon">
              <Edit3 />
            </div>
            <span>עריכת פרופיל</span>
          </Button>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Personal Info Card */}
          <div className={`profile-card ${expandedSection === "personal" ? "expanded" : ""}`}>
            <div className="profile-card-header">
              <div className="user-avatar">{user.name.charAt(0)}</div>
              <div className="user-info">
                <h3 className="user-name">{user.name}</h3>
                <div className="user-role">
                  <Badge className={`role-badge ${role}`}>
                    {role === "teacher" ? (
                      <>
                        <Award className="badge-icon" />
                        <span>מורה</span>
                      </>
                    ) : (
                      <>
                        <Shield className="badge-icon" />
                        <span>מנהל</span>
                      </>
                    )}
                  </Badge>
                </div>
                <div className="user-actions">
                  <div className="info-item email">
                    <Mail className="info-icon" />
                    <span>{user.email}</span>
                  </div>
                  {user.link && (
                    <a href={user.link} target="_blank" rel="noreferrer noopener" className="info-link">
                      <Eye className="info-icon" />
                      <span>צפייה בקו"ח</span>
                    </a>
                  )}
                </div>
              </div>
              <button
                className={`toggle-button ${expandedSection === "personal" ? "open" : ""}`}
                onClick={() => toggleSection("personal")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>

            {expandedSection === "personal" && (
              <div className="profile-card-content">
                <div className="personal-details">
                  <div className="detail-header">
                    <div className="detail-icon">
                      <User />
                    </div>
                    <h4>פרטים אישיים</h4>
                  </div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">שם מלא</span>
                      <span className="detail-value">{user.name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">אימייל</span>
                      <span className="detail-value">{user.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">תפקיד</span>
                      <span className="detail-value">{user.role === "teacher" ? "מורה" : "מנהל"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Matching Data Card */}
          {isLoading ? (
            <div className="profile-loading">
              <div className="profile-spinner"></div>
              <p>טוען נתוני התאמה...</p>
            </div>
          ) : matchingData ? (
            <div className={`profile-card ${expandedSection === "matching" ? "expanded" : ""}`}>
              <div className="profile-card-header">
                <div className="matching-avatar">
                  <Heart />
                </div>
                <div className="matching-info">
                  <h3 className="matching-title">נתוני התאמה</h3>
                  <div className="matching-stats">
                    <div className="stat-item">
                      <Calendar className="stat-icon" />
                      <span>{matchingData.seniority} שנות ותק</span>
                    </div>
                    <div className="stat-item">
                      <MapPin className="stat-icon" />
                      <span>{matchingData.residentialArea}</span>
                    </div>
                  </div>
                </div>
                <button
                  className={`toggle-button ${expandedSection === "matching" ? "open" : ""}`}
                  onClick={() => toggleSection("matching")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>

              {expandedSection === "matching" && (
                <div className="profile-card-content">
                  <div className="matching-details">
                    <div className="detail-header">
                      <div className="detail-icon">
                        <Heart />
                      </div>
                      <h4>פרטי התאמה מלאים</h4>
                    </div>
                    <div className="preferences-grid">
                      <div className={`preference-card ${matchingData.isBoys ? "active" : "inactive"}`}>
                        <div className="preference-icon">
                          <Users />
                        </div>
                        <div className="preference-content">
                          <span className="preference-label">מיועד לבנים</span>
                          <div className="preference-status">
                            <div className={`status-indicator ${matchingData.isBoys ? "active" : ""}`}></div>
                            <span className="status-text">{matchingData.isBoys ? "כן" : "לא"}</span>
                          </div>
                        </div>
                      </div>

                      <div className={`preference-card ${matchingData.isKeruv ? "active" : "inactive"}`}>
                        <div className="preference-icon">
                          <Heart />
                        </div>
                        <div className="preference-content">
                          <span className="preference-label">תוכנית קירוב</span>
                          <div className="preference-status">
                            <div className={`status-indicator ${matchingData.isKeruv ? "active" : ""}`}></div>
                            <span className="status-text">{matchingData.isKeruv ? "כן" : "לא"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="profile-error">
              <div className="error-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <p>{error || "לא נמצאו נתוני התאמה"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
