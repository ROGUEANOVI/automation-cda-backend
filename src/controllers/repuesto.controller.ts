import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Repuesto} from '../models';
import {RepuestoRepository} from '../repositories';

export class RepuestoController {
  constructor(
    @repository(RepuestoRepository)
    public repuestoRepository : RepuestoRepository,
  ) {}

  @post('/repuestos')
  @response(200, {
    description: 'Repuesto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Repuesto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuesto, {
            title: 'NewRepuesto',
            exclude: ['_id'],
          }),
        },
      },
    })
    repuesto: Omit<Repuesto, '_id'>,
  ): Promise<Repuesto> {
    return this.repuestoRepository.create(repuesto);
  }

  @get('/repuestos/count')
  @response(200, {
    description: 'Repuesto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Repuesto) where?: Where<Repuesto>,
  ): Promise<Count> {
    return this.repuestoRepository.count(where);
  }

  @get('/repuestos')
  @response(200, {
    description: 'Array of Repuesto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Repuesto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Repuesto) filter?: Filter<Repuesto>,
  ): Promise<Repuesto[]> {
    return this.repuestoRepository.find(filter);
  }

  @patch('/repuestos')
  @response(200, {
    description: 'Repuesto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuesto, {partial: true}),
        },
      },
    })
    repuesto: Repuesto,
    @param.where(Repuesto) where?: Where<Repuesto>,
  ): Promise<Count> {
    return this.repuestoRepository.updateAll(repuesto, where);
  }

  @get('/repuestos/{id}')
  @response(200, {
    description: 'Repuesto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Repuesto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Repuesto, {exclude: 'where'}) filter?: FilterExcludingWhere<Repuesto>
  ): Promise<Repuesto> {
    return this.repuestoRepository.findById(id, filter);
  }

  @patch('/repuestos/{id}')
  @response(204, {
    description: 'Repuesto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuesto, {partial: true}),
        },
      },
    })
    repuesto: Repuesto,
  ): Promise<void> {
    await this.repuestoRepository.updateById(id, repuesto);
  }

  @put('/repuestos/{id}')
  @response(204, {
    description: 'Repuesto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() repuesto: Repuesto,
  ): Promise<void> {
    await this.repuestoRepository.replaceById(id, repuesto);
  }

  @del('/repuestos/{id}')
  @response(204, {
    description: 'Repuesto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.repuestoRepository.deleteById(id);
  }
}
