import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './model/product.model';
import { User } from 'src/user/model/user.model';
import { GetRestApiCurrentUser } from 'src/common/customDecorators/restApi.decorator.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ProductUpdateDto } from './dto/updateproduct.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Post('create')
    @UseGuards(JwtAuthGuard)
   async createproduct(@GetRestApiCurrentUser() user: User, @Body() productinput: Product){
        return await this.productService.createProduct(user, productinput);
    }


    @Get('findallproduct')
    async findallproduct(){
        return await this.productService.findallproduct()
    }


    @Get(':serialNo')
  async findOneBySerialNo(@Param('serialNo') serialNo: string) {
    return await this.productService.findOneBySerialNo(serialNo);
   
  }


    @Put(':serialNo')
    @UseGuards(JwtAuthGuard)
    async updateProductById(@Param('serialNo')serialNo: string, @Body() input: ProductUpdateDto){
        return await this.productService.updateProductBySerialNo(serialNo, input)
    }

    @Delete(':serialNo')
    remove(@Param('serialNo') serialNo: string){
        return this.productService.deleteProduct(serialNo)
    }
}
