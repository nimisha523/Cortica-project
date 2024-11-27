using System.ComponentModel.DataAnnotations;

namespace Attendence_system.Model.dto
{
    public class AddStudentdataDto
    {
        public string s_firstName { get; set; }

        public string s_lastName { get; set; }

        public string address { get; set; }

        public string email { get; set; }

        public string mobileNumber { get; set; }

        public string education { get; set; }

        public string collage { get; set; }

        public string course { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime joinDate { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime endDate { get; set; }

        public decimal paidFees { get; set; }

        public decimal remainingFees { get; set; }

        // You can ensure only date is considered like this:
       /* public void SetJoinDate(DateTime date)
        {
            joinDate = date.Date;
        }

        public void SetEndDate(DateTime date)
        {
            endDate = date.Date;
        }*/
    }
}
