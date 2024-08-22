import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabarouComponent } from './tabarou.component';

describe('TabarouComponent', () => {
  let component: TabarouComponent;
  let fixture: ComponentFixture<TabarouComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabarouComponent]
    });
    fixture = TestBed.createComponent(TabarouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
