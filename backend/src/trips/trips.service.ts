import { Injectable } from "@nestjs/common";
import { ICreateTripDto } from "./dto/create-trip.dto";
import { IUpdateTripDto } from "./dto/update-trip.dto";
import { Trip } from "./entities/trip.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class TripsService {
  constructor(@InjectModel(Trip.name) private tripModel: Model<Trip>) {}

  async create(createTripDto: ICreateTripDto): Promise<Trip> {
    const trip = new this.tripModel(createTripDto);
    return trip.save();
  }

  async findAllByUserId(userId: string): Promise<Trip[]> {
    return this.tripModel.find({ userId: userId }).exec();
  }

  async findOne(id: number): Promise<Trip> {
    return this.tripModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateTripDto: IUpdateTripDto): Promise<Trip> {
    const trip = new this.tripModel(updateTripDto);
    trip._id = id;
    return trip.save();
  }

  async remove(id: number): Promise<Trip> {
    const deletedCat = await this.tripModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
