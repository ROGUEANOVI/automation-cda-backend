import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VehiculoSeguroAdicional, VehiculoSeguroAdicionalRelations} from '../models';

export class VehiculoSeguroAdicionalRepository extends DefaultCrudRepository<
  VehiculoSeguroAdicional,
  typeof VehiculoSeguroAdicional.prototype._id,
  VehiculoSeguroAdicionalRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(VehiculoSeguroAdicional, dataSource);
  }
}
