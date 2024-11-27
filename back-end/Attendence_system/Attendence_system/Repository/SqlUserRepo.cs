using Attendence_system.Context;
using Attendence_system.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace Attendence_system.Repository
{
    public class SqlUserRepo:IUserRepository
    {
        private readonly AttendenceSystem DbContext;

        public SqlUserRepo( AttendenceSystem DbContext )
        {
            this.DbContext = DbContext;
        }

        public async Task<User_Master> CreateAsync(User_Master user_master)
        {
            await DbContext.AddAsync(user_master);
            await DbContext.SaveChangesAsync();
            return user_master;
        }

        public async Task<User_Master> DeleteAsync(Guid id)
        {
            var user_master = await DbContext.Users.FindAsync(id);  
            if(user_master ==  null)
            {
                return null;
            }
            DbContext.Users.Remove(user_master);
            await DbContext.SaveChangesAsync();
            return user_master;
        }

        public async Task<List<User_Master>> GetAllAsync()
        {
            return await DbContext.Users.ToListAsync();
        }

        public async Task<User_Master> GetIdAsync(Guid id)
        {
            return await DbContext.Users.FirstAsync(x => x.id == id);
        }

        public async Task<User_Master> UpdateAsync(Guid id, User_Master user_master)
        {
            var userupdate = await DbContext.Users.FindAsync(id);
            if(userupdate == null)
            {
                return null;
            }

            userupdate.firstName = user_master.firstName;
            userupdate.lastName = user_master.lastName;
            userupdate.address = user_master.address;
            userupdate.phoneNo = user_master.phoneNo;
            userupdate.email = user_master.email;
            userupdate.subject = user_master.subject;

            await DbContext.SaveChangesAsync();
            return userupdate;

        }
    }
}
