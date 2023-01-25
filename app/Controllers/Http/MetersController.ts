import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Meter from 'App/Models/Meter'

export default class MetersController {
  public async index({ response }: HttpContextContract) {
    const meters = await Meter.query().preload('circuits').preload('site')
    return response.json(meters)
  }

  public async show({ params, response }: HttpContextContract) {
    const meter = await Meter.query().where('id', params.id).preload('circuits').preload('site').first()
    if (!meter) {
      return response.status(404).json({
        message: 'Meter not found',
      })
    }
    return response.json(meter)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['siteId', 'serial_number', 'installation_date'])
    const meter = await Meter.create(data)
    return response.status(201).json(meter)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const meter = await Meter.find(params.id)
    if (!meter) {
      return response.status(404).json({
        message: 'Meter not found',
      })
    }
    meter.siteId = request.input('siteId')
    meter.serial_number = request.input('serial_number')
    meter.installation_date = request.input('installation_date')
    await meter.save()
    return response.json(meter)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const meter = await Meter.find(params.id)
    if (!meter) {
      return response.status(404).json({
        message: 'Meter not found',
      })
    }
    await meter.delete()
    return response.status(204).json({})
  }
}
