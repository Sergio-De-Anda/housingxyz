import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTenantToRoomComponent } from './assign-tenant-to-room.component';

describe('AssignTenantToRoomComponent', () => {
  let component: AssignTenantToRoomComponent;
  let fixture: ComponentFixture<AssignTenantToRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTenantToRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTenantToRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
