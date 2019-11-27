import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LabnewComponent } from './labnew.component';

describe('LabnewComponent', () => {
  let component: LabnewComponent;
  let fixture: ComponentFixture<LabnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabnewComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});