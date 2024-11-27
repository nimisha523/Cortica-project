using Attendence_system.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace Attendence_system.Context
{
    public class AttendenceSystem:DbContext
    {
        public AttendenceSystem(DbContextOptions<AttendenceSystem> options) : base(options) { }

        public DbSet<User_Master> Users { get; set; }

        public DbSet<Course_Master> Courses { get; set; }

        public DbSet<Batch_Master> Batch { get; set; }

        public DbSet<StudentData> Students { get; set; }

       /* protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Batch_Master>()
                 .HasOne(b => b.Course)
                 .WithMany(c => c.batches)
                 .HasForeignKey(b => b.CourseId);
        }*/
    }
}
