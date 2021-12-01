import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseURL = environment.API_URL;

  constructor(private httpClient:HttpClient) { }

  getProductList(formData:any):Observable<any>{
    return this.httpClient.post<any>(this.baseURL+"/productForSell/getProducts", formData);
  }

  getCategoryList(params = {}):Observable<any>{
    return this.httpClient.get<any>(this.baseURL+"/category/subCategories",{ params: params });
  }
  
  getProductDetails(formData:any):Observable<any>{
    return this.httpClient.post<any>(this.baseURL+"/productForSell/getProductVariants", formData);
  }

  getProductSizeVariants(formData:any):Observable<any>{
    return this.httpClient.post<any>(this.baseURL+"/productForSell/getProductSizeVariants", formData);
  }

   // add item to car/ wishlist common method
	  addProductToCartWishList(params:object) {
      return this.httpClient.post(this.baseURL + "/cart/create-cart", params);
    }

// delete item to cart/ wishlist common method
    deleteProductToCartWishList(params:object) {
      return this.httpClient.post(this.baseURL + "/cart/delete-cart", params);
    }

    // convert wishlist item into cart
    covertProductToCartWishList(params:object) {
      return this.httpClient.post(this.baseURL + "/cart/convert-cart", params);
    }

  // get cart or whishlist items based on requested param
  getCartItems(params:object){
    return this.httpClient.post(this.baseURL+'/cart/get-cart', params);
  }

}
