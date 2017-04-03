import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialchamberSiteboardComponent } from './burialchamber-siteboard.component';

describe('BurialchamberSiteboardComponent', () => {
  let component: BurialchamberSiteboardComponent;
  let fixture: ComponentFixture<BurialchamberSiteboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurialchamberSiteboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurialchamberSiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
