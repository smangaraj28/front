import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosTopNavComponent } from './pos-top-nav.component';

describe('TopNavComponent', () => {
  let component: PosTopNavComponent;
  let fixture: ComponentFixture<PosTopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosTopNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
