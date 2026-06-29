import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetConfig } from './widget-config';

describe('WidgetConfig', () => {
  let component: WidgetConfig;
  let fixture: ComponentFixture<WidgetConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetConfig],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
