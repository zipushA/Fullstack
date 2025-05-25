using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Interfaces.Services
{
    public interface IEmailService
    {
        public Task<bool> SendEmailAsync(EmailRequest request);
    }
}
