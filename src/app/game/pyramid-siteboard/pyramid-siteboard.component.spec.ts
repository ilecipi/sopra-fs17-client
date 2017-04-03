import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PyramidSiteboardComponent } from './pyramid-siteboard.component';

describe('PyramidSiteboardComponent', () => {
  let component: PyramidSiteboardComponent;
  let fixture: ComponentFixture<PyramidSiteboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PyramidSiteboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PyramidSiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
