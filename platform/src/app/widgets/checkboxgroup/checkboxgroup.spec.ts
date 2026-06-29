import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Checkboxgroup } from './checkboxgroup';

describe('Checkboxgroup', () => {
  let component: Checkboxgroup;
  let fixture: ComponentFixture<Checkboxgroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Checkboxgroup],
    }).compileComponents();

    fixture = TestBed.createComponent(Checkboxgroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
