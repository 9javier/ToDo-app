import { Model, Table, AutoIncrement, PrimaryKey, Column, AllowNull, NotEmpty } from "sequelize-typescript";

export interface UserI{
    id?: number | null
    first_name: string
    last_name: string
    email: string
    password: string
}

@Table(
    {
        tableName: "todo",
        timestamps: false
    }
)
export default class Todo extends Model implements Todo{
    
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @Column
    date: Date
    
    @AllowNull(false)
    @NotEmpty
    @Column
    description: string

    @AllowNull(false)
    @NotEmpty
    @Column
    title: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    completed: string;


}