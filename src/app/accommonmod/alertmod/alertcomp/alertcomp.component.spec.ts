import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertcompComponent } from './alertcomp.component';

describe('AlertcompComponent', () => {
  let component: AlertcompComponent;
  let fixture: ComponentFixture<AlertcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
