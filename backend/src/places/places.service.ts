import { Injectable } from "@nestjs/common";
import {
  Client,
  FindPlaceFromTextResponse,
  PlaceDetailsResponse,
  PlaceInputType,
} from "@googlemaps/google-maps-services-js";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PlacesService {
  client: Client;
  constructor(private configService: ConfigService) {
    this.client = new Client({});
  }
  getAllByText(input: string): Promise<FindPlaceFromTextResponse> {
    return this.client.findPlaceFromText({
      params: {
        input,
        inputtype: PlaceInputType.textQuery,
        key: this.configService.get<string>("PLACES_API_KEY"),
      },
    });
  }
  getDetailsById(id: string): Promise<PlaceDetailsResponse> {
    return this.client.placeDetails({
      params: {
        place_id: id,
        key: this.configService.get<string>("PLACES_API_KEY"),
      },
    });
  }
}
