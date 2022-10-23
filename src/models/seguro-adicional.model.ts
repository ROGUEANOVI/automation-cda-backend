import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {VehiculoSeguroAdicional} from './vehiculo-seguro-adicional.model';

@model()
export class SeguroAdicional extends Entity {
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
  tipo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVencimiento: string;

  @hasMany(() => Vehiculo, {through: {model: () => VehiculoSeguroAdicional, keyFrom: 'idSeguroAdicional', keyTo: 'idVehiculo'}})
  vehiculos: Vehiculo[];

  constructor(data?: Partial<SeguroAdicional>) {
    super(data);
  }
}

export interface SeguroAdicionalRelations {
  // describe navigational properties here
}

export type SeguroAdicionalWithRelations = SeguroAdicional & SeguroAdicionalRelations;
