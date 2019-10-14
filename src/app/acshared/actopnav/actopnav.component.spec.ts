import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActopnavComponent } from './actopnav.component';

describe('ActopnavComponent', () => {
  let component: ActopnavComponent;
  let fixture: ComponentFixture<ActopnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActopnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
