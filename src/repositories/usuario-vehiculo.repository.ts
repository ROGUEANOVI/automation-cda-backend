import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UsuarioVehiculo, UsuarioVehiculoRelations} from '../models';

export class UsuarioVehiculoRepository extends DefaultCrudRepository<
  UsuarioVehiculo,
  typeof UsuarioVehiculo.prototype._id,
  UsuarioVehiculoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(UsuarioVehiculo, dataSource);
  }
}
