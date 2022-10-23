import {Entity, model, property} from '@loopback/repository';

@model()
export class RevisionRepuesto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
  })
  idRevision?: string;

  @property({
    type: 'string',
  })
  idRepuesto?: string;

  constructor(data?: Partial<RevisionRepuesto>) {
    super(data);
  }
}

export interface RevisionRepuestoRelations {
  // describe navigational properties here
}

export type RevisionRepuestoWithRelations = RevisionRepuesto & RevisionRepuestoRelations;
