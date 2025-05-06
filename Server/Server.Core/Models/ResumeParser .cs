//using UglyToad.PdfPig;
//using System.IO;
//using System.Linq;

//public static class ResumeParser
//{
//    public static string ExtractTextFromPdf(byte[] pdfBytes)
//    {
//        using var ms = new MemoryStream(pdfBytes);
//        using var doc = PdfDocument.Open(ms);
//        var text = string.Join("\n", doc.GetPages().Select(p => p.Text));
//        return text;
//    }
//}
using System.Text.RegularExpressions;
using UglyToad.PdfPig;

public static class ResumeParser
{
    public static string ExtractTextFromPdf(byte[] pdfBytes)
    {
        using var ms = new MemoryStream(pdfBytes);
        using var doc = PdfDocument.Open(ms);
        var rawText = string.Join("\n", doc.GetPages().Select(p => p.Text));

        var cleanedText = CleanExtractedText(rawText);
        Console.WriteLine(cleanedText);
        return cleanedText;
    }

    private static string CleanExtractedText(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return string.Empty;

        // 1️⃣ הסרה של רווחים מוזרים ותווים מיותרים
        text = text.Replace("\r", " ").Replace("\n", " ");
        text = Regex.Replace(text, @"[^\u0590-\u05FFa-zA-Z0-9 ,.\-]", " "); // משאיר עברית, אנגלית, מספרים, רווחים, נקודות, פסיקים ומקפים

        // 2️⃣ הוספת רווח אחרי פסיקים ונקודות אם חסר
        text = Regex.Replace(text, @"([,\.])([^\s])", "$1 $2");

        // 3️⃣ הסרת כפילויות — לדוגמה, אם אותן מילים חוזרות פעמיים
        var words = text.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        var dedupedWords = words.Distinct().ToList();
        text = string.Join(" ", dedupedWords);

        // 4️⃣ שמירה רק על השורות החשובות (מילות מפתח)
        var importantSections = new[] { "ניסיון", "תעסוקה", "השכלה", "כישורים" };
        var filteredText = string.Join(" ",
            text.Split('.')
                .Where(sentence => importantSections.Any(key => sentence.Contains(key))));

        // fallback אם לא נמצא שום חלק חשוב
        if (string.IsNullOrWhiteSpace(filteredText))
            filteredText = text;

        return filteredText.Trim();
    }
}
