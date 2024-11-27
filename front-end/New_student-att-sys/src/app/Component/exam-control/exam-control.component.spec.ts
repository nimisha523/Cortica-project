import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamControlComponent } from './exam-control.component';

describe('ExamControlComponent', () => {
  let component: ExamControlComponent;
  let fixture: ComponentFixture<ExamControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
