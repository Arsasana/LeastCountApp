import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCircleComponent } from './view-circle.component';

describe('ViewCircleComponent', () => {
  let component: ViewCircleComponent;
  let fixture: ComponentFixture<ViewCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
