import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthGuard } from "./auth/auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { TripsModule } from "./trips/trips.module";
import { PlacesModule } from "./places/places.module";
import { FirebaseService } from "./_services";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>("MONGO_DSN")
      })
    }),
    TripsModule,
    PlacesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    FirebaseService
  ]
})
export class AppModule {}
