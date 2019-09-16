import { TrainingCenter } from 'src/interfaces/trainingcenter';
import { Address } from 'src/interfaces/address';
import { Complex } from 'src/interfaces/complex';
import { Provider } from 'src/interfaces/provider';
import { Amenity } from 'src/interfaces/amenity';
import { Room } from 'src/interfaces/room';

export class TestServiceData {
    static dummyAddress: Address = {
        addressId: 1,
        streetAddress: '123 Address St',
        city: 'Arlington',
        state: 'TX',
        zipCode: '12345'
    };

    static livPlusAddress: Address = {
        addressId: 2,
        streetAddress: '1001 S Center St',
        city: 'Arlington',
        state: 'TX',
        zipCode: '76010'
    };

    static dummyTrainingCenter: TrainingCenter = {
        centerId: 1,
        streetAddress: TestServiceData.livPlusAddress,
        centerName: 'UT Arlington',
        contactNumber: '3213213214'
    };

    static UTA: Address = {
        addressId: 3,
        streetAddress: '749 South Cooper St',
        city: 'Arlington',
        state: 'TX',
        zipCode: '76010'
    };

    static complexAddress1: Address = {
        addressId: 9,
        streetAddress: '123 Complex St',
        city: 'Arlington',
        state: 'TX',
        zipCode: '12345'
    };

    static dummyComplex: Complex = {
        complexId: 1,
        address: TestServiceData.livPlusAddress,
        complexName: 'Liv+ Appartments',
        contactNumber: '123-123-1234'
    };

    static complexAddress2: Address = {
        addressId: 10,
        streetAddress: '234 Complex St',
        city: 'Arlington',
        state: 'TX',
        zipCode: '23456',
    };

    static dummyComplex2: Complex = {
        complexId: 2,
        address: TestServiceData.complexAddress2,
        complexName: 'Liv- Appartments',
        contactNumber: '123-123-1234'
    };

    static dummyGender: string[] = ['male', 'female', 'undefined'];

    static dummyAmenity1: Amenity = {
        amenityId: 1,
        amenity:  'Washer/Dryer',
        isSelected: true
    };
    static dummyAmenity2: Amenity = {
        amenityId: 2,
        amenity: 'Smart TV',
        isSelected: true
    };
    static dummyAmenity3: Amenity = {
        amenityId: 3,
        amenity: 'Patio',
        isSelected: true
    };
    static dummyAmenity4: Amenity = {
        amenityId: 4,
        amenity: 'Fully Furnished',
        isSelected: true
    };
    static dummyAmenity5: Amenity = {
        amenityId: 5,
        amenity: 'Full Kitchen',
        isSelected: true
    };
    static dummyAmenity6: Amenity = {
        amenityId: 6,
        amenity: 'Individual Bathrooms',
        isSelected: true
    };

    static dummmyList: Amenity[] = [
        TestServiceData.dummyAmenity1,
        TestServiceData.dummyAmenity2,
        TestServiceData.dummyAmenity3,
        TestServiceData.dummyAmenity4,
        TestServiceData.dummyAmenity5,
        TestServiceData.dummyAmenity6
    ];

    static room: Room = {
        roomId: 0,
        roomAddress: TestServiceData.dummyAddress,
        roomNumber: '',
        numberOfBeds: 2,
        roomType: '',
        isOccupied: false,
        amenities: TestServiceData.dummmyList,
        startDate: new Date(),
        endDate: new Date(),
        complex: TestServiceData.dummyComplex
    };

    static room2: Room = {
        roomId: 0,
        roomAddress: {
            addressId: 2,
            streetAddress: '701 S Nedderman Dr',
            city: 'Arlington',
            state: 'TX',
            zipCode: '76019'
        },
        roomNumber: '323',
        numberOfBeds: 9001,
        roomType: 'Dorm',
        isOccupied: true,
        amenities: [{
            amenityId: 2,
            amenity: 'Washer/Dryer',
            isSelected: true
        }],
        startDate: new Date(),
        endDate: new Date(),
        complex: TestServiceData.dummyComplex2
    };

    static postToRoom: Room;
    static postAddress: Address;

    static prestionHall: Address = {
        addressId: 6,
        streetAddress: '701 S Nedderman Dr',
        city: 'Arlington',
        state: 'Texas',
        zipCode: '76019',
    };

    static trainingcenter: TrainingCenter = {
        centerId: 1,
        streetAddress: TestServiceData.prestionHall,
        centerName: 'UT Arlington - Preston Hall',
        contactNumber: '(703) 570-8181'
    };

    static uic: Address = {
        addressId: 7,
        streetAddress: '123 s. Chicago Ave',
        city: 'Chicago',
        state: 'Illinois',
        zipCode: '60645',
    };

    static trainingcenter2: TrainingCenter = {
        centerId: 2,
        streetAddress: TestServiceData.uic,
        centerName: 'UIC',
        contactNumber: '3213213214'
    };

    static liv: Address = {
        addressId: 8,
        streetAddress: '123 Address St',
        city: 'Arlington',
        state: 'TX',
        zipCode: '12345',
    };

    static dummyProvider: Provider = {
        providerId: 1,
        companyName: 'Liv+',
        streetAddress: TestServiceData.liv,
        contactNumber: '123-123-1234',
        providerTrainingCenter: TestServiceData.trainingcenter
    };
}
