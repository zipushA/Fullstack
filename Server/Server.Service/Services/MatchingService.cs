//using Server.Core.Interfaces.IRepository;
//using Server.Core.Interfaces.Services;
//using Server.Core.Models;

//public class MatchingService : IMatchingService
//{
//    private readonly IUserRepository _userRepository;
//    private readonly GoogleMapsService _mapsService;

//    public MatchingService(IUserRepository userRepository, GoogleMapsService mapsService)
//    {
//        _userRepository = userRepository;
//        _mapsService = mapsService;
//    }

//    public async Task<IEnumerable<User>> GetSortedTeachersForPrincipalAsync(int principalId, string schoolAddress)
//    {
//        var teachers = await _userRepository.GetOrderDataAsync(principalId);
//        var teachersList = teachers.ToList();

//        var teacherWithTimes = new List<(User Teacher, int? TravelTime)>();

//        foreach (var teacher in teachersList)
//        {
//            if (teacher.Data == null || string.IsNullOrWhiteSpace(teacher.Data.ResidentialArea))
//            {
//                teacherWithTimes.Add((teacher, null));
//                continue;
//            }

//            var travelTime = await _mapsService.GetTravelTimeInMinutesAsync(
//                teacher.Data.ResidentialArea, schoolAddress);

//            teacherWithTimes.Add((teacher, travelTime));
//        }

//        var sortedTeachers = teacherWithTimes
//            .OrderBy(t => t.TravelTime ?? int.MaxValue) // שים כאלה בלי כתובת בסוף
//            .Select(t => t.Teacher)
//            .ToList();

//        return sortedTeachers;
//    }
//}
using Server.Core.Interfaces.IRepository;
using Server.Core.Interfaces.Services;
using Server.Core.Models;

public class MatchingService : IMatchingService
{
    private readonly IUserRepository _userRepository;
    private readonly GoogleMapsService _mapsService;

    public MatchingService(IUserRepository userRepository, GoogleMapsService mapsService)
    {
        _userRepository = userRepository;
        _mapsService = mapsService;
    }

    public async Task<IEnumerable<User>> GetSortedTeachersForPrincipalAsync(int principalId, string schoolAddress)
    {
        var teachers = await _userRepository.GetOrderDataAsync(principalId);
        var teachersList = teachers.ToList();

        var teacherWithTimes = new List<(User Teacher, int? TravelTime)>();

        foreach (var teacher in teachersList)
        {
            if (teacher.Data == null || string.IsNullOrWhiteSpace(teacher.Data.ResidentialArea))
            {
                teacherWithTimes.Add((teacher, null));
                continue;
            }

            int? travelTime = null;
            try
            {
                travelTime = await _mapsService.GetTravelTimeInMinutesAsync(
                    teacher.Data.ResidentialArea, schoolAddress);
            }
            catch (Exception ex)
            {
                // אפשרות ללוג:
                // Console.WriteLine($"שגיאה בחישוב מרחק עבור מורה {teacher.Name}: {ex.Message}");
            }

            teacherWithTimes.Add((teacher, travelTime));
        }

        var sortedTeachers = teacherWithTimes
            .OrderBy(t => t.TravelTime ?? int.MaxValue) // כאלה בלי זמן נסיעה בסוף
            .Select(t => t.Teacher)
            .ToList();

        return sortedTeachers;
    }
}
