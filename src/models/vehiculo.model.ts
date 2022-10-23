import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {UsuarioVehiculo} from './usuario-vehiculo.model';
import {SeguroAdicional} from './seguro-adicional.model';
import {VehiculoSeguroAdicional} from './vehiculo-seguro-adicional.model';
import {Revision} from './revision.model';

@model()
export class Vehiculo extends Entity {
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
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'number',
    required: true,
  })
  numeroPasajeros: number;

  @property({
    type: 'string',
    required: true,
  })
  cilindrajeMotor: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoSoat: string;

  @hasMany(() => Usuario, {through: {model: () => UsuarioVehiculo, keyFrom: 'idVehiculo', keyTo: 'idUsuario'}})
  usuarios: Usuario[];

  @hasMany(() => SeguroAdicional, {through: {model: () => VehiculoSeguroAdicional, keyFrom: 'idVehiculo', keyTo: 'idSeguroAdicional'}})
  seguroAdicionales: SeguroAdicional[];

  @hasMany(() => Revision, {keyTo: 'idVehiculo'})
  revisiones: Revision[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
