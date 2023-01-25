import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MetersSchema extends BaseSchema {
  protected tableName = 'meters'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('serial_number', 50).unique()
      table.integer('site_id').unsigned().references('id').inTable('sites')
      table.timestamp('installation_date', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

