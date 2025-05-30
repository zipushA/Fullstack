
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "./Redux/store"
import { Input } from "./UI/Input"
import { Label } from "./UI/Label"
import { Checkbox } from "./UI/Checkbox"
import { Progress } from "./UI/Progress"
import { User, Mail, Upload, Calendar, MapPin, Users, Heart, Save, FileText, AlertCircle, CheckCircle, School } from "lucide-react"
import axios from "axios"
import RequestService from "./Services/RequestService"
import "./Profile.css"
const API_USER = "https://teachtak.onrender.com/api/User"
const API_MATCHING = "https://teachtak.onrender.com/api/MatchingData"

const UserEditForm: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    link: "",
    matchingDataId: 0,
    schoolName: ""
  })
  const [matchingData, setMatchingData] = useState({
    seniority: 0,
    isBoys: false,
    isKeruv: false,
    residentialArea: "",
  })
  const [fileName, setFileName] = useState("")
  const userRole = sessionStorage.getItem("userType") as 'teacher' | 'principal' || 'teacher';
  const isPrincipal = userRole === 'principal';
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [notification, setNotification] = useState<{ show: boolean; message: string; isError: boolean }>({
    show: false,
    message: "",
    isError: false,
  })

  useEffect(() => {
    // Animation for background particles
    const particles = document.querySelectorAll(".edit-particle")
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
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: user.password,
        link: user.link,
        matchingDataId: user.matchingDataId,
        schoolName: user.schoolName || ""
      })

      axios
        .get(`${API_MATCHING}/${user.matchingDataId}`)
        .then((res) => setMatchingData(res.data))
        .catch((err) => console.error("❌ שגיאה בטעינת matchingData:", err))
    }
  }, [user])

  const showNotification = (message: string, isError: boolean) => {
    setNotification({
      show: true,
      message,
      isError,
    })

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }))
    }, 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    if (name in matchingData) {
      setMatchingData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setProgress(0)
      setIsUploading(true)

      try {
        const presignedUrl = await RequestService.getPresignedUrl(file.name, file.type)
        await RequestService.uploadFile(presignedUrl, file, setProgress)
        const publicUrl = `https://zipushresume.s3.amazonaws.com/resume/${file.name}`
        setFormData((prev) => ({ ...prev, link: publicUrl }))
        showNotification(`קובץ ${file.name} הועלה בהצלחה`, false)
      } catch (error) {
        console.error("Error uploading file:", error)
        showNotification("שגיאה בהעלאת הקובץ", true)
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    setSaveStatus("idle")

    try {
      await axios.put(`${API_USER}/${user.id}`, formData)
      await axios.put(`${API_MATCHING}/${formData.matchingDataId}`, matchingData)
      setSaveStatus("success")
      showNotification("הפרטים עודכנו בהצלחה", false)

      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (err) {
      console.error("❌ שגיאה בעדכון:", err)
      setSaveStatus("error")
      showNotification("שגיאה בעדכון הפרטים", true)
      setTimeout(() => setSaveStatus("idle"), 3000)
    } finally {
      setIsLoading(false)
    }
  }


  if (!user) {
    return (
      <div className="edit-page">
        <div className="edit-background">
          <div className="edit-circle edit-circle-1"></div>
          <div className="edit-circle edit-circle-2"></div>
          <div className="edit-circle edit-circle-3"></div>
          {[...Array(15)].map((_, i) => (
            <div key={i} className="edit-particle"></div>
          ))}
        </div>

        <div className="edit-container">
          <div className="edit-empty">
            <div className="empty-icon">
              <User />
            </div>
            <h3>משתמש לא מחובר</h3>
            <p>אנא התחבר כדי לערוך את הפרופיל</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="edit-page">
      {/* Background Elements */}
      <div className="edit-background">
        <div className="edit-circle edit-circle-1"></div>
        <div className="edit-circle edit-circle-2"></div>
        <div className="edit-circle edit-circle-3"></div>

        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <div key={i} className="edit-particle"></div>
        ))}
      </div>

      <div className="edit-container">
        {/* Edit Header */}
        <div className="edit-header">
          <div className="edit-logo">
            <div className="edit-logo-icon">
              <User />
            </div>
          </div>
          <h1 className="edit-title">עריכת פרופיל</h1>
          <p className="edit-subtitle">עדכן את הפרטים האישיים ונתוני ההתאמה שלך</p>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          {/* Personal Information Section */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon personal">
                <User />
              </div>
              <h2 className="section-title">פרטים אישיים</h2>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <Label htmlFor="name" className="field-label">
                  שם מלא
                </Label>
                <div className="input-group">
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="field-input"
                    placeholder="הכנס שם מלא"
                  />
                  <User className="input-icon" />
                </div>
              </div>

              <div className="form-field">
                <Label htmlFor="email" className="field-label">
                  כתובת אימייל
                </Label>
                <div className="input-group">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="field-input"
                    placeholder="הכנס כתובת אימייל"
                  />
                  <Mail className="input-icon" />
                </div>
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          {!isPrincipal &&
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon file">
                  <FileText />
                </div>
                <h2 className="section-title">קורות חיים</h2>
              </div>

              <div className="upload-section">
                <button
                  type="button"
                  className={`upload-button ${isUploading ? "loading" : ""}`}
                  onClick={() => document.getElementById("file-upload")?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <div className="button-loader">
                      <div className="spinner"></div>
                    </div>
                  ) : (
                    <div className="button-icon">
                      <Upload />
                    </div>
                  )}
                  <span>{isUploading ? "מעלה קובץ..." : "העלאת קובץ קורות חיים"}</span>
                </button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                />

                {fileName && (
                  <div className="file-info success">
                    <CheckCircle />
                    <span>קובץ נבחר: {fileName}</span>
                  </div>
                )}

                {formData.link && (
                  <div className="file-info link">
                    <FileText />
                    <span>קישור: {formData.link}</span>
                  </div>
                )}

                {progress > 0 && progress < 100 && (
                  <div className="upload-progress">
                    <div className="progress-info">
                      <span className="progress-text">העלאה בתהליך...</span>
                      <span className="progress-percentage">{progress}%</span>
                    </div>
                    <Progress value={progress} className="progress-bar" />
                  </div>
                )}
              </div>
            </div>
          }
          {/* Matching Data Section */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon matching">
                <Heart />
              </div>
              <h2 className="section-title">נתוני התאמה</h2>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <Label htmlFor="seniority" className="field-label">
                  ותק בהוראה (שנים)
                </Label>
                <div className="input-group">
                  <Input
                    id="seniority"
                    name="seniority"
                    type="number"
                    value={matchingData.seniority}
                    onChange={handleChange}
                    className="field-input"
                    placeholder="0"
                    min="0"
                  />
                  <Calendar className="input-icon" />
                </div>
              </div>
              {isPrincipal && (
                <div className="form-field">
                  <Label htmlFor="schoolName" className="field-label">שם בית ספר</Label>
                  <div className="input-group">
                    <Input
                      id="schoolName"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      className="field-input"
                      placeholder="הכנס שם בית ספר"
                    />
                    <School className="input-icon" />
                  </div>
                </div>
              )}

              <div className="form-field">
                <Label htmlFor="residentialArea" className="field-label">
                  אזור מגורים
                </Label>
                <div className="input-group">
                  <Input
                    id="residentialArea"
                    name="residentialArea"
                    value={matchingData.residentialArea}
                    onChange={handleChange}
                    className="field-input"
                    placeholder="הכנס אזור מגורים"
                  />
                  <MapPin className="input-icon" />
                </div>
              </div>
            </div>

            <div className="checkbox-section">
              <div className="checkbox-field boys">
                <Checkbox
                  id="isBoys"
                  name="isBoys"
                  checked={matchingData.isBoys}
                  onCheckedChange={(checked) => setMatchingData((prev) => ({ ...prev, isBoys: checked as boolean }))}
                  className="checkbox-input"
                />
                <div className="checkbox-content">
                  <Users className="checkbox-icon" />
                  <Label htmlFor="isBoys" className="checkbox-label">
                    מתאים לבנים
                  </Label>
                </div>
              </div>

              <div className="checkbox-field keruv">
                <Checkbox
                  id="isKeruv"
                  name="isKeruv"
                  checked={matchingData.isKeruv}
                  onCheckedChange={(checked) => setMatchingData((prev) => ({ ...prev, isKeruv: checked as boolean }))}
                  className="checkbox-input"
                />
                <div className="checkbox-content">
                  <Heart className="checkbox-icon" />
                  <Label htmlFor="isKeruv" className="checkbox-label">
                    תוכנית קירוב
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit-section">
            <button
              type="submit"
              disabled={isLoading}
              className={`submit-button ${saveStatus} ${isLoading ? "loading" : ""}`}
            >
              {isLoading ? (
                <div className="button-loader">
                  <div className="spinner"></div>
                </div>
              ) : saveStatus === "success" ? (
                <div className="button-icon">
                  <CheckCircle />
                </div>
              ) : saveStatus === "error" ? (
                <div className="button-icon">
                  <AlertCircle />
                </div>
              ) : (
                <div className="button-icon">
                  <Save />
                </div>
              )}
              <span>
                {isLoading
                  ? "מעדכן..."
                  : saveStatus === "success"
                    ? "נשמר בהצלחה!"
                    : saveStatus === "error"
                      ? "שגיאה בשמירה"
                      : "שמור שינויים"}
              </span>
            </button>
          </div>
        </form>
      </div>

      {notification.show && (
        <div className={`edit-notification ${notification.isError ? "error" : "success"}`}>
          <div className="notification-icon">
            {notification.isError ? (
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
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
  )
}

export default UserEditForm