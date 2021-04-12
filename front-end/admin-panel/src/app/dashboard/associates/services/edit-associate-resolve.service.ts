// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EditAssociateResolveService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';


import { take, map } from 'rxjs/operators';

import { AssociateService } from './associate.service';

@Injectable()
export class EditAssociateResolveService implements Resolve<any> {
  constructor(
    private associateServive: AssociateService, 
    private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    var id:any = route.paramMap.get('id');
    return this.associateServive.getAssociateById(id).pipe(
      take(1),
      map(associate => {
        if (associate) {
          return associate;
        } else {
          this.router.navigate(['/dashboard', 'associates']);
          return null;
        }
      })
    );
  }
}



