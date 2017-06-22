import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBadgesComponent } from './view-badges.component';

describe('ViewBadgesComponent', () => {
  let component: ViewBadgesComponent;
  let fixture: ComponentFixture<ViewBadgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBadgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
