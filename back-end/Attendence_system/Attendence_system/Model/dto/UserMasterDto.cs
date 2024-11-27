namespace Attendence_system.Model.dto
{
    public class UserMasterDto
    {
        public Guid id {  get; set; }
        public string firstName { get; set; }

        public string lastName { get; set; }

        public string address { get; set; }

        public int phoneNo { get; set; }

        public string email { get; set; }

        public string subject { get; set; }
    }
}
