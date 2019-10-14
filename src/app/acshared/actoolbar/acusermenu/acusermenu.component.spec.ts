import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcusermenuComponent } from './acusermenu.component';

describe('AcusermenuComponent', () => {
  let component: AcusermenuComponent;
  let fixture: ComponentFixture<AcusermenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcusermenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcusermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
