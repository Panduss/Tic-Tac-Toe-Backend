import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, IsIn } from "class-validator"
import defaultBoard from './controller'

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Length(5, 30)
  @Column('text', {nullable: false})
  name: string

  @IsString()
  @IsIn([['red','blue', 'green', 'yellow', 'magenta']])
  @Column('text')
  colour: string

  @Column('json', {default: defaultBoard})
  board: string[][]
}

