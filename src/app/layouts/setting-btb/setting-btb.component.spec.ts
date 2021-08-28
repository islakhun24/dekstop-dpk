import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingBtbComponent } from './setting-btb.component';

describe('SettingBtbComponent', () => {
  let component: SettingBtbComponent;
  let fixture: ComponentFixture<SettingBtbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingBtbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingBtbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
