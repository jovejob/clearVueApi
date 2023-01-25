import { DateTime } from 'luxon'
import Meter from 'App/Models/Meter'
// import Circuit from 'App/Models/Circuit'
import {
  column,
  BaseModel,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'

export default class Circuit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Foreign key is still on the same model
  @column()
  public meterId: number

  // this is like a parent for the subCircuits
  @column()
  public circuitId: number

  @column()
  public name: string

  @column.dateTime()
  public installation_date: DateTime

  // @column({ serializeAs: null })
  @column()
  public is_main: boolean

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @belongsTo(() => Meter)
  public meter: BelongsTo<typeof Meter>

  @hasMany(() => Circuit, 'id', 'circuit_id')
  public subCircuits: HasMany<typeof Circuit>
}
