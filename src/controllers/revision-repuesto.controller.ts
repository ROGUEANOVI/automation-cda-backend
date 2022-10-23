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
import {RevisionRepository} from '../repositories';

export class RevisionRepuestoController {
  constructor(
    @repository(RevisionRepository) protected revisionRepository: RevisionRepository,
  ) { }

  @get('/revisiones/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Array of Revision has many Repuesto through RevisionRepuesto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Repuesto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Repuesto>,
  ): Promise<Repuesto[]> {
    return this.revisionRepository.repuestos(id).find(filter);
  }

  @post('/revisiones/{id}/repuestos', {
    responses: {
      '200': {
        description: 'create a Repuesto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Repuesto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Revision.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuesto, {
            title: 'NewRepuestoInRevision',
            exclude: ['_id'],
          }),
        },
      },
    }) repuesto: Omit<Repuesto, '_id'>,
  ): Promise<Repuesto> {
    return this.revisionRepository.repuestos(id).create(repuesto);
  }

  @patch('/revisiones/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Revision.Repuesto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuesto, {partial: true}),
        },
      },
    })
    repuesto: Partial<Repuesto>,
    @param.query.object('where', getWhereSchemaFor(Repuesto)) where?: Where<Repuesto>,
  ): Promise<Count> {
    return this.revisionRepository.repuestos(id).patch(repuesto, where);
  }

  @del('/revisiones/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Revision.Repuesto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Repuesto)) where?: Where<Repuesto>,
  ): Promise<Count> {
    return this.revisionRepository.repuestos(id).delete(where);
  }
}
