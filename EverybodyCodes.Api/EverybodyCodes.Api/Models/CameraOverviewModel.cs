using EverybodyCodes.Api.Enums;

namespace EverybodyCodes.Api.Models
{
    public class CameraOverviewModel
    {
        public CameraOverviewModel(int number, string camera, string latitude, string longitude, DivisibleByFlag divisibleBy)
        {
            Number = number;
            Camera = camera;
            Latitude = latitude;
            Longitude = longitude;
            DivisibleBy = divisibleBy;
        }
        public int Number { get; set; }
        public string Camera { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }

        public DivisibleByFlag DivisibleBy { get; set; }
    }
}