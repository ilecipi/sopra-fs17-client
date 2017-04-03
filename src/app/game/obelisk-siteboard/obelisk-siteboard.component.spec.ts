import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObeliskSiteboardComponent } from './obelisk-siteboard.component';

describe('ObeliskSiteboardComponent', () => {
  let component: ObeliskSiteboardComponent;
  let fixture: ComponentFixture<ObeliskSiteboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObeliskSiteboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObeliskSiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
