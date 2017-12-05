import { CashTransferPage } from './app.po';

describe('cash-transfer App', () => {
  let page: CashTransferPage;

  beforeEach(() => {
    page = new CashTransferPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
