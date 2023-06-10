import { Module } from "@nestjs/common";
import { PlacesController } from "./places.controller";
import { PlacesService } from "./places.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
