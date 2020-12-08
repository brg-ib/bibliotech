import { element, by, ElementFinder } from 'protractor';

export class UtilisateurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-utilisateur div table .btn-danger'));
  title = element.all(by.css('jhi-utilisateur div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class UtilisateurUpdatePage {
  pageTitle = element(by.id('jhi-utilisateur-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomInput = element(by.id('field_nom'));
  prenomInput = element(by.id('field_prenom'));
  dateNaissanceInput = element(by.id('field_dateNaissance'));
  roleInput = element(by.id('field_role'));
  pseudoInput = element(by.id('field_pseudo'));
  motDePasseInput = element(by.id('field_motDePasse'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setPrenomInput(prenom: string): Promise<void> {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput(): Promise<string> {
    return await this.prenomInput.getAttribute('value');
  }

  async setDateNaissanceInput(dateNaissance: string): Promise<void> {
    await this.dateNaissanceInput.sendKeys(dateNaissance);
  }

  async getDateNaissanceInput(): Promise<string> {
    return await this.dateNaissanceInput.getAttribute('value');
  }

  async setRoleInput(role: string): Promise<void> {
    await this.roleInput.sendKeys(role);
  }

  async getRoleInput(): Promise<string> {
    return await this.roleInput.getAttribute('value');
  }

  async setPseudoInput(pseudo: string): Promise<void> {
    await this.pseudoInput.sendKeys(pseudo);
  }

  async getPseudoInput(): Promise<string> {
    return await this.pseudoInput.getAttribute('value');
  }

  async setMotDePasseInput(motDePasse: string): Promise<void> {
    await this.motDePasseInput.sendKeys(motDePasse);
  }

  async getMotDePasseInput(): Promise<string> {
    return await this.motDePasseInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class UtilisateurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-utilisateur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-utilisateur'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
