import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HichartsComponent } from './hicharts.component';

describe('HichartsComponent', () => {
  let component: HichartsComponent;
  let fixture: ComponentFixture<HichartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HichartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HichartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
