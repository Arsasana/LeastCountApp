import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCircleComponent } from './edit-circle.component';

describe('EditCircleComponent', () => {
  let component: EditCircleComponent;
  let fixture: ComponentFixture<EditCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
