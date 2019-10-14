import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosToolBarComponent } from './pos-tool-bar.component';

describe('ToolBarComponent', () => {
  let component: PosToolBarComponent;
  let fixture: ComponentFixture<PosToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosToolBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
