import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSubscriptionComponent } from './detail-subscription.component';

describe('DetailSubscriptionComponent', () => {
  let component: DetailSubscriptionComponent;
  let fixture: ComponentFixture<DetailSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSubscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
