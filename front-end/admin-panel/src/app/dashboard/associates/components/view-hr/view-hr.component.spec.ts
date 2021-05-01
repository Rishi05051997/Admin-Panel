import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHrComponent } from './view-hr.component';

describe('ViewHrComponent', () => {
  let component: ViewHrComponent;
  let fixture: ComponentFixture<ViewHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
