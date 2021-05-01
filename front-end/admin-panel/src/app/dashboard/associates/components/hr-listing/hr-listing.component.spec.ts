import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrListingComponent } from './hr-listing.component';

describe('HrListingComponent', () => {
  let component: HrListingComponent;
  let fixture: ComponentFixture<HrListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
