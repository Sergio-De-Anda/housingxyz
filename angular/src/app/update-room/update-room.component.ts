import { Component, OnInit, ViewChild } from '@angular/core';
import { Complex } from 'src/interfaces/complex';
import { ProviderService } from '../services/provider.service';
import { Observer } from 'rxjs';
import { Room } from 'src/interfaces/room';
import { RoomService } from '../services/room.service';
import { DatePipe } from '@angular/common';
import { RoomUpdateFormComponent } from '../room-update-form/room-update-form.component';
import { RedirectService } from '../services/redirect.service';
import { Provider } from 'src/interfaces/provider';

@Component({
  selector: 'dev-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.scss'],
  providers: [DatePipe]
})
export class UpdateRoomComponent implements OnInit {

  complexList: Complex[];
  activeComplex: Complex;
  roomList: Room[];
  complexRooms: Room[];
  mouseOverRoom: Room;
  selectedRoom: Room;
  showString = 'Choose Complex';
  highlightRoom: Room;
  provider: Provider;

  // observer for the service request that returns an observable of complexes.
  // sets the internal complexList: Complex[] to valid data.
  complexObs: Observer<Complex[]> = {
    next: x => {
      console.log('Observer got a next value.');
      this.complexList = x;
    },
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

  // observer for the observable that returns a list of rooms.
  // this just sets the internal roomList: Room[] object to valid data.
  roomsObs: Observer<Room[]> = {
    next: x => {
      console.log('Observer got a next value.');
      this.roomList = x;
    },
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

  // injects dependency on Provider and Room services.
  constructor(
    private providerService: ProviderService,
    private roomService: RoomService,
    private datePipe: DatePipe,
    private redirect: RedirectService
    ) { }

  // initializes complexes and all rooms by providers at init time.
  ngOnInit() {
    this.provider = this.redirect.checkProvider();
    if (this.provider !== null) {
      this.getProviderOnInit(this.provider.providerId).then(p => {
        this.provider = p;
        this.getLivingComplexesOnInit();
        this.getRoomsOnInit();
      });
    } else {
    }
    this.providerService.getComplexesByProvider(1).subscribe(this.complexObs);
    this.getRoomsOnInit();
  }

  getRoomsOnInit() {
    this.roomService.getRoomsByProvider(1)
      .toPromise()
      .then((rooms) => this.roomList = rooms)
      .catch((err) => console.log(err));
  }

  // funciton that runs when a complex is selected from the dropdown in the HTML.
  // sets two internal variables:
  //     showString which has default value of "Choose Complex"
  //     activeComplex which simply houses the currently selected complex. It is null by default.
  complexChoose(complex: Complex) {
    this.showString = complex.complexName;
    this.clearSelect();
    this.activeComplex = complex;
    this.roomService.getRoomsByProvider(1).subscribe(this.roomsObs);
    this.complexRooms = this.roomList.filter(r => r.apiComplex.complexId === this.activeComplex.complexId);
  }

  // this function is bound to an HTML element, and executes every time the mouse is detected to be hovering over the element.
  mouseOn(r: Room) {
    this.mouseOverRoom = r;
  }

  // this is the counterpart to mouseOn(). It executes whenever an element determines the mouse is no longer hovering it.
  mouseOff() {
    this.mouseOverRoom = null;
  }

  // this function executes when a room display component is clicked. It sets a working room equal to the selected room
  // in order to preserve data integrity while updates are made.
  // It also internally sets a variable, highlightRoom, to let the HTML know which room is selected and thus highlight it.
  select(r: Room) {
    const newRoom: Room = {
      roomId : r.roomId,
      apiAddress : r.apiAddress,
      roomNumber : r.roomNumber,
      numberOfBeds : r.numberOfBeds,
      apiRoomType : r.apiRoomType,
      isOccupied : r.isOccupied,
      apiAmenity : r.apiAmenity,
      startDate : r.startDate,
      endDate : r.endDate,
      apiComplex : r.apiComplex
    };
    this.selectedRoom = newRoom;
    this.highlightRoom = r;
  }

  // helper function to disable previously made selections and stop the display of both, the table at the bottom of the page,
  // and the highlight around a selected displayed room.
  clearSelect() {
    this.selectedRoom = null;
    this.highlightRoom = null;
  }

  // this function receives an event from the child and commits the changes to the working room list
  roomChange(r: Room) {
    this.roomService.updateRoom(r, 1).subscribe(x => {
      this.makeRoomChanges(r);
    });
  }

  makeRoomChanges(r: Room) {
    this.roomList.forEach(element => this.copyRoomDate(r, element));
    this.complexRooms.forEach(element => this.copyRoomDate(r, element));
    this.selectedRoom = null;
    this.highlightRoom = null;
  }

  private copyRoomDate(source: Room, destination: Room): void {
    if (destination.roomId === source.roomId) {
      destination.roomId = source.roomId;
      destination.apiAddress = source.apiAddress;
      destination.roomNumber = source.roomNumber;
      destination.numberOfBeds = source.numberOfBeds;
      destination.apiRoomType = source.apiRoomType;
      destination.isOccupied = source.isOccupied;
      destination.apiAmenity = source.apiAmenity;
      destination.startDate = source.startDate;
      destination.endDate = source.endDate;
      destination.apiComplex = source.apiComplex;
    }
  }
  // this function receives an event from the child and removes the room from the working room list
  removeRoom(r: Room) {
    this.roomService.deleteRoom(r, 1).subscribe(x => {
      this.makeRemoveRoom(r);
    });
  }

  makeRemoveRoom(r: Room) {
    this.roomList = this.roomList.filter(x => x.roomId !== r.roomId);
    this.complexRooms = this.complexRooms.filter(x => x.roomId !== r.roomId);
    this.selectedRoom = null;
    this.highlightRoom = null;
  }

  getProviderOnInit(providerId: number): Promise<Provider> {
    return this.providerService.getProviderById(providerId)
      .toPromise()
      .then((provider) => this.provider = provider);
  }

  getLivingComplexesOnInit(): void {
    this.providerService.getComplexesByProvider(this.provider.providerId)
      .toPromise()
      .then((complexes) => this.complexList = complexes)
      .catch((err) => console.log(err));
  }
}
