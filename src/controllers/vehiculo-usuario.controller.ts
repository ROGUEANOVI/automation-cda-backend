import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Vehiculo,
UsuarioVehiculo,
Usuario,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoUsuarioController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Usuario through UsuarioVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.vehiculoRepository.usuarios(id).find(filter);
  }

  @post('/vehiculos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'create a Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInVehiculo',
            exclude: ['_id'],
          }),
        },
      },
    }) usuario: Omit<Usuario, '_id'>,
  ): Promise<Usuario> {
    return this.vehiculoRepository.usuarios(id).create(usuario);
  }

  @patch('/vehiculos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Vehiculo.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.vehiculoRepository.usuarios(id).patch(usuario, where);
  }

  @del('/vehiculos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Vehiculo.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.vehiculoRepository.usuarios(id).delete(where);
  }
}
