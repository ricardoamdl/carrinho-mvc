import StoreModel from './model/StoreModel.js';
import StoreView from './view/StoreView.js';
import StoreController from './controller/StoreController.js';

function initApp() {

    const model = new StoreModel();

    const view = new StoreView();

    const controller = new StoreController(model, view);

    controller.init();

    window.app = { model, view, controller };
    console.log('✓ Aplicação MVC inicializada com sucesso!');
    console.log('Você pode acessar o app via window.app no console do navegador');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
