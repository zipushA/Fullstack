import React, { useState } from 'react';
import axios from 'axios';


interface SendEmailModalProps {
  open: boolean;
  onClose: () => void;
  teacherEmail: string;
  teacherName: string;
}

const SendEmailModal: React.FC<SendEmailModalProps> = ({ open, onClose, teacherEmail, teacherName }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    console.log("senddddddddddd");
    
    if (!subject || !body) {
      setError('נא למלא נושא והודעה.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post('https://localhost:7082/api/Email/send', {
        to: teacherEmail,
        subject,
        body,
      });
      setSuccess(true);
      setSubject('');
      setBody('');
    } catch {
      setError('שליחת המייל נכשלה.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    
    <div className="modal-overlay">
      <div className="modal">
        <h2>שליחת מייל ל-{teacherEmail}</h2>
        <input
          type="text"
          placeholder="נושא ההודעה"
          autoFocus
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
       <textarea
  placeholder="תוכן ההודעה"
  value={body}
  onChange={(e) => setBody(e.target.value)}
  rows={5}
/>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">הודעה נשלחה בהצלחה!</p>}

        <div className="modal-actions">
          <button className="send-button" onClick={handleSend} disabled={loading}>
            {loading ? 'שולח...' : 'שלח הודעה'}
          </button>
          <button className="cancel-button" onClick={onClose}>ביטול</button>
        </div>
      </div>
    </div>
  );
};

export default SendEmailModal;
