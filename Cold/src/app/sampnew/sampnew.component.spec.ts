import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SampnewComponent } from './sampnew.component';

describe('SampnewComponent', () => {
  let component: SampnewComponent;
  let fixture: ComponentFixture<SampnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampnewComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});