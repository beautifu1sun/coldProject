import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LabeditComponent } from './labedit.component';

describe('LabeditComponent', () => {
  let component: LabeditComponent;
  let fixture: ComponentFixture<LabeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabeditComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});