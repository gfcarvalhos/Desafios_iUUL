import { mainView } from './view/MainView.js';
import { MenuPresenter } from './Presenter/MenuPresenter.js';
import database from './db/db.js';


(async () => {
  await database.sync({ force: false });

  const presenter = new MenuPresenter();
  const menu = new mainView(presenter);
  menu.menuPrincipal();
})();
