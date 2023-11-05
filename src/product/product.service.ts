import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    
    return  await newProduct.save()
    
      
    }

  async findOneBySerialNo(serialNo: string): Promise<Product | null> {
    const product = await this.productModel.findOne({ serialNo }).exec();
    if (product) {
      return product;
    } else {
      throw new NotFoundException(`Product with serial No ${serialNo} not found`);
    }
  }

  async findallproduct(){
    return this.productModel.find().exec()
  }
}

