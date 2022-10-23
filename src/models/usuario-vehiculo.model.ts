import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuarioVehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  idUsuario?: string;

  @property({
    type: 'string',
  })
  idVehiculo?: string;

  constructor(data?: Partial<UsuarioVehiculo>) {
    super(data);
  }
}

export interface UsuarioVehiculoRelations {
  // describe navigational properties here
}

export type UsuarioVehiculoWithRelations = UsuarioVehiculo & UsuarioVehiculoRelations;
