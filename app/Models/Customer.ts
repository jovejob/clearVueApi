import { DateTime } from 'luxon'
import Site from 'App/Models/Site'
import {
  column,
  BaseModel,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public vat_number: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Site)
  public sites: HasMany<typeof Site>
}
