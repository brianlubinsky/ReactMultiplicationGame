export interface IViewProps<VM,VA>
{
    viewModel:VM,
    viewActions:VA
}

export const viewPropsComparer =  function<VM,VA>(
    prevProps: IViewProps<VM,VA>,
    newProps: IViewProps<VM,VA>,
): boolean {
    //console.log("OLD: " + JSON.stringify(prevProps.viewModel));
    //console.log("NEW: " + JSON.stringify(newProps.viewModel));
    return JSON.stringify(prevProps.viewModel) === JSON.stringify(newProps.viewModel);
}
