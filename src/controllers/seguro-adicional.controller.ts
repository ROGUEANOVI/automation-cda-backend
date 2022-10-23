import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {SeguroAdicional} from '../models';
import {SeguroAdicionalRepository} from '../repositories';

export class SeguroAdicionalController {
  constructor(
    @repository(SeguroAdicionalRepository)
    public seguroAdicionalRepository : SeguroAdicionalRepository,
  ) {}

  @post('/seguros-adiconales')
  @response(200, {
    description: 'SeguroAdicional model instance',
    content: {'application/json': {schema: getModelSchemaRef(SeguroAdicional)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SeguroAdicional, {
            title: 'NewSeguroAdicional',
            exclude: ['_id'],
          }),
        },
      },
    })
    seguroAdicional: Omit<SeguroAdicional, '_id'>,
  ): Promise<SeguroAdicional> {
    return this.seguroAdicionalRepository.create(seguroAdicional);
  }

  @get('/seguros-adiconales/count')
  @response(200, {
    description: 'SeguroAdicional model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SeguroAdicional) where?: Where<SeguroAdicional>,
  ): Promise<Count> {
    return this.seguroAdicionalRepository.count(where);
  }

  @get('/seguros-adiconales')
  @response(200, {
    description: 'Array of SeguroAdicional model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SeguroAdicional, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SeguroAdicional) filter?: Filter<SeguroAdicional>,
  ): Promise<SeguroAdicional[]> {
    return this.seguroAdicionalRepository.find(filter);
  }

  @patch('/seguros-adiconales')
  @response(200, {
    description: 'SeguroAdicional PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SeguroAdicional, {partial: true}),
        },
      },
    })
    seguroAdicional: SeguroAdicional,
    @param.where(SeguroAdicional) where?: Where<SeguroAdicional>,
  ): Promise<Count> {
    return this.seguroAdicionalRepository.updateAll(seguroAdicional, where);
  }

  @get('/seguros-adiconales/{id}')
  @response(200, {
    description: 'SeguroAdicional model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SeguroAdicional, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SeguroAdicional, {exclude: 'where'}) filter?: FilterExcludingWhere<SeguroAdicional>
  ): Promise<SeguroAdicional> {
    return this.seguroAdicionalRepository.findById(id, filter);
  }

  @patch('/seguros-adiconales/{id}')
  @response(204, {
    description: 'SeguroAdicional PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SeguroAdicional, {partial: true}),
        },
      },
    })
    seguroAdicional: SeguroAdicional,
  ): Promise<void> {
    await this.seguroAdicionalRepository.updateById(id, seguroAdicional);
  }

  @put('/seguros-adiconales/{id}')
  @response(204, {
    description: 'SeguroAdicional PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() seguroAdicional: SeguroAdicional,
  ): Promise<void> {
    await this.seguroAdicionalRepository.replaceById(id, seguroAdicional);
  }

  @del('/seguros-adiconales/{id}')
  @response(204, {
    description: 'SeguroAdicional DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.seguroAdicionalRepository.deleteById(id);
  }
}
