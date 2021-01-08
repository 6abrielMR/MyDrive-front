import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageHomeComponent } from './storage-home.component';

describe('StorageHomeComponent', () => {
  let component: StorageHomeComponent;
  let fixture: ComponentFixture<StorageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
