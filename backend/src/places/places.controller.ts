import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Query,
  Res
} from "@nestjs/common";
import { PlacesService } from "./places.service";
import { Place } from "@googlemaps/google-maps-services-js";

interface FindAllParams {
  q: string;
}

@Controller("places")
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get()
  async findAll(@Query() params: FindAllParams): Promise<Place[]> {
    if (!params.q) {
      throw new NotFoundException();
    }
    try {
      const response = await this.placesService.getAllByText(params.q);
      return response.data.results;
    } catch (e) {
      return e;
    }
  }

  @Get(":id")
  async getDetailsById(@Param("id") id: string): Promise<Place> {
    if (!id) {
      throw new NotFoundException();
    }
    const response = await this.placesService.getDetailsById(id);
    return response.data.result;
  }
}
