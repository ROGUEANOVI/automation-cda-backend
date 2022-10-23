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
import {VehiculoRepository} from '../repositories';

export class VehiculoSeguroAdicionalController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/seguros-adicionales', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many SeguroAdicional through VehiculoSeguroAdicional',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SeguroAdicional)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SeguroAdicional>,
  ): Promise<SeguroAdicional[]> {
    return this.vehiculoRepository.seguroAdicionales(id).find(filter);
  }

  @post('/vehiculos/{id}/seguros-adicionales', {
    responses: {
      '200': {
        description: 'create a SeguroAdicional model instance',
        content: {'application/json': {schema: getModelSchemaRef(SeguroAdicional)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SeguroAdicional, {
            title: 'NewSeguroAdicionalInVehiculo',
            exclude: ['_id'],
          }),
        },
      },
    }) seguroAdicional: Omit<SeguroAdicional, '_id'>,
  ): Promise<SeguroAdicional> {
    return this.vehiculoRepository.seguroAdicionales(id).create(seguroAdicional);
  }

  @patch('/vehiculos/{id}/seguros-adicionales', {
    responses: {
      '200': {
        description: 'Vehiculo.SeguroAdicional PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SeguroAdicional, {partial: true}),
        },
      },
    })
    seguroAdicional: Partial<SeguroAdicional>,
    @param.query.object('where', getWhereSchemaFor(SeguroAdicional)) where?: Where<SeguroAdicional>,
  ): Promise<Count> {
    return this.vehiculoRepository.seguroAdicionales(id).patch(seguroAdicional, where);
  }

  @del('/vehiculos/{id}/seguros-adicionales', {
    responses: {
      '200': {
        description: 'Vehiculo.SeguroAdicional DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SeguroAdicional)) where?: Where<SeguroAdicional>,
  ): Promise<Count> {
    return this.vehiculoRepository.seguroAdicionales(id).delete(where);
  }
}
