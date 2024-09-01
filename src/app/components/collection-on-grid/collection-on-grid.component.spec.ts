import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionOnGridComponent } from './collection-on-grid.component';

describe('CollectionOnGridComponent', () => {
  let component: CollectionOnGridComponent;
  let fixture: ComponentFixture<CollectionOnGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionOnGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionOnGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
