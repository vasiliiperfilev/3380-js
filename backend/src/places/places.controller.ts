import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { PlacesService } from "./places.service";
import { Place } from "@googlemaps/google-maps-services-js";

interface FindAllParams {
  q: string;
}

@Controller("places")
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get()
  async findAll(@Res() res, @Param() params: FindAllParams): Promise<Place[]> {
    if (!params.q) {
      res.status(HttpStatus.NOT_FOUND).send();
    }
    const response = await this.placesService.getAllByText(params.q);
    return response.data.candidates;
  }

  @Get(":id")
  async getDetailsById(@Res() res, @Param("id") id: string): Promise<Place> {
    if (!id) {
      res.status(HttpStatus.NOT_FOUND).send();
    }
    const response = await this.placesService.getDetailsById(id);
    return response.data.result;
  }
}
