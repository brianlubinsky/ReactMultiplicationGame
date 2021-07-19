
//using ViewBase will encourage creation of a separate function/class
import { ViewBase } from "./ViewBase";

//The problem here is that the view doesn't show as a component in the browser debugger. Better to skip the whole thing
//Tried with controllerFactoryNew, but led to bizarre bugs (context objects becoming corrupted)
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