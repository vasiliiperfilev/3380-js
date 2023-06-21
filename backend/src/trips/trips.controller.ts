import { Controller, Get, Post, Body, Param, Req, Put } from "@nestjs/common";
import { TripsService } from "./trips.service";
import { ICreateTripDto } from "./dto/create-trip.dto";
import { IUpdateTripDto } from "./dto/update-trip.dto";

@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() createTripDto: ICreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.tripsService.findAll(req.user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tripsService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateTripDto: IUpdateTripDto) {
    return this.tripsService.update(id, updateTripDto);
  }
}
