import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOperasionalComponent } from './admin-operasional.component';

describe('AdminOperasionalComponent', () => {
  let component: AdminOperasionalComponent;
  let fixture: ComponentFixture<AdminOperasionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOperasionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOperasionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
