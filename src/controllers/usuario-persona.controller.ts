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
  Usuario,
  Persona,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioPersonaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/persona', {
    responses: {
      '200': {
        description: 'Usuario has one Persona',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Persona),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona> {
    return this.usuarioRepository.persona(id).get(filter);
  }

  @post('/usuarios/{id}/persona', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInUsuario',
            exclude: ['_id'],
            optional: ['idUsuario']
          }),
        },
      },
    }) persona: Omit<Persona, '_id'>,
  ): Promise<Persona> {
    return this.usuarioRepository.persona(id).create(persona);
  }

  @patch('/usuarios/{id}/persona', {
    responses: {
      '200': {
        description: 'Usuario.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.usuarioRepository.persona(id).patch(persona, where);
  }

  @del('/usuarios/{id}/persona', {
    responses: {
      '200': {
        description: 'Usuario.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.usuarioRepository.persona(id).delete(where);
  }
}
