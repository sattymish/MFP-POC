import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepiechartComponent } from './homepiechart.component';

describe('HomepiechartComponent', () => {
  let component: HomepiechartComponent;
  let fixture: ComponentFixture<HomepiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepiechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
