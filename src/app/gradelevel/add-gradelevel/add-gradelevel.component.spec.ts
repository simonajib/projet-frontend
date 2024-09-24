import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGradelevelComponent } from './add-gradelevel.component';

describe('AddGradelevelComponent', () => {
  let component: AddGradelevelComponent;
  let fixture: ComponentFixture<AddGradelevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGradelevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGradelevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
