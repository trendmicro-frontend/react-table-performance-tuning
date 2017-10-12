import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Table from '../src';
import Checkbox from './Checkbox';
import styles from './index.styl';

class Selectable extends PureComponent {
    static propTypes = {
        data: PropTypes.array,
        onUpdateStart: PropTypes.func,
        onUpdateEnd: PropTypes.func
    };

    state = {
        data: this.props.data
    };
    node = {
        checkbox: null
    };

    toggleAll = () => {
        if (!this.node.checkbox) {
            return;
        }

        const node = ReactDOM.findDOMNode(this.node.checkbox);
        const checked = node.checked;
        this.setState(state => ({
            data: state.data.map(item => ({
                ...item,
                checked: !checked
            }))
        }));
    };
    renderHeaderCheckbox = () => {
        const dataLength = this.state.data.length;
        const selectedLength = this.state.data.filter(data => !!data.checked).length;
        const checked = selectedLength > 0;
        const indeterminate = selectedLength > 0 && selectedLength < dataLength;

        return (
            <Checkbox
                ref={node => {
                    this.node.checkbox = node;
                }}
                checked={checked}
                indeterminate={indeterminate}
                onChange={event => {
                    const checkbox = event.target;
                    const checked = !!checkbox.checked;

                    this.setState(state => ({
                        data: state.data.map(item => ({
                            ...item,
                            checked: checked
                        }))
                    }));
                }}
            />
        );
    };
    getRowClassName = (record, key) => {
        const checked = record.checked;
        if (checked) {
            return styles.active;
        } else {
            return null;
        }
    };
    onRowClick = (record, index, e) => {
        const checked = record.checked;
        this.setState(state => ({
            data: state.data.map(item => {
                if (record.id === item.id) {
                    return {
                        ...item,
                        checked: !checked
                    };
                }
                return item;
            })
        }));
    };

    columns = [
        {
            title: this.renderHeaderCheckbox,
            dataKey: 'checked',
            render: (value, row) => (
                <Checkbox
                    id={row.id}
                    className="input-checkbox"
                    checked={row.checked}
                />
            ),
            width: 38
        },
        {
            title: 'Event Type',
            dataKey: 'eventType'
        },
        {
            title: 'Affected Devices',
            dataIndex: 'affectedDevices'
        },
        {
            title: 'Detections',
            dataIndex: 'detections'
        }
    ];

    componentWillUpdate() {
        this.props.onUpdateStart();
    }
    componentDidUpdate() {
        this.props.onUpdateEnd();
    }
    render() {
        return (
            <Table
                rowKey="id"
                columns={this.columns}
                data={this.state.data}
                rowClassName={this.getRowClassName}
                onRowClick={this.onRowClick}
                maxHeight={400}
            />
        );
    }

}

export default Selectable;
