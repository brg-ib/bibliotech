import { Moment } from 'moment';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { IExemplaire } from 'app/shared/model/exemplaire.model';

export interface IEmprunt {
  id?: number;
  dateEmprunt?: Moment;
  utilisateur?: IUtilisateur;
  exemplaire?: IExemplaire;
}

export class Emprunt implements IEmprunt {
  constructor(public id?: number, public dateEmprunt?: Moment, public utilisateur?: IUtilisateur, public exemplaire?: IExemplaire) {}
}
