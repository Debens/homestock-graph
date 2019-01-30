import { Service } from 'typedi';

import { Product } from '../../entity/Product';
import { User } from '../../entity/User';

@Service()
export class ProductBuilder {
    constructor(private readonly product: Product = new Product()) {}

    create(): Product {
        return this.product;
    }

    setName(name: string): ProductBuilder {
        this.product.name = name;

        return this;
    }

    setCreator(user: User): ProductBuilder {
        this.product.creator = user;

        return this;
    }
}

export default ProductBuilder;
