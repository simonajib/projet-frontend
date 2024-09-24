import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradelevelListComponent } from './gradelevel-list.component';

describe('GradelevelListComponent', () => {
  let component: GradelevelListComponent;
  let fixture: ComponentFixture<GradelevelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradelevelListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradelevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
