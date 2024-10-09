import { Model, DataTypes, Optional, CreationOptional } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
    id: CreationOptional<string>;
    username: string;
    role: string;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: CreationOptional<string>;
    public username!: string;
    public role!: string;

    static initModel() {
        User.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                role: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                tableName: 'users',
                timestamps: true,
            }
        );
    }

    static associate(models: any) {
        this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
    }
}

User.initModel();
