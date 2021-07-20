import React, { Profiler } from 'react';

export class ConsoleLogProfiler extends React.PureComponent<{ id: string }> {
    render(): JSX.Element {
        return (
            <Profiler
                id={this.props.id}
                onRender={(...args) => {
                    console.log('Rendering ' + this.props.id + ' ' + new Date());
                    //console.log(JSON.stringify(args));
                }}
            >
                {this.props.children}
            </Profiler>
        );
    }
}
