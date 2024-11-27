using Attendence_system.Model.Domain;

namespace Attendence_system.Repository
{
    public interface IUserRepository
    {
        public Task<List<User_Master>> GetAllAsync();

        Task<User_Master> GetIdAsync(Guid id);

        Task<User_Master> CreateAsync(User_Master user_master);

        Task<User_Master> UpdateAsync(Guid id, User_Master user_master);

        Task<User_Master> DeleteAsync(Guid id);
    }
}
