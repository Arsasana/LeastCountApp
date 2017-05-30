import { LeastcountScorekeeperPage } from './app.po';

describe('leastcount-scorekeeper App', () => {
  let page: LeastcountScorekeeperPage;

  beforeEach(() => {
    page = new LeastcountScorekeeperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
