declare var $: any;
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LoginService } from 'app/services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HomeService } from './../../services/home.service';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.css']
})
export class FrontHeaderComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  isLogin;
  isVendor;
  cartlist:number=0;
  wishlist:number=0;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private local: LocalStorageService,
    private loginService: LoginService,
    private HomeService:HomeService
    
  ) {
    let token = this.local.retrieve("accessToken");
    let type = this.local.retrieve('type');
    this.isLogin = (token) ? true : false;
    this.isVendor = (type === 'vendor') ? true : false;
  }

  ngOnInit(): void {

    this.getCartItems();
    this.getWishItems();
  }


  
  getCartItems(){
    let params= {};
    params['saveType'] = 'cart';
    this.HomeService.getCartItems(params).subscribe((payload) => {
			var response = JSON.parse(JSON.stringify(payload));
			
			if(!response.error){
		
        this.cartlist = response.data.length;
        
        
          
          
			}
   
			//console.log("products : ", this.products);
		}, (error) => {
			  // this.toastr.error(error.status + " : " + error.statusText);
			  console.log(error)
		});
  }
  getWishItems(){
    let params= {};
    params['saveType'] = 'wislist';
    this.HomeService.getCartItems(params).subscribe((payload) => {
			var response = JSON.parse(JSON.stringify(payload));
			
			if(!response.error){
		
        this.wishlist = response.data.length;
        
        
          
          
			}
   
			//console.log("products : ", this.products);
		}, (error) => {
			  // this.toastr.error(error.status + " : " + error.statusText);
			  console.log(error)
		});
  }

  signOut() {
    this.loginService.logoutUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((payload) => {
        var response = JSON.parse(JSON.stringify(payload));
        // console.log("response", response);
        // if (!response.error) {
        //   this.toastr.success(response.message);
        // }
        // else {
        //   this.toastr.error(response.message);
        // }
        this.loginService.logout();
        this.isLogin = false;
      }, (error) => {
        this.toastr.error(error.status + " : " + error.statusText);
        this.loginService.logout();
        this.isLogin = false;
      });
  }



  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
