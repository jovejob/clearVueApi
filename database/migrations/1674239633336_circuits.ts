import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CircuitsSchema extends BaseSchema {
  protected tableName = 'circuits'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.timestamp('installation_date', { useTz: true })
      table.boolean('is_main')
      table.timestamp('created_at', { useTz: true })
      table.integer('meter_id').unsigned().references('id').inTable('meters')

      // To create a sub-circuit relationship in the Circuit model, where a Circuit can have many child circuits.
      // Circuit 1.1.1 can have subs like Circuit 1.1.1.1 with this `hasMany` relationship in the Circuit model
      table.integer('circuit_id').unsigned().references('id').inTable('circuits')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

