import { Pipe, PipeTransform } from '@angular/core';
import { Upload } from 'src/app/core/models/file-upload';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(people: any, term: any): any {

    //check if search term is undefined
    if(term === undefined) return people;
    //return updates people array
    return people.filter(function(thisperson){
       return thisperson.Name.toLowerCase().includes(term.toLowerCase())
       
      
    }) 

  }

}
