import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CollectionService, LegoBucket } from '../../services/collection.service';



@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collection-by-year.component.html',
  styleUrl: './collection-by-year.component.css'
})
export class CollectionByYearComponent implements OnInit {

  private collectionId : string | null = '';
  public buckets : LegoBucket[] = [];

  constructor(private route : ActivatedRoute, private collectionService : CollectionService){
    this.collectionId = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    console.log('id=' + id);

    // this.collectionService.getElements().forEach( (response) => {
    //     this.buckets.length = 0;
    //     var legoBucket : LegoBucket = new LegoBucket(-1, []);

    //     for (var element of response) {
    //       if(legoBucket.year != element.year) {
    //         legoBucket = new LegoBucket(element.year, []);
    //         this.buckets.push(legoBucket);
    //       }
    //       legoBucket.elements.push(element);
    //     }
    //   });

    this.collectionService.getElementsByYear(this.collectionId).subscribe({
      next: (data) => { this.buckets = data; },
      error: (error) => { console.log('error=' + error); }
    });
  }
}
