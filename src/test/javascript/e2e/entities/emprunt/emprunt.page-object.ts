import { element, by, ElementFinder } from 'protractor';

export class EmpruntComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-emprunt div table .btn-danger'));
  title = element.all(by.css('jhi-emprunt div h2#page-heading span')).first();
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

export class EmpruntUpdatePage {
  pageTitle = element(by.id('jhi-emprunt-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateEmpruntInput = element(by.id('field_dateEmprunt'));

  utilisateurSelect = element(by.id('field_utilisateur'));
  exemplaireSelect = element(by.id('field_exemplaire'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateEmpruntInput(dateEmprunt: string): Promise<void> {
    await this.dateEmpruntInput.sendKeys(dateEmprunt);
  }

  async getDateEmpruntInput(): Promise<string> {
    return await this.dateEmpruntInput.getAttribute('value');
  }

  async utilisateurSelectLastOption(): Promise<void> {
    await this.utilisateurSelect.all(by.tagName('option')).last().click();
  }

  async utilisateurSelectOption(option: string): Promise<void> {
    await this.utilisateurSelect.sendKeys(option);
  }

  getUtilisateurSelect(): ElementFinder {
    return this.utilisateurSelect;
  }

  async getUtilisateurSelectedOption(): Promise<string> {
    return await this.utilisateurSelect.element(by.css('option:checked')).getText();
  }

  async exemplaireSelectLastOption(): Promise<void> {
    await this.exemplaireSelect.all(by.tagName('option')).last().click();
  }

  async exemplaireSelectOption(option: string): Promise<void> {
    await this.exemplaireSelect.sendKeys(option);
  }

  getExemplaireSelect(): ElementFinder {
    return this.exemplaireSelect;
  }

  async getExemplaireSelectedOption(): Promise<string> {
    return await this.exemplaireSelect.element(by.css('option:checked')).getText();
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

export class EmpruntDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-emprunt-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-emprunt'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
