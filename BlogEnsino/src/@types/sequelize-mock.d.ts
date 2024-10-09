declare module 'sequelize-mock' {
    import { Sequelize, Model, DataTypes } from 'sequelize';

    export default class SequelizeMock {
        constructor();
        define(modelName: string, attributes: any, options?: any): any;
        mock: {
            reset: () => void;
            // Adicione outros métodos que você precisa mockar
        };
    }
}
