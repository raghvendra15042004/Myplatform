import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Numberfield } from './numberfield';

describe('Numberfield', () => {
  let component: Numberfield;
  let fixture: ComponentFixture<Numberfield>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Numberfield],
    }).compileComponents();

    fixture = TestBed.createComponent(Numberfield);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
