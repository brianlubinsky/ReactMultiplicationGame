import React, { ComponentClass } from 'react';

export const controllerFactoryNew = {
    getController: function <VM, VA>(
        getViewModel: () => VM,
        getViewActions: () => VA,
        View: ComponentClass<{ viewModel: VM; viewActions: VA }>,
    ): { render: () => JSX.Element } {
        const viewModel = getViewModel();
        const viewActions = getViewActions();

        return {
            // eslint-disable-next-line react/display-name
            render: () => {
                return <View viewModel={viewModel} viewActions={viewActions}></View>;
            },
        };
    },
};
