import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxsingleComponent } from './boxsingle.component';

describe('BoxsingleComponent', () => {
  let component: BoxsingleComponent;
  let fixture: ComponentFixture<BoxsingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxsingleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxsingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
