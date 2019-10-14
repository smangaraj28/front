import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActoolbarComponent } from './actoolbar.component';

describe('ActoolbarComponent', () => {
  let component: ActoolbarComponent;
  let fixture: ComponentFixture<ActoolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActoolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
