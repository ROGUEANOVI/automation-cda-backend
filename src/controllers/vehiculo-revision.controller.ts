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
  Revision, Vehiculo
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoRevisionController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Revision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Revision)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Revision>,
  ): Promise<Revision[]> {
    return this.vehiculoRepository.revisiones(id).find(filter);
  }

  @post('/vehiculos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revision)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {
            title: 'NewRevisionInVehiculo',
            exclude: ['_id'],
            optional: ['idVehiculo']
          }),
        },
      },
    }) revision: Omit<Revision, '_id'>,
  ): Promise<Revision> {
    return this.vehiculoRepository.revisiones(id).create(revision);
  }

  @patch('/vehiculos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Vehiculo.Revision PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {partial: true}),
        },
      },
    })
    revision: Partial<Revision>,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.vehiculoRepository.revisiones(id).patch(revision, where);
  }

  @del('/vehiculos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Vehiculo.Revision DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.vehiculoRepository.revisiones(id).delete(where);
  }
}
