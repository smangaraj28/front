import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUsrConfComponent } from './login-usr-conf.component';

describe('LoginUsrConfComponent', () => {
  let component: LoginUsrConfComponent;
  let fixture: ComponentFixture<LoginUsrConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginUsrConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUsrConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
