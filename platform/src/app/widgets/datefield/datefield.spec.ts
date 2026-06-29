import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datefield } from './datefield';

describe('Datefield', () => {
  let component: Datefield;
  let fixture: ComponentFixture<Datefield>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datefield],
    }).compileComponents();

    fixture = TestBed.createComponent(Datefield);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
