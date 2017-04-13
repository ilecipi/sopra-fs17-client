import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCardComponent } from './market-card.component';

describe('MarketCardComponent', () => {
  let component: MarketCardComponent;
  let fixture: ComponentFixture<MarketCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
