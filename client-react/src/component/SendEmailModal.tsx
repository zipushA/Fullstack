
"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import { Mail, Send, X, User, MessageSquare, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import "./SendEmailModal.css"

interface SendEmailModalProps {
  open: boolean
  onClose: () => void
  teacherEmail: string
  teacherName: string
}

const SendEmailModal: React.FC<SendEmailModalProps> = ({ open, onClose, teacherEmail, teacherName }) => {
  const isSystemEmail = teacherEmail === "teachtaksmart@gmail.com" // תעדכן כאן את כתובת המייל של המערכת

  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
const emailHtml = `
  <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, sans-serif; font-size: 16px; color: #333; line-height: 1.8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 30px;">
      <h2 style="color: #2c3e50; text-align: center;">${subject}</h2>
      <p style="white-space: pre-line;">${body}</p>

      <hr style="margin-top: 40px; border: none; border-top: 1px solid #ddd;" />

      <div style="text-align: center; margin-top: 30px; color: #888; font-size: 14px;">
        מייל זה נשלח באמצעות מערכת <strong style="color: #555;">TeachTak Smart</strong><br/>
       
      </div>
    </div>
  </div>
`

  const handleSend = async () => {
    if (!subject || !body) {
      setError("נא למלא נושא והודעה.")
      return
    }

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      await axios.post("https://teachtak.onrender.com/api/Email/send", {
        to: teacherEmail,
        subject,
        body:emailHtml,
      })
      setSuccess(true)
      setSubject("")
      setBody("")
    } catch {
      setError("שליחת המייל נכשלה.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setSubject("")
      setBody("")
      setError("")
      setSuccess(false)
      onClose()
    }
  }

  if (!open) return null
return (
  <div className="email-modal-overlay" onClick={handleClose}>
    {/* רקע ואפקטים */}
    <div className="email-modal-background">
      <div className="email-modal-circle email-modal-circle-1"></div>
      <div className="email-modal-circle email-modal-circle-2"></div>
      <div className="email-modal-circle email-modal-circle-3"></div>
      {[...Array(8)].map((_, i) => (
        <div key={i} className="email-modal-particle"></div>
      ))}
    </div>

    <div className="email-modal-container" onClick={(e) => e.stopPropagation()}>
      {/* כותרת */}
      <div className="email-modal-header">
        <div className="email-modal-logo">
          <div className="email-modal-logo-icon">
            <Mail />
          </div>
        </div>
        <div className="email-modal-title-section">
          <h2 className="email-modal-title">
            {isSystemEmail ? "יצירת פנייה למערכת" : "שליחת מייל"}
          </h2>
          <div className="email-modal-recipient">
            <div className="recipient-avatar">
              <User />
            </div>
            <div className="recipient-info">
              <span className="recipient-name">{teacherName}</span>
              <span className="recipient-email">{teacherEmail}</span>
            </div>
          </div>
        </div>
        <button className="email-modal-close" onClick={handleClose} disabled={loading}>
          <X />
        </button>
      </div>

      {/* תוכן */}
      <div className="email-modal-content">
        <div className="email-form-field">
          <label className="email-field-label">
            {isSystemEmail ? "נושא הפנייה" : "נושא ההודעה"}
          </label>
          <div className="email-input-group">
            <input
              type="text"
              className="email-field-input"
              placeholder={isSystemEmail ? "הכנס נושא לפנייה..." : "הכנס נושא להודעה..."}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <div className="email-input-icon">
              <MessageSquare />
            </div>
          </div>
        </div>

        <div className="email-form-field">
          <label className="email-field-label">
            {isSystemEmail ? "תיאור הבעיה / הבקשה" : "תוכן ההודעה"}
          </label>
          <div className="email-textarea-group">
            <textarea
              className="email-field-textarea"
              placeholder={isSystemEmail ? "כתוב את פרטי הפנייה למערכת..." : "כתוב את תוכן ההודעה כאן..."}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={loading}
              rows={6}
            />
            <div className="email-textarea-icon">
              <Mail />
            </div>
          </div>
        </div>

        {error && (
          <div className="email-status-message error">
            <div className="status-icon">
              <AlertCircle />
            </div>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="email-status-message success">
            <div className="status-icon">
              <CheckCircle />
            </div>
            <span>{isSystemEmail ? "הפנייה נשלחה למערכת בהצלחה!" : "הודעה נשלחה בהצלחה!"}</span>
          </div>
        )}
      </div>

      {/* כפתורים */}
      <div className="email-modal-actions">
        <button className="email-action-button cancel-button" onClick={handleClose} disabled={loading}>
          <span>ביטול</span>
        </button>
        <button
          className={`email-action-button send-button ${loading ? "loading" : ""} ${success ? "success" : ""}`}
          onClick={handleSend}
          disabled={loading || !subject.trim() || !body.trim()}
        >
          <div className="button-content">
            {loading ? (
              <>
                <div className="button-loader">
                  <Loader2 />
                </div>
                <span>שולח...</span>
              </>
            ) : success ? (
              <>
                <CheckCircle />
                <span>נשלח!</span>
              </>
            ) : (
              <>
                <Send />
                <span>{isSystemEmail ? "שלח פנייה" : "שלח הודעה"}</span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  </div>
)

}

export default SendEmailModal
