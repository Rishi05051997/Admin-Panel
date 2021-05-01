import { Injectable } from '@angular/core';
import { HrModel } from './hr-model';

@Injectable({
  providedIn: 'root'
})
export class HrServiceService {

  usercontacts: HrModel[] = [
  {
    id: 0,
    name: 'Alex',
    empId: 1234567,
    email: 'alex.blabla@aol.at',
    location: 'Pune',
    role: 'ASE',
    password: '12345',
    status: true
  },
  {
    id: 1,
    name: 'John',
    empId: 1234568,
    email: 'john@gmail.com',
    location: 'Banglore',
    role: 'Developer',
    password: '12345',
    status: true
  },
  {
    id: 2,
    name: 'Riki',
    empId: 1234569,
    email: 'riki@gmail.com',
    location: 'Chennai',
    role: 'Associate',
    password: '12345',
    status: true
  },
  {
    id: 3,
    name: 'Vrushabh Dhatrak',
    empId: 1234570,
    email: 'vrushabh@gmail.com',
    location: 'Pune',
    role: 'Associate',
    password: '12345',
    status: true
  },
  {
    id: 4,
    name: 'Jayesh',
    empId: 1234571,
    email: 'jayesh@gmail.com',
    location: 'Mumbai',
    role: 'Hr',
    password: '12345',
    status: false
  },
  {
    id: 5,
    name: 'Akash',
    empId: 1234572,
    email: 'aksh@gmail.com',
    location: 'Trevendrum',
    role: 'Developer',
    password: '12345',
    status: false
  },
  ];

  create(usercontact: HrModel) {
    const itemIndex = this.usercontacts.length;
    usercontact.id = this.getnextId();
    console.log(usercontact);
    this.usercontacts[itemIndex] = usercontact;
  }

  delete(usercontact: HrModel) {
    this.usercontacts.splice(this.usercontacts.indexOf(usercontact), 1);
  }

  update(usercontact: HrModel) {
    const itemIndex = this.usercontacts.findIndex(item => item.id === usercontact.id);
    console.log(itemIndex);
    this.usercontacts[itemIndex] = usercontact;
  }

  getall(): HrModel[] {
    console.log('usercontactservice:getall');
    console.log(this.usercontacts);
    return this.usercontacts;
  }

  reorderUserContacts(usercontact: HrModel) {
    console.log('Zur Info:', usercontact);
    this.usercontacts = this.usercontacts
      .map(uc => uc.id === usercontact.id ? usercontact : uc)
      .sort((a, uc) => uc.id - uc.id);
  }

  getUserById(id: number) {
    console.log(id);
    const itemIndex = this.usercontacts.findIndex(item => item.id === id);
    console.log(itemIndex);
    return this.usercontacts[itemIndex];
  }

  getnextId(): number {
    let highest = 0;
    this.usercontacts.forEach(function (item) {
      if (highest === 0) {
        highest = item.id;
      }
      if (highest < item.id) {
        highest = item.id;
      }
    });
    return highest + 1;
  }
}
