import { Component, EventEmitter } from '@angular/core';
import { 
  FormGroup, 
  FormBuilder, 
  Validators, 
  AbstractControl,
  FormControl
} from '@angular/forms';

function skuValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^123/)) {
    return {invalidSku: true};
  }
}

@Component({
  selector: 'demo-form-sku',
  templateUrl: './demo-form.component.html'
})
export class DemoForm{
  myForm: FormGroup;
  sku: AbstractControl;
  productName: string;
  constructor(fb: FormBuilder){
      //เป็น group มีหลาย input
      this.myForm = fb.group({
        'sku': ['',Validators.required],
        'productName':['']
      });
      //แยก input ออกมา
      this.sku = this.myForm.controls['sku'];

      //คือการ watching ค่าที่มีการเปลี่ยนไปของทั้ง form group
      this.myForm.valueChanges.subscribe(
        (form: any)=>{
          console.log('form changed to:',form);
        }
      );
      //แยก watching เฉพาะตัว
      this.sku.valueChanges.subscribe(
        (value: string)=>{
          console.log('sku changed to:',value);
        }
      );

  }
  
  onSubmit(form: any):void{
    console.log('hey',form);
  }
  
}

class Product {
  constructor(
    public sku: string,
    public name: string,
    public imageUrl: string,
    public department: string[],
    public price: number
  ) {

  }
}
@Component({
  selector: 'product-department',
  inputs: ['product'],
  template: `
    <span *ngFor="let name of product.department; let i=index">
      <a href="#">{{name}}</a>
      <span>{{i<(product.department.length-1)?'>':''}}</span>
    </span>
  `
})
export class ProductDepartment{
  product: Product;
}
@Component({
  selector: 'product-price',
  inputs: ['price'],
  template: `
    <p>\${{price}}</p>
  `
})
export class ProductPrice{
  price: number;
}

@Component({
  selector: 'product-img',
  inputs: ['product'],
  template:`
    <img [src]="product.imageUrl" alt="" style="height: 100px; display: block;">
  `
})
export class ProductImg{
  product: Product;
}
@Component({
  selector: 'product-row',
  inputs: ['product'],
  host:{'class':'col-lg-4'},
  templateUrl: './product-row.component.html'
})
export class ProductRow{
  product: Product;
  constructor(){
  }
}

@Component({
  selector: 'products-list',
  inputs: ['productList'],
  outputs: ['onProductSelected'],
  templateUrl: './product-list.component.html',
  host:{'class':'row'},
})
export class ProductList {
  productList: Product[];
  onProductSelected: EventEmitter<Product>;
  currentProduct: Product;

  constructor() {
    this.onProductSelected = new EventEmitter();
  }
  clicked(product: Product) :void{
    this.currentProduct = product;
    this.onProductSelected.emit(product);
  }
  isSelected(product: Product) :string{
    if(!product || !this.currentProduct){
      return '';
    }
    return product.sku === this.currentProduct.sku?'aliceblue':'';
  }

}

@Component({
  selector: 'inventory-app',
  template: `
  <nav></nav>
  <div class="container" style="padding-top:50px">
    <demo-form-sku></demo-form-sku>
    <products-list
      [productList]="products"
      (onProductSelected)="productWasSelected($event)">
    </products-list>
  </div>
  `,
})
export class AppComponent {
  products: Product[];

  constructor() {

    this.products = [
      new Product(
        'nicehat',
        'A nice black hat',
        '/resources/images/products/black-hat.jpg',
        ['Men', 'Accessories', 'Hats'],
        29.99),
      new Product(
        'myshoes',
        'Black Running Shoes',
        '/resources/images/products/black-shoes.jpg',
        ['Men', 'Shoes', 'Running Shoes'],
        109.99),

    ];
  }
  productWasSelected(product: Product): void {
    console.log('Product clicked: ', product);
  }

}
@Component({
    selector: 'nav',
    host: {'class':'navbar navbar-inverse navbar-fixed-top'},
    template: `
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    `
})
export class Navbar{

}
