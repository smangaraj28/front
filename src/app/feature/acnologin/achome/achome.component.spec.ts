import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchomeComponent } from './achome.component';

describe('AchomeComponent', () => {
  let component: AchomeComponent;
  let fixture: ComponentFixture<AchomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
