export interface Venue {
  name: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
