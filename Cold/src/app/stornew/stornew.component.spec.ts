import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StornewComponent } from './stornew.component';

describe('StornewComponent', () => {
  let component: StornewComponent;
  let fixture: ComponentFixture<StornewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StornewComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StornewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});