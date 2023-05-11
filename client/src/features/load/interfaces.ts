export interface ILoad {
    _id?: string;
    name: string;
    pickupDate: Date;
    pickupAddress: string;
    deliveryDate: Date;
    deliveryAddress: string;
    driverId: string;
    driverRate: number;
    grossBeforeFees: number;
    grossAfterFees: number;
    driverGrossPay: number;
    truckGrossPay: number;
}

export interface IUpdateLoad {
    name?: string;
    pickupDate?: Date;
    pickupAddress?: string;
    deliveryDate?: Date;
    deliveryAddress?: string;
    driverRate?: number;
    grossBeforeFees?: number;
    grossAfterFees?: number;
    driverGrossPay?: number;
    truckGrossPay?: number;
}