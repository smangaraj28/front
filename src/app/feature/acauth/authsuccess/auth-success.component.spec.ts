import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSuccessComponent } from './auth-success.component';

describe('AuthsuccessComponent', () => {
  let component: AuthSuccessComponent;
  let fixture: ComponentFixture<AuthSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
