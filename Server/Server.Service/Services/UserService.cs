using AutoMapper;
using Server.Core.DTOs;
using Server.Core.Interfaces.IRepository;
using Server.Core.Interfaces.Services;
using Server.Core.Models;
using Server.Core.Shared;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;


namespace Server.Service.Services
{
    public class UserService(IRepositoryManager repositoryManager,IMapper mapper,IGeneryRepository<Role> generyRepository): IUserService
    {
        private readonly IRepositoryManager _repositoryManager = repositoryManager;
        private readonly IMapper _mapper = mapper;
        private readonly IGeneryRepository<Role> _generyRepository = generyRepository;
        public async Task<IEnumerable<UserDto>> GetUsersDataAsync(string role)
        {
            var users = await _repositoryManager.Users.GetUsersDataAsync(role);
            var usersDto = _mapper.Map<IEnumerable<UserDto>>(users);
            return usersDto;
        }
        public async Task<IEnumerable<UserDto>> GetOrderDataAsync(int id)
        {
            var teachers = await _repositoryManager.Users.GetOrderDataAsync(id);
            var teachersDto = _mapper.Map<IEnumerable<UserDto>>(teachers);
            return teachersDto;
            
        }
        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _repositoryManager.Users.GetAsync();
            var usersDto = _mapper.Map<IEnumerable<UserDto>>(users);
            return usersDto;
            
        }
        public async Task<UserDto?> GetByIdDataAsync(int id)
        {
            var user = await _repositoryManager.Users.GetByIdDataAsync(id);
            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
            
        }
        public async Task<Result<UserDto>> AddAsync(UserDto userDto,string role)
        {
            if (!IsValidEmail(userDto.Email))
                return Result<UserDto>.BadRequest("Invalid email");
            if (!IsValidPassword(userDto.Password))
                return Result<UserDto>.BadRequest("Invalid Password");
            var user = _mapper.Map<User>(userDto);
            int id = 2;
            if(role=="teacher")
                id = 3;
            user.RoleList = new List<Role>();
            var roleList = await _generyRepository.GetAsync();
            var existRole = roleList.FirstOrDefault(r => r.Id == id);
            user.RoleList.Add(existRole);
            if (await _repositoryManager.Users.ExistsAsync(userDto.Email))
                return Result<UserDto>.Failure("user already exist");
            user.Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
            user = await _repositoryManager.Users.AddAsync(user);
            if (user == null)
                return Result<UserDto>.Failure("unable to add the user this time");
            await _repositoryManager.SaveAsync();
            userDto = _mapper.Map<UserDto>(user);
            return Result<UserDto>.Success(userDto); ;
        }
        public async Task<UserDto> UpdateAsync(int id, UserDto updatedEntity)
        {
            var t = _mapper.Map<User>(updatedEntity);
            await _repositoryManager.Users.UpdateAsync(id, t);
            await _repositoryManager.SaveAsync();
            return updatedEntity;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var item = await _repositoryManager.Users.GetByIdDataAsync(id);
            if (item == null)
            {
                return false; 
            }

            await _repositoryManager.Users.DeleteAsync(id); 
            await _repositoryManager.SaveAsync();
            return true;
        }
        private static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            string pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            return Regex.IsMatch(email, pattern, RegexOptions.IgnoreCase);
        }
        public bool IsValidPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password) || password.Length < 6)
                return false;
            bool hasLetter = password.Any(char.IsLetter);
            bool hasDigit = password.Any(char.IsDigit);
            return hasLetter && hasDigit;
        }
    }
}
