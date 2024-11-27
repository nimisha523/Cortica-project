namespace Attendence_system.Model.dto
{
    public class StudentdataDto
    {
        public Guid id { get; set; }

        public string s_firstName { get; set; }

        public string s_lastName { get; set; }

        public string address { get; set; }

        public string email { get; set; }

        public string mobileNumber { get; set; }

        public string education { get; set; }

        public string collage { get; set; }

        public string course { get; set; }

        public DateTime joinDate { get; set; }

        public DateTime endDate { get; set; }

        public decimal paidFees { get; set; }

        public decimal remainingFees { get; set; }
    }
}
