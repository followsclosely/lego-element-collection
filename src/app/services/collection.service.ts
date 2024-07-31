import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export class LegoElement {
  public year : number = 0;
  constructor(public owned : boolean, public id: string, public color : string, public imageUrl: string) {}
}
export class LegoBucket {
  constructor(public year : number, public elements : LegoElement[]){}
}
export class LegoGrid {
  constructor(public year : number, public element? : LegoElement){}
}

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http : HttpClient) {
    console.log('CollectionService created');
    console.log('http=' + http);
  }

  getElements() : Observable<LegoElement[]> {
    console.log('getElements');
    return this.http.get<LegoElement[]>("/rest/shields.json");
  }

  getElementsByYear(collectionId : string | null) : Observable<LegoBucket[]> {
    console.log('getElements');
    return this.http.get<LegoElement[]>("/rest/"+collectionId+".json").pipe(
      map( (elements) => {
        var buckets : LegoBucket[] = [];
        var legoBucket : LegoBucket = new LegoBucket(-1, []);

        for (var element of elements) {
          if(legoBucket.year != element.year) {
            legoBucket = new LegoBucket(element.year, []);
            buckets.push(legoBucket);
          }
          legoBucket.elements.push(element);
        }

        return buckets;
      })
    );
  }

  getElementsOnGrid(collectionId : string | null, columns : number) : Observable<LegoGrid[][]> {
    console.log('getElements');
    return this.http.get<LegoElement[]>("/rest/"+collectionId+".json").pipe(
      map( (elements) => {
        var row : number = 0;
        var year : number = 0;
        var counter = 0;
        var grid: LegoGrid[][] = [];
        grid[row] = [];

        for (var element of elements) {
          //console.log(element);
          if (year != element.year){
            if(counter >= columns-1 ){
              counter = 0;
              grid[++row] = [];
            }
            year = element.year;
            counter++;
            grid[row].push(new LegoGrid(year));
            //console.log('Adding a new year ('+year+') to the grid.')
          }

          if(counter >= columns ){
            counter = 0;
            grid[++row] = [];
            //console.log('Adding a new line to the grid.')
          }

          counter++;
          grid[row].push(new LegoGrid(element.year, element));
          //console.log('Adding an element ('+element.id+') to the grid.')
        }

        return grid;
      })
    );
  }

}
