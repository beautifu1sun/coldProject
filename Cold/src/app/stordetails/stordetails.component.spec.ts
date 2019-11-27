import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StordetailsComponent } from './stordetails.component';

describe('StordetailsComponent', () => {
  let component: StordetailsComponent;
  let fixture: ComponentFixture<StordetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StordetailsComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});