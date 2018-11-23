import { Arg, FieldResolver, Mutation, Resolver, Root } from 'type-graphql';
import { Inject } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Container } from '../entity/Container';
import { Product } from '../entity/Product';
import { Stock } from '../entity/Stock';
import { StockBuilder } from '../service/builders/StockBuilder';
import { NewStock } from './types/Stock';

@Resolver(of => Stock)
export class StockResolver {
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>;

    @InjectRepository(Product)
    private productRepository: Repository<Product>;

    @InjectRepository(Container)
    private containerRepository: Repository<Container>;

    @Inject()
    private builder: StockBuilder;

    @Mutation(returns => Stock, { nullable: true })
    async createStock(@Arg('stock') newStock: NewStock): Promise<Stock> {
        const product = await this.productRepository.findOneOrFail({
            id: newStock.product,
        });
        const container = await this.containerRepository.findOneOrFail({
            id: newStock.container,
        });

        const stock = this.builder
            .setProduct(product)
            .setContainer(container)
            .setExpiry(newStock.expiry)
            .setQuantity(newStock.quantity)
            .create();

        return this.stockRepository.save(stock);
    }

    @FieldResolver(type => Product, { nullable: true })
    async product(@Root() stock: Stock): Promise<Product> {
        return (await this.stockRepository.findOne(
            { id: stock.id },
            { relations: ['product'] },
        )).product;
    }

    @FieldResolver(type => Container, { nullable: true })
    async container(@Root() stock: Stock): Promise<Container> {
        return (await this.stockRepository.findOne(
            { id: stock.id },
            { relations: ['container'] },
        )).container;
    }
}
