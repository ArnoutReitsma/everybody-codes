import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs/internal/Subscription';
import { environment } from 'src/environments/environment';
import { CameraService } from './camera.service';
import { CameraOverviewModel } from './models/camera-overview.model';
import { DivisibleBy } from './models/divisble-by.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  get camerasThreeOverview(): CameraOverviewModel[] {
    return this.cameraOverviewData.filter(c => c.divisibleBy === DivisibleBy.Three)
  }
  get camerasFiveOverview(): CameraOverviewModel[] {
    return this.cameraOverviewData.filter(c => c.divisibleBy === DivisibleBy.Five)
  }
  get camerasThreeAndFiveOverview(): CameraOverviewModel[] {
    return this.cameraOverviewData.filter(c => c.divisibleBy === DivisibleBy.ThreeAndFive)
  }
  get camerasNoneOverview(): CameraOverviewModel[] {
    return this.cameraOverviewData.filter(c => c.divisibleBy === DivisibleBy.None)
  }

  map: any;
  
  private cameraOverviewData: CameraOverviewModel[] = [];
  private subscription: Subscription;

  constructor(private cameraService: CameraService) {
  }

  ngOnInit() {
    this.initMap();
    this.loadCameraData();
  }

  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  private loadCameraData() {
    this.subscription = this.cameraService.getCameras().subscribe(data => {
      this.cameraOverviewData = data;
      this.setCameraMarkers();
    });
  }

  private initMap() {
    this.map = L.map('mapid').setView([52.0914, 5.1115], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      accessToken: environment.accessTokenMapBox,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(this.map);
  }

  private setCameraMarkers() {
    this.cameraOverviewData.forEach(c => {
      L.marker([parseFloat(c.latitude), parseFloat(c.longitude)]).addTo(this.map);
    });
  }
}
