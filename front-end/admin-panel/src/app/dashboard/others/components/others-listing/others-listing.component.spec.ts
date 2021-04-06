import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersListingComponent } from './others-listing.component';

describe('OthersListingComponent', () => {
  let component: OthersListingComponent;
  let fixture: ComponentFixture<OthersListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthersListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
