import {
    Arg,
    Authorized,
    Ctx,
    FieldResolver,
    Mutation,
    Query,
    Resolver,
    Root,
} from 'type-graphql';
import { Inject } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Product } from '../entity/Product';
import { User } from '../entity/User';
import ProductBuilder from '../service/builders/ProductBuilder';
import { NewProduct } from './types/Product';

@Resolver(of => Product)
export class ProductResolver {
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>;

    @Inject()
    private readonly builder: ProductBuilder;

    @Mutation(returns => Product, { nullable: true })
    @Authorized()
    async createProduct(
        @Ctx('user') user: User,
        @Arg('product') newProduct: NewProduct,
    ): Promise<Product> {
        const product = this.builder
            .setName(newProduct.name)
            .setCreator(user)
            .create();

        return this.productRepository.save(product);
    }

    @FieldResolver(type => User, { nullable: true })
    async creator(@Root() product: Product): Promise<User> {
        return (await this.productRepository.findOne(
            { id: product.id },
            { relations: ['creator'] },
        )).creator;
    }
}
