import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './model/product.model';
import { Model } from 'mongoose';
import { User } from 'src/user/model/user.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}


async  createProduct(user: User, input: Product): Promise<Product> {

  console.log(input)
  const serialNumber = await this.productModel.findOne({
    serialNo: input.serialNo
  }).exec();
   
  if(serialNumber){
    throw new HttpException('product with same id exist', HttpStatus.UNPROCESSABLE_ENTITY)
  }

     input.userId = user._id;
    const newProduct = new this.productModel(input);
    console.log(newProduct);
    return await newProduct.save();
      
    }
}

