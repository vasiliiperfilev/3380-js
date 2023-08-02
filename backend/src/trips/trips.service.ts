import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ICreateTripDto } from "./dto/create-trip.dto";
import { IUpdateTripDto } from "./dto/update-trip.dto";
import { Trip } from "./entities/trip.entity";

@Injectable()
export class TripsService {
  constructor(@InjectModel(Trip.name) private tripModel: Model<Trip>) {}

  async create(createTripDto: ICreateTripDto): Promise<Trip> {
    const trip = new this.tripModel(createTripDto);
    return trip.save();
  }

  async findOne(id: string): Promise<Trip> {
    return this.tripModel.findOne({ _id: id }).exec();
  }

  async findAllByUserId(userId: string): Promise<Trip[]> {
    return this.tripModel.find({ userId }).exec();
  }

  async update(id: string, updateTripDto: IUpdateTripDto): Promise<Trip> {
    return this.tripModel.findByIdAndUpdate(id, updateTripDto);
  }

  async remove(id: number): Promise<Trip> {
    const deletedTrip = await this.tripModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedTrip;
  }
}
