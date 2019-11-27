import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SampdetailsComponent } from './sampdetails.component';

describe('SampdetailsComponent', () => {
  let component: SampdetailsComponent;
  let fixture: ComponentFixture<SampdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampdetailsComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
