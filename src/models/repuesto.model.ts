import {Entity, model, property, hasMany} from '@loopback/repository';
import {Revision} from './revision.model';
import {RevisionRepuesto} from './revision-repuesto.model';

@model()
export class Repuesto extends Entity {
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
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @hasMany(() => Revision, {through: {model: () => RevisionRepuesto, keyFrom: 'idRepuesto', keyTo: 'idRevision'}})
  revisiones: Revision[];

  constructor(data?: Partial<Repuesto>) {
    super(data);
  }
}

export interface RepuestoRelations {
  // describe navigational properties here
}

export type RepuestoWithRelations = Repuesto & RepuestoRelations;
