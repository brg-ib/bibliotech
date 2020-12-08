import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UtilisateurComponentsPage, UtilisateurDeleteDialog, UtilisateurUpdatePage } from './utilisateur.page-object';

const expect = chai.expect;

describe('Utilisateur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let utilisateurComponentsPage: UtilisateurComponentsPage;
  let utilisateurUpdatePage: UtilisateurUpdatePage;
  let utilisateurDeleteDialog: UtilisateurDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Utilisateurs', async () => {
    await navBarPage.goToEntity('utilisateur');
    utilisateurComponentsPage = new UtilisateurComponentsPage();
    await browser.wait(ec.visibilityOf(utilisateurComponentsPage.title), 5000);
    expect(await utilisateurComponentsPage.getTitle()).to.eq('bibliotechApp.utilisateur.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(utilisateurComponentsPage.entities), ec.visibilityOf(utilisateurComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Utilisateur page', async () => {
    await utilisateurComponentsPage.clickOnCreateButton();
    utilisateurUpdatePage = new UtilisateurUpdatePage();
    expect(await utilisateurUpdatePage.getPageTitle()).to.eq('bibliotechApp.utilisateur.home.createOrEditLabel');
    await utilisateurUpdatePage.cancel();
  });

  it('should create and save Utilisateurs', async () => {
    const nbButtonsBeforeCreate = await utilisateurComponentsPage.countDeleteButtons();

    await utilisateurComponentsPage.clickOnCreateButton();

    await promise.all([
      utilisateurUpdatePage.setNomInput('nom'),
      utilisateurUpdatePage.setPrenomInput('prenom'),
      utilisateurUpdatePage.setDateNaissanceInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      utilisateurUpdatePage.setRoleInput('role'),
      utilisateurUpdatePage.setPseudoInput('pseudo'),
      utilisateurUpdatePage.setMotDePasseInput('motDePasse'),
    ]);

    expect(await utilisateurUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await utilisateurUpdatePage.getPrenomInput()).to.eq('prenom', 'Expected Prenom value to be equals to prenom');
    expect(await utilisateurUpdatePage.getDateNaissanceInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateNaissance value to be equals to 2000-12-31'
    );
    expect(await utilisateurUpdatePage.getRoleInput()).to.eq('role', 'Expected Role value to be equals to role');
    expect(await utilisateurUpdatePage.getPseudoInput()).to.eq('pseudo', 'Expected Pseudo value to be equals to pseudo');
    expect(await utilisateurUpdatePage.getMotDePasseInput()).to.eq('motDePasse', 'Expected MotDePasse value to be equals to motDePasse');

    await utilisateurUpdatePage.save();
    expect(await utilisateurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await utilisateurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Utilisateur', async () => {
    const nbButtonsBeforeDelete = await utilisateurComponentsPage.countDeleteButtons();
    await utilisateurComponentsPage.clickOnLastDeleteButton();

    utilisateurDeleteDialog = new UtilisateurDeleteDialog();
    expect(await utilisateurDeleteDialog.getDialogTitle()).to.eq('bibliotechApp.utilisateur.delete.question');
    await utilisateurDeleteDialog.clickOnConfirmButton();

    expect(await utilisateurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
