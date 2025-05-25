using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Interfaces.Services
{
    public interface IMyOpenAiService
    {
        public Task<string> GetSummaryAsync(string resumeText);
    }
}
