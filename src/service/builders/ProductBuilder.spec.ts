import Container from 'typedi';

import { Product } from '../../entity/Product';
import { User } from '../../entity/User';
import { ProductBuilder } from './ProductBuilder';

describe('ProductBuilder', () => {
    let builder: ProductBuilder;
    beforeEach(() => {
        builder = new ProductBuilder();
    });

    it('should be a typedi service', () => {
        expect(Container.get(ProductBuilder)).toBeInstanceOf(ProductBuilder);
    });

    describe('when calling create', () => {
        let result: Product;
        beforeEach(() => {
            result = builder.create();
        });

        it('then should return a Product', () => {
            expect(result).toBeInstanceOf(Product);
        });
    });

    describe('when calling setName', () => {
        const name = 'zac efron';
        let result: ProductBuilder;
        beforeEach(() => {
            result = builder.setName(name);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: Product;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a Product', () => {
                expect(result).toBeInstanceOf(Product);
            });

            it('then should set the Products name', () => {
                expect(result.name).toBe(name);
            });
        });
    });

    describe('when calling setCreator', () => {
        const creator = new User();
        let result: ProductBuilder;
        beforeEach(() => {
            result = builder.setCreator(creator);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: Product;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a Product', () => {
                expect(result).toBeInstanceOf(Product);
            });

            it('then should set the Products creator', () => {
                expect(result.creator).toBe(creator);
            });
        });
    });
});
