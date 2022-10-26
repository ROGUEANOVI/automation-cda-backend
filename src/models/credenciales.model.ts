import {Model, model, property} from '@loopback/repository';

@model()
export class Credenciales extends Model {
  @property({
    type: 'string',
    required: true,
  })
  _nombreUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  _clave: string;


  constructor(data?: Partial<Credenciales>) {
    super(data);
  }
}

export interface CredencialesRelations {
  // describe navigational properties here
}

export type CredencialesWithRelations = Credenciales & CredencialesRelations;
