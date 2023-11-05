import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './model/product.model';
import { Model } from 'mongoose';
import { User } from 'src/user/model/user.model';
import { ProductUpdateDto } from './dto/updateproduct.dto';

@Injectable()
export class ProductService {
    
 
 
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}


async  createProduct(user: User, input: Product): Promise<Product> {

  const serialNumber = await this.productModel.findOne({
    serialNo: input.serialNo
  }).exec();
   
  if(serialNumber){
    throw new HttpException('product with same id exist', HttpStatus.UNPROCESSABLE_ENTITY)
  }


  const createProduct = await this.productModel.create({
    ...input,
    userId: user._id
  })
    return await createProduct.save()
    
         //  input.userId = user._id;
    // const newProduct = new this.productModel(input);
    
    // return  await newProduct.save()
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

  async updateProductBySerialNo(serialNo: string, input: ProductUpdateDto) {
    const product = await this.productModel.findOneAndUpdate(
      { serialNo },
      {$set: input }
      );
      if (!product) {
        throw new HttpException('serial number not found', HttpStatus.NOT_FOUND)
      }

      return product
}
async deleteProduct(serialNo: string) {
  const product = await this.productModel.findOneAndDelete({ serialNo})
  if (!product) {
    throw new HttpException('product you want to delete is not in the store', HttpStatus.UNPROCESSABLE_ENTITY)
  }
  return {
    info: `product with serial No ${serialNo} successfully deleted`
  }
}

}

