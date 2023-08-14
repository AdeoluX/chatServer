export interface User {
  id: string;
  email?: string;
  phoneNumber?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  username?: string;
  gender?: Gender;
  dateOfBirth?: string; // date
  city?: string;
  state?: string;
  country?: string;
  userType: UserType; // Should be nullable actually
  rating?: number;
  totalRating?: number;
  totalTrips: number;
  totalTripsCompleted: number;
  photo?: Photo;
  createdAt: string; // date
  updatedAt: string; // date
}

export interface Photo {
  id: string;
  public_id: string;
  url: string;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum UserType {
  PASSENGER = "PASSENGER",
  PILOT = "PILOT",
}
