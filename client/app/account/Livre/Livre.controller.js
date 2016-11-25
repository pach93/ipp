'use strict';

type Livre = {
  titre: string;
  auteur: string;
  editeur: string;
};
export default class LivreController {
  livre: Livre = {
    titre: '',
    auteur: '',
    editeur: ''
  };
}