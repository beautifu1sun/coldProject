import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LabdetailsComponent } from './labdetails.component';

describe('LabdetailsComponent', () => {
  let component: LabdetailsComponent;
  let fixture: ComponentFixture<LabdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabdetailsComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
