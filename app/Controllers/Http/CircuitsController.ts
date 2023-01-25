import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Circuit from 'App/Models/Circuit'
import { DateTime } from 'luxon'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CircuitsController {
  public async index() {
    const circuits = await Circuit
      .query()
      .preload('subCircuits', (subCircuitsQuery) => {
        subCircuitsQuery.preload('meter', (metersQuery) => {
          metersQuery.preload('site', (sitesQuery) => {
            sitesQuery.preload('customer')
          }).preload('circuits')
        })
      }).preload('meter')

    return circuits
  }

  public async store({ request }: HttpContextContract) {
    const requestData = request.all()
    const circuitSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.minLength(3),
        rules.maxLength(255),
      ]),
      meter_id: schema.number([
        rules.exists({ table: 'meters', column: 'id' }),
      ]),
      installation_date: schema.date({
        format: 'yyyy-MM-dd',
      }),
      // is_main: schema.boolean()
      // circuit_id: schema.number(),
    })

    const payload = await request.validate({ schema: circuitSchema })
    const circuit = await Circuit.create(requestData)
    return circuit
  }


  public async show({ params, response }: HttpContextContract) {

    const circuit = await Circuit
      .query()
      .select('*')
      .where('id', params.id)
      .preload('subCircuits', (subCircuitsQuery) => {
        subCircuitsQuery.preload('meter', (metersQuery) => {
          metersQuery.preload('site', (sitesQuery) => {
            sitesQuery.preload('customer')
          }).preload('circuits')
        })
      }).preload('meter')
      .first()

    return response.json(circuit)
  }

  public async update({ params, request }: HttpContextContract) {
    const requestData = request.all()
    const circuitSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.minLength(3),
        rules.maxLength(255),
      ]),
      meter_id: schema.number([
        rules.exists({ table: 'meters', column: 'id' }),
      ]),
      installation_date: schema.date({
        format: 'yyyy-MM-dd',
      }),
      // is_main: schema.boolean(),
      // circuit_id: schema.number(),
    })

    const payload = await request.validate({ schema: circuitSchema })
    payload['installation_date'] = DateTime.fromFormat(request.input('installation_date'), "yyyy-MM-dd")
    const circuit = await Circuit.query().where('id', params.id).firstOrFail()

    console.log("requestData", requestData)
    // circuit.merge(payload)
    circuit.merge(requestData)
    await circuit.save()
    return circuit
  }

  public async destroy({ params }: HttpContextContract) {
    const circuit = await Circuit.query().where('id', params.id).firstOrFail()
    await circuit.delete()
    return circuit
  }
}


