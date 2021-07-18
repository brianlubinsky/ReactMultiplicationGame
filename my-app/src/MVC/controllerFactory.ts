
//using ViewBase will encourage creation of a separate function/class
import { ViewBase } from "./ViewBase";

export const controllerFactory = {
    getController: function <VM, VA>(
        getViewModel: () => VM,
        getViewActions: () => VA,
        view: ViewBase<VM,VA>,
    ): { render: () => JSX.Element } {
        const viewModel = getViewModel();
        const viewActions = getViewActions();
        return {
            render: () => {
                return view.render(viewModel, viewActions);
            },
        };
    },
};