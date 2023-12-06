import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastGraphComponent } from './forecast-graph.component';

describe('ForecastGraphComponent', () => {
  let component: ForecastGraphComponent;
  let fixture: ComponentFixture<ForecastGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
