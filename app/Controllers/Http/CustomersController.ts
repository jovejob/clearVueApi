import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import Site from 'App/Models/Site'
import Meter from 'App/Models/Meter'
import Circuit from 'App/Models/Circuit'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CustomersController {
  public async index({ response }: HttpContextContract) {
    const customers = await Customer.query().preload('sites')
    return response.json(customers)
  }

  public async show({ params, response }: HttpContextContract) {
    const customer = await Customer.query().where('id', params.id).preload('sites').first()
    if (!customer) {
      return response.status(404).json({
        message: 'Customer not found',
      })
    }
    return response.json(customer)
  }

  public async store({ request, response }: HttpContextContract) {
    const customerSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.minLength(3),
        rules.maxLength(255),
        rules.required()
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.required()
      ]),
      vat_number: schema.string({ trim: true }, [
        rules.minLength(3),
        rules.maxLength(255),
        rules.required()
      ]),
    })
    const payload = await request.validate({ schema: customerSchema })
    const customer = await Customer.create(payload)
    return response.status(201).json(customer)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const customerSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.minLength(3),
        rules.maxLength(255),
      ]),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.minLength(3),
        rules.maxLength(255),
      ]),
      vat_number: schema.string({ trim: true }, [
        rules.minLength(3),
        rules.maxLength(255),
      ]),
    })

    const payload = await request.validate({ schema: customerSchema })

    const customer = await Customer.find(params.id)
    if (!customer) {
      return response.status(404).json({
        message: 'Customer not found',
      })
    }
    customer.name = payload.name
    customer.email = payload.email
    customer.vat_number = payload.vat_number
    await customer.save()
    return response.json(customer)

  }

  public async destroy({ params, response }: HttpContextContract) {
    const customer = await Customer.find(params.id)
    if (!customer) {
      return response.status(404).json({
        message: 'Customer not found',
      })
    }
    await customer.delete()
    return response.status(204).json({})
  }

  public async fillAll({ response, request }) {
    // Create a new customer
    const customer = await Customer.create({ name: 'Jove Trajkoski', email: 'jovetrajkoski@example-email.com' });

    // Create some sites for the customer
    const site1 = await Site.create({ name: 'Site 1', customerId: customer.id });
    const site2 = await Site.create({ name: 'Site 2', customerId: customer.id });

    // Create some meters for site1
    const meter11 = await Meter.create({ serial_number: 'Meter 1.1', siteId: site1.id });
    const meter12 = await Meter.create({ serial_number: 'Meter 1.2', siteId: site1.id });

    // Create some circuits for meter11
    const circuit111 = await Circuit.create({ name: 'Circuit 1.1.1', meterId: meter11.id, installation_date: "2023-01-07 00:00:00+01" });
    const circuit112 = await Circuit.create({ name: 'Circuit 1.1.2', meterId: meter11.id, installation_date: "2023-01-07 00:00:00+01" });
    const circuit113 = await Circuit.create({ name: 'Circuit 1.1.3', meterId: meter11.id, installation_date: "2023-01-07 00:00:00+01" });
    const circuit114 = await Circuit.create({ name: 'Circuit 1.1.4', meterId: meter11.id, installation_date: "2023-01-07 00:00:00+01" });
    const circuit115 = await Circuit.create({ name: 'Circuit 1.1.5', meterId: meter11.id, installation_date: "2023-01-07 00:00:00+01" });
    const circuit116 = await Circuit.create({ name: 'Circuit 1.1.6', meterId: meter11.id, installation_date: "2023-01-07 00:00:00+01" });


    // Create some sub-circuit for circuit111
    const subCircuit1111 = await Circuit.create({ name: 'Circuit 1.1.1.1', circuitId: circuit111.id, installation_date: "2023-01-07 00:00:00+01" });
    const subCircuit1112 = await Circuit.create({ name: 'Circuit 1.1.1.2', circuitId: circuit111.id, installation_date: "2023-01-07 00:00:00+01" });


    // Create some meters for site2
    const meter21 = await Meter.create({ serial_number: 'Meter 2.1', siteId: site2.id });

    // Create some circuits for meter21
    const circuit211 = await Circuit.create({ name: 'Circuit 2.1.1', meterId: meter21.id });
    const circuit212 = await Circuit.create({ name: 'Circuit 2.1.2', meterId: meter21.id });

    return response.created(circuit212)
  }
}


