import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AccessTokenService } from 'app/services/access-token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HomeService } from './../../services/home.service';
import { JsonObject } from '@angular-devkit/core';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
 
  inputnumber = 0;  
  plus(){
    this.inputnumber = this.inputnumber+1;
  }
 
  minus(){
    if (this.inputnumber ! = 0){
     this.inputnumber = this.inputnumber-1;
    }
  }
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  currDiv: string = 'A';
  productListArray:any[];
  categoryListArray:any[];
  
  ShowDiv(divVal: string) {
    this.currDiv = divVal;
  }

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private local: LocalStorageService,
    private accessTokenService: AccessTokenService,
    private HomeService:HomeService
  ) {
    let accessToken = this.local.retrieve('accessToken');
    let type = this.local.retrieve('type');
    if (!accessToken || type !== 'user') {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.getProductList();
    this.getCategoryList();
  
  }

 



   loadProduct(){
    $(document).ready(function () {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        360: {
          items: 1,
          nav: false
        },
        640: {
          items: 2,
          nav: false
        },
        768: {
          items: 3,
          nav: false
        },
        1024: {
          items: 4,
          nav: false
        },

        1050: {
          items: 4,
          nav: true,
          loop: false
        }
      }
    });
  });
   }

   getProductList(parentId = '') {
    let params: JsonObject = {};
    this.HomeService.getProductList(params).subscribe(

      (response:any) => {

        if(response && response.data && response.data.length){
          console.log(response.data.length);
          this.productListArray = response.data;
          this.loadProduct();
        }else{
          this.toastr.success(response.message);
          this.loadProduct();
        }

      },(error:any) => {
        console.log(error);
        this.toastr.error(error.status + " : " + error.statusText);
      }
    )
  }

  getCategoryList(parentId = '') {
    let params: JsonObject = {};
    this.HomeService.getCategoryList(params).subscribe(
      (response:any) => {
        // console.log("Category List Array" , response);
        if(response && response.data){
          console.log(response.data.categories.length);
          this.categoryListArray = response.data.categories;
          
        }

      },(error:any) => {
        console.log(error);
        this.toastr.error(error.status + " : " + error.statusText);
      }
    )
  }

  openProductDetail(id:any,title:any){
    this.router.navigate(['/productDetails'], { queryParams: { id: id ,title:title} });
  }

    //common method to add product to cart/whishlist
	addToCart(data:object, type:number){


    if( type==2){
    let incvalue = document.getElementById("cartlistinc").innerText


  let newincvalue = parseInt(incvalue) + 1
  document.getElementById("cartlistinc").innerHTML= newincvalue.toString()
    }
    else{
      let incvalue = document.getElementById("wishlistinc").innerText


      let newincvalue = parseInt(incvalue) + 1
      document.getElementById("wishlistinc").innerHTML= newincvalue.toString()
    }
		let accessToken = this.local.retrieve('accessToken');
    
    if (!accessToken) {
      this.router.navigateByUrl('/login');
    }
		let params = {};
		params['saveType'] = (type==2?'cart':"wislist");
		params['productId'] = data['_id'];
    params['variantId'] = data['productVariant'][0]['_id'];
		params['quantity'] = 1;

		this.HomeService.addProductToCartWishList(params).subscribe((payload) => {
			var response = JSON.parse(JSON.stringify(payload));
			
			if(!response.error){
				console.log("response : ", response);
				this.toastr.success(response.message);
			}else{
				this.toastr.error(response.message);
			}
			
		}, (error) => {
			// this.toastr.error(error.status + " : " + error.statusText);
			console.log(error)
		});
	}

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

@HostListener('window:load')
  async popup() {
    document.getElementById('popup').click();
  }

}
