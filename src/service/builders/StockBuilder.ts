import { Service } from 'typedi';

import { Container } from '../../entity/Container';
import { Product } from '../../entity/Product';
import { Stock } from '../../entity/Stock';

@Service()
export class StockBuilder {
    constructor(private readonly stock: Stock = new Stock()) {}

    create(): Stock {
        return this.stock;
    }

    setQuantity(amount: number = 1) {
        this.stock.quantity = amount;

        return this;
    }

    setExpiry(expiry?: Date | string): StockBuilder {
        if (expiry) {
            this.stock.expiry = typeof expiry === 'string' ? new Date(expiry) : expiry;
        }

        return this;
    }

    setProduct(product: Product): StockBuilder {
        this.stock.product = product;

        return this;
    }

    setContainer(container: Container): StockBuilder {
        this.stock.container = container;

        return this;
    }
}
