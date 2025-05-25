
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
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSend = async () => {
    console.log("senddddddddddd")

    if (!subject || !body) {
      setError("נא למלא נושא והודעה.")
      return
    }

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      await axios.post("https://localhost:7082/api/Email/send", {
        to: teacherEmail,
        subject,
        body,
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
      {/* Background Elements */}
      <div className="email-modal-background">
        <div className="email-modal-circle email-modal-circle-1"></div>
        <div className="email-modal-circle email-modal-circle-2"></div>
        <div className="email-modal-circle email-modal-circle-3"></div>

        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="email-modal-particle"></div>
        ))}
      </div>

      <div className="email-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="email-modal-header">
          <div className="email-modal-logo">
            <div className="email-modal-logo-icon">
              <Mail />
            </div>
          </div>
          <div className="email-modal-title-section">
            <h2 className="email-modal-title">שליחת מייל</h2>
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

        {/* Modal Content */}
        <div className="email-modal-content">
          {/* Subject Field */}
          <div className="email-form-field">
            <label className="email-field-label">נושא ההודעה</label>
            <div className="email-input-group">
              <input
                type="text"
                className="email-field-input"
                placeholder="הכנס נושא להודעה..."
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

          {/* Body Field */}
          <div className="email-form-field">
            <label className="email-field-label">תוכן ההודעה</label>
            <div className="email-textarea-group">
              <textarea
                className="email-field-textarea"
                placeholder="כתוב את תוכן ההודעה כאן..."
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

          {/* Status Messages */}
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
              <span>הודעה נשלחה בהצלחה!</span>
            </div>
          )}
        </div>

        {/* Modal Actions */}
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
                  <span>שלח הודעה</span>
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
