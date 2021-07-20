export abstract class ViewBase<VM,VA> {    
    abstract render(viewModel:VM,viewActions:VA): JSX.Element;
}
