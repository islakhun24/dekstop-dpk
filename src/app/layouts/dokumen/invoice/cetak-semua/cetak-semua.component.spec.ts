import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetakSemuaComponent } from './cetak-semua.component';

describe('CetakSemuaComponent', () => {
  let component: CetakSemuaComponent;
  let fixture: ComponentFixture<CetakSemuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CetakSemuaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CetakSemuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
