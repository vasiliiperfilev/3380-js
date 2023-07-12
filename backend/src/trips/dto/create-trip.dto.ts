export interface ICreateTripDto {
  userId: string;
  date: Date;
  note: string;
  placeIds: string[];
}
