using UglyToad.PdfPig;
using System.IO;
using System.Linq;

public static class ResumeParser
{
    public static string ExtractTextFromPdf(byte[] pdfBytes)
    {
        using var ms = new MemoryStream(pdfBytes);
        using var doc = PdfDocument.Open(ms);
        var text = string.Join("\n", doc.GetPages().Select(p => p.Text));
        return text;
    }
}
