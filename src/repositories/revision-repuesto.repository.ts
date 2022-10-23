import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {RevisionRepuesto, RevisionRepuestoRelations} from '../models';

export class RevisionRepuestoRepository extends DefaultCrudRepository<
  RevisionRepuesto,
  typeof RevisionRepuesto.prototype._id,
  RevisionRepuestoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(RevisionRepuesto, dataSource);
  }
}
