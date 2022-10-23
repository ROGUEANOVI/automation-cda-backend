import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Usuario, UsuarioVehiculo, SeguroAdicional, VehiculoSeguroAdicional, Revision} from '../models';
import {UsuarioVehiculoRepository} from './usuario-vehiculo.repository';
import {UsuarioRepository} from './usuario.repository';
import {VehiculoSeguroAdicionalRepository} from './vehiculo-seguro-adicional.repository';
import {SeguroAdicionalRepository} from './seguro-adicional.repository';
import {RevisionRepository} from './revision.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype._id,
  VehiculoRelations
> {

  public readonly usuarios: HasManyThroughRepositoryFactory<Usuario, typeof Usuario.prototype._id,
          UsuarioVehiculo,
          typeof Vehiculo.prototype._id
        >;

  public readonly seguroAdicionales: HasManyThroughRepositoryFactory<SeguroAdicional, typeof SeguroAdicional.prototype._id,
          VehiculoSeguroAdicional,
          typeof Vehiculo.prototype._id
        >;

  public readonly revisiones: HasManyRepositoryFactory<Revision, typeof Vehiculo.prototype._id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioVehiculoRepository') protected usuarioVehiculoRepositoryGetter: Getter<UsuarioVehiculoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('VehiculoSeguroAdicionalRepository') protected vehiculoSeguroAdicionalRepositoryGetter: Getter<VehiculoSeguroAdicionalRepository>, @repository.getter('SeguroAdicionalRepository') protected seguroAdicionalRepositoryGetter: Getter<SeguroAdicionalRepository>, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.revisiones = this.createHasManyRepositoryFactoryFor('revisiones', revisionRepositoryGetter,);
    this.registerInclusionResolver('revisiones', this.revisiones.inclusionResolver);
    this.seguroAdicionales = this.createHasManyThroughRepositoryFactoryFor('seguroAdicionales', seguroAdicionalRepositoryGetter, vehiculoSeguroAdicionalRepositoryGetter,);
    this.registerInclusionResolver('seguroAdicionales', this.seguroAdicionales.inclusionResolver);
    this.usuarios = this.createHasManyThroughRepositoryFactoryFor('usuarios', usuarioRepositoryGetter, usuarioVehiculoRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
