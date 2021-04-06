import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatesListingComponent } from './associates-listing.component';

describe('AssociatesListingComponent', () => {
  let component: AssociatesListingComponent;
  let fixture: ComponentFixture<AssociatesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociatesListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
