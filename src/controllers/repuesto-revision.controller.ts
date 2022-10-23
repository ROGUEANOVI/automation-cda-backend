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
  Repuesto, Revision
} from '../models';
import {RepuestoRepository} from '../repositories';

export class RepuestoRevisionController {
  constructor(
    @repository(RepuestoRepository) protected repuestoRepository: RepuestoRepository,
  ) { }

  @get('/repuestos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Array of Repuesto has many Revision through RevisionRepuesto',
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
    return this.repuestoRepository.revisiones(id).find(filter);
  }

  @post('/repuestos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'create a Revision model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revision)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Repuesto.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revision, {
            title: 'NewRevisionInRepuesto',
            exclude: ['_id'],
          }),
        },
      },
    }) revision: Omit<Revision, '_id'>,
  ): Promise<Revision> {
    return this.repuestoRepository.revisiones(id).create(revision);
  }

  @patch('/repuestos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Repuesto.Revision PATCH success count',
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
    return this.repuestoRepository.revisiones(id).patch(revision, where);
  }

  @del('/repuestos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Repuesto.Revision DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revision)) where?: Where<Revision>,
  ): Promise<Count> {
    return this.repuestoRepository.revisiones(id).delete(where);
  }
}
