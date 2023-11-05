import { PartialType } from "@nestjs/swagger";
import { Product } from "../model/product.model";
export class ProductUpdateDto extends PartialType(Product) {}