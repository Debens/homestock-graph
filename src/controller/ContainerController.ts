import { DeepPartial, EntityManager } from 'typeorm';
import { Controller, Mutation, Query } from 'vesper';

import { Container } from '../entity/Container';
import ContainerBuilder from '../service/builders/ContainerBuilder';

type ContainerQuery = DeepPartial<Container>;

interface INewContainer {
    name: string;
}

interface INewContainerParams {
    container: INewContainer;
}

@Controller()
export class UserController {
    constructor(
        private entityManager: EntityManager,
        private builder: ContainerBuilder,
    ) {}

    @Query()
    container(query: ContainerQuery) {
        return this.entityManager.findOne(Container, query);
    }

    @Query()
    containers() {
        return this.entityManager.find(Container);
    }

    @Mutation()
    createContainer({ container }: INewContainerParams) {
        const newContainer = this.builder.setName(container.name).create();

        return this.entityManager.save(Container, newContainer);
    }
}
