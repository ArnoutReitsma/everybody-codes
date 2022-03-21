import { DivisibleBy } from './divisble-by.enum'

export interface CameraOverviewModel {

    number: number;

    camera: string;
    latitude: string;
    longitude: string;
    divisibleBy: DivisibleBy;
}
