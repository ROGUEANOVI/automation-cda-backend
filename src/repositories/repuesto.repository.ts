import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Repuesto, RepuestoRelations, Revision, RevisionRepuesto} from '../models';
import {RevisionRepuestoRepository} from './revision-repuesto.repository';
import {RevisionRepository} from './revision.repository';

export class RepuestoRepository extends DefaultCrudRepository<
  Repuesto,
  typeof Repuesto.prototype._id,
  RepuestoRelations
> {

  public readonly revisiones: HasManyThroughRepositoryFactory<Revision, typeof Revision.prototype._id,
          RevisionRepuesto,
          typeof Repuesto.prototype._id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionRepuestoRepository') protected revisionRepuestoRepositoryGetter: Getter<RevisionRepuestoRepository>, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(Repuesto, dataSource);
    this.revisiones = this.createHasManyThroughRepositoryFactoryFor('revisiones', revisionRepositoryGetter, revisionRepuestoRepositoryGetter,);
    this.registerInclusionResolver('revisiones', this.revisiones.inclusionResolver);
  }
}
