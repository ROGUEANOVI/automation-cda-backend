import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  SeguroAdicional, Vehiculo
} from '../models';
import {SeguroAdicionalRepository} from '../repositories';

export class SeguroAdicionalVehiculoController {
  constructor(
    @repository(SeguroAdicionalRepository) protected seguroAdicionalRepository: SeguroAdicionalRepository,
  ) { }

  @get('/seguros-adicionales/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of SeguroAdicional has many Vehiculo through VehiculoSeguroAdicional',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.seguroAdicionalRepository.vehiculos(id).find(filter);
  }

  @post('/seguros-adicionales/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'create a Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SeguroAdicional.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInSeguroAdicional',
            exclude: ['_id'],
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, '_id'>,
  ): Promise<Vehiculo> {
    return this.seguroAdicionalRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/seguros-adicionales/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'SeguroAdicional.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.seguroAdicionalRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/seguros-adicionales/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'SeguroAdicional.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.seguroAdicionalRepository.vehiculos(id).delete(where);
  }
}
