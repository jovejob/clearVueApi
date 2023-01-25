import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SitesSchema extends BaseSchema {
  protected tableName = 'sites'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('address')
      table.string('post_code')
      table.string('coordinates')
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}