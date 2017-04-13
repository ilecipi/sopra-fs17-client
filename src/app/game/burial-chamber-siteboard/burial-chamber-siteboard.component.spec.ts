import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialChamberSiteboardComponent } from './burial-chamber-siteboard.component';

describe('BurialChamberSiteboardComponent', () => {
  let component: BurialChamberSiteboardComponent;
  let fixture: ComponentFixture<BurialChamberSiteboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurialChamberSiteboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurialChamberSiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
