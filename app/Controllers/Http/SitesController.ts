import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Site from 'App/Models/Site'

export default class SitesController {
  public async index({ response }: HttpContextContract) {
    const sites = await Site.query().preload('customer').preload('meters')
    return response.json(sites)
  }

  public async show({ params, response }: HttpContextContract) {
    const site = await Site.query().where('id', params.id).preload('customer').preload('meters').first()
    if (!site) {
      return response.status(404).json({
        message: 'Site not found',
      })
    }
    return response.json(site)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['customerId', 'name', 'coordinates', 'address', 'post_code'])
    const site = await Site.create(data)
    return response.status(201).json(site)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const site = await Site.find(params.id)
    if (!site) {
      return response.status(404).json({
        message: 'Site not found',
      })
    }
    site.customerId = request.input('customerId')
    site.name = request.input('name')
    site.coordinates = request.input('coordinates')
    site.address = request.input('address')
    site.post_code = request.input('post_code')
    await site.save()
    return response.json(site)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const site = await Site.find(params.id)
    if (!site) {
      return response.status(404).json({
        message: 'Site not found',
      })
    }
    await site.delete()
    return response.status(204).json({})
  }
}

