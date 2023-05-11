export interface IDriver {
    _id?: string;
    name: string;
    phoneNumber?: string;
    address: string;
    email?: string;
}

export interface IUpdateDriver {
    name?: string;
    phoneNumber?: string;
    address?: string;
    email?: string
}