import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempleSiteboardComponent } from './temple-siteboard.component';

describe('TempleSiteboardComponent', () => {
  let component: TempleSiteboardComponent;
  let fixture: ComponentFixture<TempleSiteboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempleSiteboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempleSiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
