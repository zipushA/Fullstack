using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Interfaces.Services
{
    public interface IGoogleMapsService
    {
        public Task<int?> GetTravelTimeInMinutesAsync(string origin, string destination);
    }
}
