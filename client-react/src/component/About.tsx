import React from 'react';
import { Card, CardContent, Typography, Divider, Box } from '@mui/material';

const About: React.FC = () => {
  return (
    <Box maxWidth="800px" mx="auto" mt={6} p={3}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            אודות מורה בלחיצת כפתור
          </Typography>

          <Typography variant="body1" paragraph>
            מורה בלחיצת כפתור היא פלטפורמה מתקדמת וחדשנית שנועדה לחבר בין מורות איכותיות לבין מנהלות בתי ספר בישראל – בצורה מדויקת, מהירה ויעילה.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            המטרה שלנו
          </Typography>
          <Typography variant="body1" paragraph>
            אנו מאמינים שלכל מורה מגיע המקום המדויק שבו תוכל לממש את הפוטנציאל שלה, ולכל מנהלת מגיע הצוות הטוב ביותר. לשם כך יצרנו מערכת חכמה שמבצעת התאמה בין הצדדים, על בסיס פרמטרים אישיים, פדגוגיים וגיאוגרפיים.
          </Typography>

          <Typography variant="h6" gutterBottom>
            איך זה עובד?
          </Typography>
          <Typography variant="body1" paragraph>
            לאחר הרשמה למערכת, מורות מעלות את קורות החיים שלהן וממלאות שאלון התאמה. המערכת שומרת נתונים כמו: ותק, אזור מגורים, התאמה למסגרות בנים, ותכניות קירוב. מנהלות יכולות לצפות בפרופילים של מורות מתאימות וליצור קשר ישיר עימן.
          </Typography>
          <Typography variant="h6" gutterBottom>
            מי יכול להצטרף?
          </Typography>
          <Typography variant="body1" paragraph>
            מורות מכל רחבי הארץ, מנהלות בתי ספר ממלכתיים ופרטיים, וכן גופים המעוניינים לשפר את תהליך הגיוס למוסדות חינוך.
          </Typography>

          <Typography variant="h6" gutterBottom>
            הצטרפי למהפכה החינוכית
          </Typography>
          <Typography variant="body1">
            אם את מורה שמחפשת מקום מדויק לצמוח בו – או מנהלת שמחפשת כישרונות חינוכיים – מורה בלחיצת כפתור היא המקום להתחיל בו. הצטרפי עכשיו והפכי את התהליך לפשוט, נעים ומדויק יותר.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;
