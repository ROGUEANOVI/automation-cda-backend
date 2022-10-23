import {Entity, model, property} from '@loopback/repository';

@model()
export class VehiculoSeguroAdicional extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  idVehiculo?: string;

  @property({
    type: 'string',
  })
  idSeguroAdicional?: string;

  constructor(data?: Partial<VehiculoSeguroAdicional>) {
    super(data);
  }
}

export interface VehiculoSeguroAdicionalRelations {
  // describe navigational properties here
}

export type VehiculoSeguroAdicionalWithRelations = VehiculoSeguroAdicional & VehiculoSeguroAdicionalRelations;
