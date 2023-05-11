export class CreateLoadDto {
  name: string;
  pickupDate: Date;
  pickupAddress: string;
  deliveryDate: Date;
  deliveryAddress: string;
  driverRate: number;
  grossBeforeFees: number;
  grossAfterFees: number;
  driverGrossPay: number;
  truckGrossPay: number;
  driverId: string;
}
