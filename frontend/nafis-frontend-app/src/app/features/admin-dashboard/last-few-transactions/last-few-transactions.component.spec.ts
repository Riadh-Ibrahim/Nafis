import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastFewTransactionsComponent } from './last-few-transactions.component';

describe('LastFewTransactionsComponent', () => {
  let component: LastFewTransactionsComponent;
  let fixture: ComponentFixture<LastFewTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastFewTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastFewTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
