import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGradelevelComponent } from './edit-gradelevel.component';

describe('EditGradelevelComponent', () => {
  let component: EditGradelevelComponent;
  let fixture: ComponentFixture<EditGradelevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGradelevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGradelevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
