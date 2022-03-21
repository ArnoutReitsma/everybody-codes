using EverybodyCodes.Api.Models;
using EverybodyCodes.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace EverybodyCodes.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CameraController : ControllerBase
    {
        private readonly ICameraService _cameraService;

        public CameraController(ICameraService cameraService)
        {
            _cameraService = cameraService;
        }

        [HttpGet]
        [Route("GetCameras")]
        public IEnumerable<CameraOverviewModel> GetCameraOverview()
        {
            return _cameraService.GetCameraModelsFromFile();
        }

    }
}