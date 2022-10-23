import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Revision,
  Vehiculo
} from '../models';
import {RevisionRepository} from '../repositories';

export class RevisionVehiculoController {
  constructor(
    @repository(RevisionRepository)
    public revisionRepository: RevisionRepository,
  ) { }

  @get('/revisiones/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Revision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Revision.prototype._id,
  ): Promise<Vehiculo> {
    return this.revisionRepository.revisionVehiculo(id);
  }
}
