import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSessConfComponent } from './login-sess-conf.component';

describe('LoginSessConfComponent', () => {
  let component: LoginSessConfComponent;
  let fixture: ComponentFixture<LoginSessConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSessConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSessConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
