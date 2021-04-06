import { Component, NgZone, OnInit } from '@angular/core';



@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  private mediaMatcher: MediaQueryList 
  = window.matchMedia('(max-width: 720px)')

  links = [
    {
      name: 'Associates',
      url: 'associates'
    },
    {
      name: 'Others',
      url: 'others'
    },
  ]

  constructor(zone: NgZone) { 
    let media = this.mediaMatcher;
    media.addEventListener('change',(mql:any) => {
      console.log(mql);
      zone.run(() => media = mql);
      
    })
  }

  ngOnInit(): void {
  }

  isScreenSmall() {
    return this.mediaMatcher.matches;
  }

  
  

}
