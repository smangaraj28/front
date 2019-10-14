import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginViewDetailComponent } from './login-view-detail.component';

describe('LoginViewDetailComponent', () => {
  let component: LoginViewDetailComponent;
  let fixture: ComponentFixture<LoginViewDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginViewDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
