import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderSidebarComponent } from './calender-sidebar.component';

describe('CalenderSidebarComponent', () => {
  let component: CalenderSidebarComponent;
  let fixture: ComponentFixture<CalenderSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalenderSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalenderSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
