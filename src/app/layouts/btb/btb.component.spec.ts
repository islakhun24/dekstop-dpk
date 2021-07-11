import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtbComponent } from './btb.component';

describe('BtbComponent', () => {
  let component: BtbComponent;
  let fixture: ComponentFixture<BtbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
