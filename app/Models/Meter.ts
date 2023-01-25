import { DateTime } from 'luxon'
import Circuit from 'App/Models/Circuit'
import Site from 'App/Models/Site'
import {
  column,
  BaseModel,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'

export default class Meter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Foreign key is still on the same model
  @column()
  public siteId: number

  @column({ unique: true })
  public serial_number: string

  @column.dateTime()
  public installation_date: DateTime

  @hasMany(() => Circuit)
  public circuits: HasMany<typeof Circuit>

  @belongsTo(() => Site)
  public site: BelongsTo<typeof Site>
}
