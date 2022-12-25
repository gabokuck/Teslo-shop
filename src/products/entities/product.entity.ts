import { ApiProperty } from "@nestjs/swagger";
import { userInfo } from "os";
import { User } from "src/auth/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";

@Entity({name: 'products'})
export class Product {

  @ApiProperty({
    example: '1de3e183-4feb-41af-a64c-4cd9a199cd64',
    description: 'Product ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product Title',
    uniqueItems: true
  })
  @Column('text', {
    unique: true,
  })
  title: string

  @ApiProperty({
    example: 0,
    description: 'Product Price'
  })
  @Column('float', {
    default: 0
  })
  price: number

  @ApiProperty({
    example: 'Description of product',
    description: 'Product description',
    default: null
  })
  @Column({
    type: 'text',
    nullable: true
  })
  description: string


  @ApiProperty({
    example: 't_shirt_teslo',
    description: 'Product SLUG- for SEO',
    uniqueItems: true
  })
  @Column('text', {
    unique: true
  })
  slug: string

  @ApiProperty({
    example: 10,
    description: 'Product stock',
    default: 0
  })
  @Column('int', {
    default: 0
  })
  stock: number

  @ApiProperty({
    example: ['M', 'XL', 'XXL'],
    description: 'Product Sizes',
  })
  @Column('text', {
    array: true
  })
  sizes: string[]

  @ApiProperty({
    example: 'women',
    description: 'Product Gender',
  })
  @ApiProperty()
  @Column('text')
  gender: string

  @ApiProperty()
  @Column('text', {
    array: true,
    default: []
  })
  tags:string[]

  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.product,
    {cascade: true,
      eager: true
    }
  )
  images?: ProductImage[];

  @ManyToOne(
    () => User,
    (user) => user.product,
    {eager: true}
  )
  user: User

  @BeforeInsert()
  updateSlugInsert(){

    if(!this.slug){
      this.slug = this.title
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')

  }

  @BeforeUpdate()
  checkSlugUpdate(){
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
  }
}
