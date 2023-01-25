import { DateTime } from 'luxon'

import Customer from 'App/Models/Customer'
import Meter from 'App/Models/Meter'

import {
  column,
  BaseModel,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'

export default class Site extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  // Foreign key is still on the same model
  @column()
  public customerId: number

  @column()
  public name: string

  @column()
  public coordinates: string

  @column()
  public address: string

  @column()
  public post_code: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>

  @hasMany(() => Meter)
  public meters: HasMany<typeof Meter>
}
