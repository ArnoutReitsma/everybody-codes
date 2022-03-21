using EverybodyCodes.Api.Enums;
using EverybodyCodes.Api.Models;

namespace EverybodyCodes.Api.Services
{
    public interface ICameraService
    {
        IList<CameraOverviewModel> GetCameraModelsFromFile();
    }

    public class CameraService : ICameraService
    {
        public IList<CameraOverviewModel> GetCameraModelsFromFile()
        {
            var cameras = new List<CameraOverviewModel>();
            var fileLines = File.ReadAllLines(@"C:\Repos\EverybodyCodes.Cli\EverybodyCodes.Cli\cameras-defb.txt");

            // skip header row by starting at index 1
            foreach (var line in fileLines.Skip(1))
            {
                var splitString = line.Split(";");

                // filter ERROR lines by checking splitString length
                if (splitString.Length != 3)
                {
                    continue;
                }
                var cameraNumberString = splitString[0].Split("-")[2].Split()[0];
                if (!Int32.TryParse(cameraNumberString, out int cameraNumber))
                {
                    Console.WriteLine($"Int32.TryParse could not parse '{cameraNumberString}' to an int.");
                    continue;
                }
                cameras.Add(new CameraOverviewModel(cameraNumber, splitString[0], splitString[1], splitString[2], GetDivisibleByFlag(cameraNumber)));
            }
            return cameras;
        }

        private DivisibleByFlag GetDivisibleByFlag(int cameraNumber)
        {
            var flag = DivisibleByFlag.None;
            if (cameraNumber % 3 == 0)
            {
                flag |= DivisibleByFlag.Three;
            }
            if (cameraNumber % 5 == 0)
            {
                flag |= DivisibleByFlag.Five;
            }
            return flag;
        }

    }
}