import { Pipe, PipeTransform } from '@angular/core';

export interface Object {
  "id": Number,
  "empId": String,
  "email": String,
  "password": String,
  "role": String,
  "location": String,
  "status": Boolean

}

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.email.indexOf(filter.email) !== -1);
}
}
