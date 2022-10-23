import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Persona, Rol, Vehiculo, UsuarioVehiculo} from '../models';
import {PersonaRepository} from './persona.repository';
import {RolRepository} from './rol.repository';
import {UsuarioVehiculoRepository} from './usuario-vehiculo.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype._id,
  UsuarioRelations
> {

  public readonly persona: HasOneRepositoryFactory<Persona, typeof Usuario.prototype._id>;

  public readonly rol: BelongsToAccessor<Rol, typeof Usuario.prototype._id>;

  public readonly vehiculos: HasManyThroughRepositoryFactory<Vehiculo, typeof Vehiculo.prototype._id,
          UsuarioVehiculo,
          typeof Usuario.prototype._id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('UsuarioVehiculoRepository') protected usuarioVehiculoRepositoryGetter: Getter<UsuarioVehiculoRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Usuario, dataSource);
    this.vehiculos = this.createHasManyThroughRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter, usuarioVehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter,);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
    this.persona = this.createHasOneRepositoryFactoryFor('persona', personaRepositoryGetter);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
