import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Room } from 'src/interfaces/room';
import { MapsService } from '../services/maps.service';
import { Complex } from 'src/interfaces/complex';
import { ProviderService } from '../services/provider.service';
import { Address } from 'src/interfaces/address';
import { Provider } from 'src/interfaces/provider';
import { Amenity } from 'src/interfaces/amenity';

@Component({
  selector: 'dev-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})

export class AddRoomComponent implements OnInit {

  // values to verify entered and selected address
  // meet our validation and distance thresholds
  validAddress: boolean;
  validDistanceToTraining: boolean;
  validDistanceToComplex: boolean;

  // the form Room object
  room: Room;

  // used for hiding or displaying the address form
  show = false;

  // room form data
  provider: Provider;
  types: string[];
  amenities: Amenity[];

  // values for displaying and allowing selection
  // of living complexes
  complexList: Complex[];
  activeComplex: Complex;
  complexShowString = 'Choose Complex';

  // values for displaying and allowing selection
  // of addresses
  addressList: Address[];
  activeAddress: Address;
  addressShowString = 'Choose Address';

  constructor(
    private roomService: RoomService,
    private providerService: ProviderService,
    private mapservice: MapsService
  ) {
    // Initialize an empty address and room object for our
    // forms
    this.room = {
      roomId: 0,
      roomAddress: {
        addressId: 0,
        streetAddress: '',
        city: '',
        state: '',
        zipCode: ''
      },
      roomNumber: '',
      numberOfBeds: 2,
      roomType: '',
      isOccupied: false,
      amenities: null,
      startDate: new Date(),
      endDate: new Date(),
      complexId: 1
    };
  }

  ngOnInit() {
    // This should be removed when authentication is
    // enabled as right now we're simply grabbing
    // our first provider from the API
    // and using it as an example
    this.getProviderOnInit();

    // Populate the user options and form
    // data objects
    this.getRoomTypesOnInit();
    this.getAmenitiesOnInit();
    this.getComplexesOnInit();
    this.getAddressesOnInit();
    console.log(this.roomService.getRoomTypes());
    console.log(this.roomService.getRoomsByProvider(1));
    console.log(this.types);
  }


  async postRoomOnSubmit() {
    // Validate if an entered address can be considered real
    const isValidAddress = await this.mapservice.verifyAddress(this.room.roomAddress);
    console.log('Address is valid: ' + isValidAddress);

    if (isValidAddress) {

      // Get and verify that the distance from a room to the provider
      // training center is less than or equal to 20 miles
      console.log('Validating distance to training center');
      const isValidDistanceTrainerCenter =
        await this.mapservice.checkDistance(
          this.room.roomAddress,
          this.provider.providerTrainingCenter.streetAddress);

      if ( isValidDistanceTrainerCenter <= 20) {

        // Get and validate that the distance from a room to a provider
        // living complex is less than or equal to five miles
        console.log('Validating distance to living complex');
        console.log('Living complex address: ' + this.activeComplex.address);
        const isValidDistanceComplex =
          await this.mapservice.checkDistance(
            this.room.roomAddress,
            this.activeComplex.address);

        if ( isValidDistanceComplex <= 5 ) {
          this.validAddress = false;
          this.validDistanceToTraining = false;
          this.validDistanceToComplex = false;

          // If we are showing the address form but an address was previously
          // selected, then we can assume that a new address has been entered
          // and must set the address ID to zero
          if (this.show) {
            if (this.room.roomAddress.addressId > 0) {
              this.room.roomAddress.addressId = 0;
            }
          }

          // Set the amenities list values in the room baasedon what is
          // selected
          this.room.amenities = this.amenities.filter(y => y.isSelected);

          console.log(this.room);
          this.roomService.postRoom(this.room);
        } else {
          this.validDistanceToComplex = true;
        }
      } else {
        this.validDistanceToTraining = true;
      }
    } else {
      this.validAddress = true;
    }
  }

  // Called in OnInit to populate the addresses list
  getAddressesOnInit() {
    this.providerService.getAddressesByProvider(1).toPromise()
      .then(
        (data) => {
          console.log('Received response for get addresses');
          this.addressList = data;
        })
      .catch(
        (error) => console.log(error)
      );
  }

  // Called in OnInit to populate the amenities list
  getAmenitiesOnInit() {
    this.roomService.getAmenities().toPromise()
      .then(
        (data) => {
          console.log('Received response for get amenities');
          this.amenities = data;
        })
      .catch(
        (error) => console.log(error)
      );
  }

  // Called in OnInit to populate the complexes list
  getComplexesOnInit() {
    this.providerService.getComplexes(1).toPromise()
      .then( (data) => {
        console.log('Received response for get complexes');
        this.complexList = data;
      })
      .catch(
        (error) => console.log(error)
      );
  }

  // Called in OnInit to populate room types list
  getRoomTypesOnInit() {
    this.roomService.getRoomTypes().toPromise()
      .then(
        (data) => {
          console.log('Received response for get room types');
          this.types = data;
        })
      .catch(
        (error) => console.log(error)
      );
  }

  addForm() {
    this.show = true;
  }

  back() {
    this.show = false;
  }

  // Updates selected complex property and display string
  // based on what is selected
  complexChoose(complex: Complex) {
    this.complexShowString = complex.complexName + ' | ' + complex.contactNumber;
    this.activeComplex = complex;
    this.room.complexId = complex.complexId;
  }

  // Updates selected address property and display string
  // based on what is selected
  addressChoose(address: Address) {
    this.addressShowString = address.streetAddress;
    this.activeAddress = address;
    this.room.roomAddress = address;
  }

  getProviderOnInit() {
    this.providerService.getProviderById(1).toPromise()
      .then((provider) => this.provider = provider)
      .catch((error) => console.log(error));
  }
}
