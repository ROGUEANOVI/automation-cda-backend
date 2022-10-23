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
  Persona,
  Usuario,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaUsuarioController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Persona has one Usuario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario> {
    return this.personaRepository.usuario(id).get(filter);
  }

  @post('/personas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInPersona',
            exclude: ['_id'],
            optional: ['idPersona']
          }),
        },
      },
    }) usuario: Omit<Usuario, '_id'>,
  ): Promise<Usuario> {
    return this.personaRepository.usuario(id).create(usuario);
  }

  @patch('/personas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Persona.Usuario PATCH success count',
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
    return this.personaRepository.usuario(id).patch(usuario, where);
  }

  @del('/personas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Persona.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.personaRepository.usuario(id).delete(where);
  }
}
