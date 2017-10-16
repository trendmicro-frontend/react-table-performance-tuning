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

    onUpdateStart = () => {
        this.startTime = window.performance.now();
        this.endTime = 0;
    };
    onUpdateEnd = () => {
        this.endTime = window.performance.now();
        this.setState({ elapsedTime: this.endTime - this.startTime });
    };
    toggleAll = () => {
        this.selectable && this.selectable.toggleAll();
    };

    render() {
        return (
            <div className="container-fluid" style={{ padding: '20px 20px 0' }}>
                <div className="row">
                    <p style={{ fontSize: 24, marginBottom: 20 }}>
                        Render Time: {this.state.elapsedTime.toFixed(2)} ms
                    </p>
                </div>
                <div className="row" style={{ marginBottom: 20 }}>
                    <Button
                        btnStyle="flat"
                        onClick={this.toggleAll}
                    >
                        Toggle All
                    </Button>
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
