import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import { Button } from '@trendmicro/react-buttons';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Selectable from './Selectable';
import data from './datasource';

class App extends PureComponent {
    selectable = null;
    startTime = 0;
    endTime = 0;

    state = {
        elapsedTime: 0
    };
    toggleAll = () => {
        this.selectable && this.selectable.toggleAll();
    };
    onUpdateStart = () => {
        this.startTime = window.performance.now();
    };
    onUpdateEnd = () => {
        this.endTime = window.performance.now();
        const elapsedTime = (this.endTime - this.startTime).toFixed(2);
        this.setState({ elapsedTime: elapsedTime });
    };

    render() {
        const { elapsedTime } = this.state;

        return (
            <div className="container-fluid" style={{ padding: '20px 20px 0' }}>
                <div className="row" style={{ marginBottom: 20 }}>
                    <Button
                        btnStyle="flat"
                        onClick={this.toggleAll}
                    >
                        Toggle All
                    </Button>
                    &nbsp;
                    {`Elapsed Time: ${elapsedTime}ms`}
                </div>
                <div className="row">
                    <Selectable
                        ref={el => {
                            this.selectable = el;
                        }}
                        data={data}
                        onUpdateStart={this.onUpdateStart}
                        onUpdateEnd={this.onUpdateEnd}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
