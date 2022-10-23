import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Revision, RevisionRelations, Vehiculo, Repuesto, RevisionRepuesto} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {RevisionRepuestoRepository} from './revision-repuesto.repository';
import {RepuestoRepository} from './repuesto.repository';

export class RevisionRepository extends DefaultCrudRepository<
  Revision,
  typeof Revision.prototype._id,
  RevisionRelations
> {

  public readonly revisionVehiculo: BelongsToAccessor<Vehiculo, typeof Revision.prototype._id>;

  public readonly repuestos: HasManyThroughRepositoryFactory<Repuesto, typeof Repuesto.prototype._id,
          RevisionRepuesto,
          typeof Revision.prototype._id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('RevisionRepuestoRepository') protected revisionRepuestoRepositoryGetter: Getter<RevisionRepuestoRepository>, @repository.getter('RepuestoRepository') protected repuestoRepositoryGetter: Getter<RepuestoRepository>,
  ) {
    super(Revision, dataSource);
    this.repuestos = this.createHasManyThroughRepositoryFactoryFor('repuestos', repuestoRepositoryGetter, revisionRepuestoRepositoryGetter,);
    this.registerInclusionResolver('repuestos', this.repuestos.inclusionResolver);
    this.revisionVehiculo = this.createBelongsToAccessorFor('revisionVehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('revisionVehiculo', this.revisionVehiculo.inclusionResolver);
  }
}
