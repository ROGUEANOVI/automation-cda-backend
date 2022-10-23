import {Entity, model, property, hasOne, belongsTo, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';
import {Rol} from './rol.model';
import {Vehiculo} from './vehiculo.model';
import {UsuarioVehiculo} from './usuario-vehiculo.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'string',
  })
  idPersona?: string;

  @hasOne(() => Persona, {keyTo: 'idUsuario'})
  persona: Persona;

  @belongsTo(() => Rol, {name: 'rol'})
  idRol: string;

  @hasMany(() => Vehiculo, {through: {model: () => UsuarioVehiculo, keyFrom: 'idUsuario', keyTo: 'idVehiculo'}})
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
