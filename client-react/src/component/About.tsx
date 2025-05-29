
import type React from "react"

const About: React.FC = () => {
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%)",
      padding: "48px 16px",
      direction: "rtl" as const,
      fontFamily: "Arial, sans-serif",
    },
    wrapper: {
      maxWidth: "1024px",
      margin: "0 auto",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderRadius: "24px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      border: "none",
      backdropFilter: "blur(8px)",
    },
    header: {
      textAlign: "center" as const,
      padding: "48px 48px 24px 48px",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      background: "linear-gradient(90deg, #14b8a6, #10b981)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "16px",
      lineHeight: "1.2",
    },
    titleLine: {
      width: "96px",
      height: "4px",
      background: "linear-gradient(90deg, #2dd4bf, #34d399)",
      margin: "0 auto",
      borderRadius: "2px",
    },
    content: {
      padding: "0 48px 48px 48px",
      textAlign: "right" as const,
    },
    introBox: {
      background: "linear-gradient(90deg, #f0fdfa, #ecfdf5)",
      padding: "24px",
      borderRadius: "12px",
      borderRight: "4px solid #2dd4bf",
      marginBottom: "32px",
    },
    introText: {
      fontSize: "1.125rem",
      lineHeight: "1.75",
      color: "#374151",
      margin: 0,
    },
    separator: {
      height: "1px",
      background: "linear-gradient(90deg, transparent, #cbd5e1, transparent)",
      margin: "32px 0",
      border: "none",
    },
    sectionContainer: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "24px",
    },
    section: {
      backgroundColor: "#fafaf9",
      padding: "24px",
      borderRadius: "12px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      borderRight: "4px solid",
    },
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "16px",
    },
    sectionNumber: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "0.875rem",
      fontWeight: "bold",
      marginLeft: "12px",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#1f2937",
      margin: 0,
    },
    sectionText: {
      color: "#374151",
      lineHeight: "1.75",
      margin: 0,
    },
    finalSection: {
      background: "linear-gradient(90deg, #f0fdfa, #ecfdf5)",
      borderRightColor: "#2dd4bf",
    },
    footer: {
      textAlign: "center" as const,
      paddingTop: "32px",
    },
    footerBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "linear-gradient(90deg, #2dd4bf, #34d399)",
      color: "white",
      padding: "12px 24px",
      borderRadius: "9999px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      fontSize: "1.125rem",
      fontWeight: "600",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>אודות TEACHטק</h1>
            <div style={styles.titleLine}></div>
          </div>

          <div style={styles.content}>
            <div style={styles.introBox}>
              <p style={styles.introText}>
                TEACHטק היא פלטפורמה מתקדמת וחדשנית שנועדה לחבר בין מורות איכותיות לבין מנהלות בתי ספר בישראל – בצורה
                מדויקת, מהירה ויעילה.
              </p>
            </div>

            <hr style={styles.separator} />

            <div style={styles.sectionContainer}>
              <div style={{ ...styles.section, borderRightColor: "#34d399" }}>
                <div style={styles.sectionHeader}>
                  <span style={{ ...styles.sectionNumber, backgroundColor: "#34d399" }}>1</span>
                  <h3 style={styles.sectionTitle}>המטרה שלנו</h3>
                </div>
                <p style={styles.sectionText}>
                  אנו מאמינים שלכל מורה מגיע המקום המדויק שבו תוכל לממש את הפוטנציאל שלה, ולכל מנהלת מגיע הצוות הטוב
                  ביותר. לשם כך יצרנו מערכת חכמה שמבצעת התאמה בין הצדדים, על בסיס פרמטרים אישיים, פדגוגיים וגיאוגרפיים.
                </p>
              </div>

              <div style={{ ...styles.section, borderRightColor: "#2dd4bf" }}>
                <div style={styles.sectionHeader}>
                  <span style={{ ...styles.sectionNumber, backgroundColor: "#2dd4bf" }}>2</span>
                  <h3 style={styles.sectionTitle}>איך זה עובד?</h3>
                </div>
                <p style={styles.sectionText}>
                  לאחר הרשמה למערכת, מורות מעלות את קורות החיים שלהן וממלאות שאלון התאמה. המערכת שומרת נתונים כמו: ותק,
                  אזור מגורים, התאמה למסגרות בנים, ותכניות קירוב. מנהלות יכולות לצפות בפרופילים של מורות מתאימות וליצור
                  קשר ישיר עימן.
                </p>
              </div>

              <div style={{ ...styles.section, borderRightColor: "#10b981" }}>
                <div style={styles.sectionHeader}>
                  <span style={{ ...styles.sectionNumber, backgroundColor: "#10b981" }}>3</span>
                  <h3 style={styles.sectionTitle}>מי יכול להצטרף?</h3>
                </div>
                <p style={styles.sectionText}>
                  מורות מכל רחבי הארץ, מנהלות בתי ספר ממלכתיים ופרטיים, וכן גופים המעוניינים לשפר את תהליך הגיוס למוסדות
                  חינוך.
                </p>
              </div>

              <div style={{ ...styles.section, ...styles.finalSection }}>
                <div style={styles.sectionHeader}>
                  <span style={{ ...styles.sectionNumber, backgroundColor: "#2dd4bf" }}>✨</span>
                  <h3 style={styles.sectionTitle}>הצטרפי למהפכה החינוכית</h3>
                </div>
                <p style={{ ...styles.sectionText, fontWeight: "500" }}>
                  אם את מורה שמחפשת מקום מדויק לצמוח בו – או מנהלת שמחפשת כישרונות חינוכיים – TEACHטק היא המקום להתחיל
                  בו. הצטרפי עכשיו והפכי את התהליך לפשוט, נעים ומדויק יותר.
                </p>
              </div>
            </div>

            <div style={styles.footer}>
              <div style={styles.footerBadge}>
                <span>🎓 חינוך מתקדם לעתיד טוב יותר</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
