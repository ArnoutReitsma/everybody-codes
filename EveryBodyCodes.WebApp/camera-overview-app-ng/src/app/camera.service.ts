import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CameraOverviewModel } from './models/camera-overview.model';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  readonly apiUrl = "https://localhost:7289/api";

  constructor(private httpClient: HttpClient) { }

  getCameras(): Observable<CameraOverviewModel[]> {
    return this.httpClient.get<any>(this.apiUrl + '/camera/getcameras');
  }

}
