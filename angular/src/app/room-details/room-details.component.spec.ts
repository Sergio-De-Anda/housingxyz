import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomDetailsComponent } from './room-details.component';
import { TestServiceData } from '../services/static-test-data';
import { MatCardModule, MatChipsModule } from '@angular/material';

describe('RoomDetailsComponent', () => {
  let component: RoomDetailsComponent;
  let fixture: ComponentFixture<RoomDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatCardModule, MatChipsModule ],
      declarations: [ RoomDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailsComponent);
    component = fixture.componentInstance;
    component.room = TestServiceData.room;
    component.room.apiRoomType = {typeId: 0 , roomType: 'Apartment'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
