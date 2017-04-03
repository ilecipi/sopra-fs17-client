import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketSiteboardComponent } from './market-siteboard.component';

describe('MarketSiteboardComponent', () => {
  let component: MarketSiteboardComponent;
  let fixture: ComponentFixture<MarketSiteboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketSiteboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketSiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
