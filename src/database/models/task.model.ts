import { PrimaryKey, Model, Table, Column } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'Tasks',
  timestamps: true,
  updatedAt: 'updatedAt',
})
class Task extends Model {
  @PrimaryKey
  @Column({
    type: DataTypes.INTEGER,
    comment: 'Unique identifier',
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataTypes.STRING(255),
    comment: 'Title of the task',
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataTypes.TEXT,
    comment: 'Description of the task',
    allowNull: true,
  })
  declare description: string | null;

  @Column({
    type: DataTypes.ENUM('INCOMPLETE', 'COMPLETE'),
    comment: 'Status of the task',
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataTypes.DATE,
    comment: 'Due date of the task',
    allowNull: true,
  })
  declare dueDate: Date | null;

  @Column({
    type: DataTypes.DATE,
    comment: 'Creation date time of the task',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  declare createdAt: Date;

  @Column({
    type: DataTypes.DATE,
    comment: 'Updation date time of the task',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  declare updatedAt: Date;
}

export default Task;