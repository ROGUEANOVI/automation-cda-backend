import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Repuesto} from './repuesto.model';
import {RevisionRepuesto} from './revision-repuesto.model';

@model()
export class Revision extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRevision: string;

  @property({
    type: 'string',
    required: true,
  })
  nivelAceite: string;

  @property({
    type: 'string',
    required: true,
  })
  nivelFrenos: string;

  @property({
    type: 'string',
    required: true,
  })
  nivelRefrigerante: string;

  @property({
    type: 'string',
    required: true,
  })
  nivelDireccion: string;

  @belongsTo(() => Vehiculo, {name: 'revisionVehiculo'})
  idVehiculo: string;

  @hasMany(() => Repuesto, {through: {model: () => RevisionRepuesto, keyFrom: 'idRevision', keyTo: 'idRepuesto'}})
  repuestos: Repuesto[];

  constructor(data?: Partial<Revision>) {
    super(data);
  }
}

export interface RevisionRelations {
  // describe navigational properties here
}

export type RevisionWithRelations = Revision & RevisionRelations;
