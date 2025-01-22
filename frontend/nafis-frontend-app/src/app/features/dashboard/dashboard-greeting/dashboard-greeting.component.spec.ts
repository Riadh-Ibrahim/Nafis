import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGreetingComponent } from './dashboard-greeting.component';

describe('DashboardGreetingComponent', () => {
  let component: DashboardGreetingComponent;
  let fixture: ComponentFixture<DashboardGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGreetingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
