import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {SeguroAdicional, SeguroAdicionalRelations, Vehiculo, VehiculoSeguroAdicional} from '../models';
import {VehiculoSeguroAdicionalRepository} from './vehiculo-seguro-adicional.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class SeguroAdicionalRepository extends DefaultCrudRepository<
  SeguroAdicional,
  typeof SeguroAdicional.prototype._id,
  SeguroAdicionalRelations
> {

  public readonly vehiculos: HasManyThroughRepositoryFactory<Vehiculo, typeof Vehiculo.prototype._id,
          VehiculoSeguroAdicional,
          typeof SeguroAdicional.prototype._id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoSeguroAdicionalRepository') protected vehiculoSeguroAdicionalRepositoryGetter: Getter<VehiculoSeguroAdicionalRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(SeguroAdicional, dataSource);
    this.vehiculos = this.createHasManyThroughRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter, vehiculoSeguroAdicionalRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
