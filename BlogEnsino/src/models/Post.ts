import { Model, DataTypes, CreationOptional, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PostAttributes {
    id: CreationOptional<string>;
    title: string;
    text: string;
    user_id: string;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
}
interface PostCreationAttributes extends Optional<PostAttributes, 'id'> { }

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    public id!: CreationOptional<string>;
    public title!: string;
    public text!: string;
    public user_id!: string;

    static initModel() {
        Post.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                text: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                user_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
            },
            {
                sequelize,
                tableName: 'posts',
                timestamps: true,
            }
        );
    }

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}
Post.initModel();