import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellTextComponent } from './cell-text.component';

describe('CellTextComponent', () => {
  let component: CellTextComponent;
  let fixture: ComponentFixture<CellTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
