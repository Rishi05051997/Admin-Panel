import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListingComponent } from './users-listing.component';

describe('HrListingComponent', () => {
  let component: UsersListingComponent;
  let fixture: ComponentFixture<UsersListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
