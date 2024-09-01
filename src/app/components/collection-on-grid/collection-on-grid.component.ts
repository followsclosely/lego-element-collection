import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService, LegoGrid } from '../../services/collection.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collection-on-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSlideToggle],
  templateUrl: './collection-on-grid.component.html',
  styleUrl: './collection-on-grid.component.css'
})
export class CollectionOnGridComponent {

  public showId : boolean = false;
  public hideOwned : boolean = false;
  public hideMissing : boolean = false;
  private collectionId : string | null = '';
  public grid : LegoGrid[][] = [];

  constructor(private route : ActivatedRoute, private collectionService : CollectionService){
    this.collectionId = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    console.log('id=' + id);
    
    let columnCount = (id == 'shields' ? 14 : 19)
    this.collectionService.getElementsOnGrid(this.collectionId, columnCount).subscribe({
      next: (data) => { this.grid = data; },
      error: (error) => { console.log('error=' + error); }
    });
  }
}
