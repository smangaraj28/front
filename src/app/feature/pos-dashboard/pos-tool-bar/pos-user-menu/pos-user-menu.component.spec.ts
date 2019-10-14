import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosUserMenuComponent } from './pos-user-menu.component';

describe('UserMenuComponent', () => {
  let component: PosUserMenuComponent;
  let fixture: ComponentFixture<PosUserMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosUserMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
