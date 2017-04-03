import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpposingPlayerComponent } from './opposing-player.component';

describe('OpposingPlayerComponent', () => {
  let component: OpposingPlayerComponent;
  let fixture: ComponentFixture<OpposingPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpposingPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpposingPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
