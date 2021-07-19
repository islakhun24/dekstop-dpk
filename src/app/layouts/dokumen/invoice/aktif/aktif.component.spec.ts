import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktifComponent } from './aktif.component';

describe('AktifComponent', () => {
  let component: AktifComponent;
  let fixture: ComponentFixture<AktifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AktifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AktifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
