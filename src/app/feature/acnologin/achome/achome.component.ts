import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericService } from 'src/app/accore/genericservice/generic.service';
import { ApiService } from '../../../accore/apiservice/api.service';


@Component({
  selector: 'app-achome',
  templateUrl: './achome.component.html',
  styleUrls: ['./achome.component.scss']
})
export class AchomeComponent implements OnInit {

  constructor(
                private genericservice: GenericService,
                private router: Router,
                private api: ApiService
              ) { }

  ngOnInit() {
    this.genericservice.set_screen_id("achome");
  }

  navclick(event) {
    console.log('achome inside');
    switch (event) {
      case ('register'): {
        // this.router.navigate(['/login']);
        // window.location.href = 'http://localhost:8080/appsignup?type=signup&appid=12323235565656&home=http://localhost:4200';
        console.log("print inside register")
        this.api.apiget('regis')
        .subscribe(
          (res: any) => {
            console.log("eindowo location");
            console.log(res);
            window.location.href = res.url;
          },
          (err) => console.log(err)
        );
        break;
      }
      case ('login'): {
        console.log("login");
        this.router.navigate(['/login'], {skipLocationChange: true});
        break;
      }
    }
  }

}
