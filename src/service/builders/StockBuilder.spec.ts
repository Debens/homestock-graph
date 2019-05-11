import InjectionContainer from 'typedi';

import { Authentication } from '../../entity/Authentication';
import { Container } from '../../entity/Container';
import { Product } from '../../entity/Product';
import { Stock } from '../../entity/Stock';
import { StockBuilder } from './StockBuilder';

describe('StockBuilder', () => {
    let builder: StockBuilder;
    beforeEach(() => {
        builder = new StockBuilder();
    });

    it('should be a typedi service', () => {
        expect(InjectionContainer.get(StockBuilder)).toBeInstanceOf(StockBuilder);
    });

    describe('when calling create', () => {
        let result: Stock;
        beforeEach(() => {
            result = builder.create();
        });

        it('then should return a Stock', () => {
            expect(result).toBeInstanceOf(Stock);
        });
    });

    describe('when calling setQuantity', () => {
        describe('and not passing a quantity', () => {
            let result: StockBuilder;
            beforeEach(() => {
                result = builder.setQuantity();
            });

            it('then should return the builder for chaining', () => {
                expect(result).toBe(builder);
            });

            describe('and calling create', () => {
                let result: Stock;
                beforeEach(() => {
                    result = builder.create();
                });

                it('then should return a Stock', () => {
                    expect(result).toBeInstanceOf(Stock);
                });

                it('then should default the Stocks quantity to 1', () => {
                    expect(result.quantity).toBe(1);
                });
            });
        });

        describe('and passing a quantity', () => {
            const quantity = 10;
            let result: StockBuilder;
            beforeEach(() => {
                result = builder.setQuantity(quantity);
            });

            it('then should return the builder for chaining', () => {
                expect(result).toBe(builder);
            });

            describe('and calling create', () => {
                let result: Stock;
                beforeEach(() => {
                    result = builder.create();
                });

                it('then should return a Stock', () => {
                    expect(result).toBeInstanceOf(Stock);
                });

                it('then should set the Stocks quantity', () => {
                    expect(result.quantity).toBe(quantity);
                });
            });
        });
    });

    describe('when calling setExpiry', () => {
        describe('and passing a string', () => {
            const expiry = '1989-12-12';
            let result: StockBuilder;
            beforeEach(() => {
                result = builder.setExpiry(expiry);
            });

            it('then should return the builder for chaining', () => {
                expect(result).toBe(builder);
            });

            describe('and calling create', () => {
                let result: Stock;
                beforeEach(() => {
                    result = builder.create();
                });

                it('then should return a Stock', () => {
                    expect(result).toBeInstanceOf(Stock);
                });

                it('then should set the Stocks expiry', () => {
                    expect(result.expiry).toEqual(new Date(expiry));
                });
            });
        });

        describe('and passing a date', () => {
            const expiry = new Date();
            let result: StockBuilder;
            beforeEach(() => {
                result = builder.setExpiry(expiry);
            });

            it('then should return the builder for chaining', () => {
                expect(result).toBe(builder);
            });

            describe('and calling create', () => {
                let result: Stock;
                beforeEach(() => {
                    result = builder.create();
                });

                it('then should return a Stock', () => {
                    expect(result).toBeInstanceOf(Stock);
                });

                it('then should set the Stocks expiry', () => {
                    expect(result.expiry).toBe(expiry);
                });
            });
        });

        describe('and passing nothing', () => {
            let result: StockBuilder;
            beforeEach(() => {
                result = builder.setExpiry();
            });

            it('then should return the builder for chaining', () => {
                expect(result).toBe(builder);
            });

            describe('and calling create', () => {
                let result: Stock;
                beforeEach(() => {
                    result = builder.create();
                });

                it('then should return a Stock', () => {
                    expect(result).toBeInstanceOf(Stock);
                });

                it('then should not set the Stocks expiry', () => {
                    expect(result.expiry).toBeUndefined();
                });
            });
        });
    });

    describe('when calling setProduct', () => {
        const product = new Product();
        let result: StockBuilder;
        beforeEach(() => {
            result = builder.setProduct(product);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: Stock;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a Stock', () => {
                expect(result).toBeInstanceOf(Stock);
            });

            it('then should set the Stocks product type', () => {
                expect(result.product).toBe(product);
            });
        });
    });

    describe('when calling setContainer', () => {
        const container = new Container();
        let result: StockBuilder;
        beforeEach(() => {
            result = builder.setContainer(container);
        });

        it('then should return the builder for chaining', () => {
            expect(result).toBe(builder);
        });

        describe('and calling create', () => {
            let result: Stock;
            beforeEach(() => {
                result = builder.create();
            });

            it('then should return a Stock', () => {
                expect(result).toBeInstanceOf(Stock);
            });

            it('then should set the Stocks container', () => {
                expect(result.container).toBe(container);
            });
        });
    });
});
