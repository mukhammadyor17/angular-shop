export interface DeliveryAddress {
    id: string;
    fullName: string;
    phone: string;
    country: string | null;
    city: string;
    street: string;
    building: string;
    appartment: string | null;
    postalCode: string | null;
    comment: string | null;
    isDefault: boolean; 
}
