# react-table [![build status](https://travis-ci.org/trendmicro-frontend/react-table.svg?branch=master)](https://travis-ci.org/trendmicro-frontend/react-table) [![Coverage Status](https://coveralls.io/repos/github/trendmicro-frontend/react-table/badge.svg?branch=master)](https://coveralls.io/github/trendmicro-frontend/react-table?branch=master)

[![NPM](https://nodei.co/npm/@trendmicro/react-table.png?downloads=true&stars=true)](https://nodei.co/npm/@trendmicro/react-table/)

React Table

Demo: https://trendmicro-frontend.github.io/react-table

## Installation

1. Install the latest version of [react](https://github.com/facebook/react) and [react-table](https://github.com/trendmicro-frontend/react-table):

  ```
  npm install --save react @trendmicro/react-table @trendmicro/react-paginations
  ```

2. At this point you can import `@trendmicro/react-table` and its styles in your application as follows:

  ```js
  import Table from '@trendmicro/react-table';
  import { TablePagination } from '@trendmicro/react-paginations';

  // Be sure to include styles at some point, probably during your bootstraping
  import '@trendmicro/react-table/dist/react-table.css';
  import '@trendmicro/react-paginations/dist/react-paginations.css';
  ```

## Usage

### Selectable

```js
import Table from '@trendmicro/react-table';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Checkbox from './Checkbox';
import styles from './index.styl';

class Selectable extends PureComponent {
    static propTypes = {
        data: PropTypes.array
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
```

## API

### Properties

#### Table

Name                | Type                              | Default | Description
:---                | :---                              | :------ | :----------
bordered            | Boolean                           | true    | Specify whether the table should be bordered.
justified           | Boolean                           | true    | Specify whether to keep table columns equal width.
columns             | Object[]                          | []      | The columns config of table, see Column below for details.
data                | Object[]                          | []      | Data record array to be rendered.
emptyText           | Function                          | () => { return 'No Data'; } | Display text when data is empty.
expandedRowKeys     | String[]                          |         | Current expanded rows keys.
expandedRowRender   | Function(record, key)             |         | Expanded content render function.
footer              | React Node or Function(): React Node|       | Table footer render function.
hoverable           | Boolean                           | true    | Whether use row hover style.
loading             | Boolean                           | false   | Whether table is loading.
maxHeight           | Number                            |         | Table maximum height.
onRowClick          | Function(record, key)             |         | Handle rowClick action.
showHeader          | Boolean                           | true    | Whether table head is shown.
sortable            | Boolean                           | false   | Whether table head is sortable.
title               | React Node or Function(): React Node|       | Table title render function.
useFixedHeader      | Boolean                           | false   | Whether table head is fixed.
rowClassName        | Function(record, key):string      |         | Get row's className.
rowKey              | string or Function(record):string | 'key'   | If rowKey is string, `record[rowKey]` will be used as key. If rowKey is function, the return value of `rowKey(record)` will be use as key.

#### Column

Name            | Type    | Default | Description
:---            | :-----  | :------ | :----------
key             | String  |         | key of this column is for sortable attribute.
className       | String  |         | className of this column.
style           | String  |         | style of this column.
headerClassName | String  |         | className to assign to the column header.
headerStyle     | String  |         | style to assign to the column header.
cellClassName   | String  |         | className to assign to each cell in the column.
cellStyle       | String  |         | style to assign to each cell in the column.
onClick         | Function(event) |         | onClick event handler for header cell.
title           | React Node or Function(): React Node |         | Title of this column.
dataIndex       | String  |         | Display field of the data record.
dataKey         | String  |         | dataKey is an alias for dataIndex.
width           | String or Number  |         | Width of the specific proportion calculation according to the width of the columns.
fixed           | Boolean | false   | This column will be fixed at left side when table scroll horizontally.
render          | Function(value, row) |         | The render function of cell, has two params: the text of this cell, the record of this row, it's return a react node.

## License

MIT
