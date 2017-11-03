# [JSDC 2017] 趨勢科技 - 誰是效能王

Demo: https://trendmicro-frontend.github.io/react-table-performance-tuning/

# 活動說明
* 針對題目範例做效能優化，重繪時間越短則名次越佳，現場工作人員驗證後會將結果即時更新在英雄榜和臉書
* 獎金和贈品：<br>
	* 第一名：獎金 5000 元<br>
    * 第二名：獎金 3000 元<br>
    * 第三名：獎金 2000 元<br>
    * 第四～十名：趨勢科技專屬 T-Ball 悠遊卡<br>
    * 未得獎參賽者每人皆可得趨勢好禮一份<br>
* 活動期間：2017/11/4 9:00 AM 到 2017/11/5 12:00 PM (由工作人員開始計算名次）
* 名次公布：第二天下午二點半（14:55休息時間進行頒獎）

# 活動流程

1. 參賽者根據海報上的資訊取得此[專案網址](https://github.com/trendmicro-frontend/react-table-performance-tuning)，並 **Fork** 回參賽者的 GitHub 帳號下作答

2. 參賽者將修改過後的結果 push 回 Fork 的專案中，並且用 GitHub Page 建立 Demo Site

3. 參賽者將 Fork 的專案網址連同 Demo Site 提供給趨勢科技攤位的工作人員，並留下參賽者的姓名及聯絡方式

4. 驗證方式：<br>
    * 用現場工作人員準備的電腦打開參賽者的 GitHub 專案和 Demo Site<br>
    * 檢查 Table 裡的資料數量（5000筆）是否正確<br>
    * 檢查 Table 內容能否正確呈現<br>
    * 按下 [Toggle All] 取得秒數（此步驟執行五次取最佳值）<br>

## Requirement

There are 5000 records in the table. Your goal is to improve the render time by resolving the performance issue when toggling all the checkboxes.

![image](https://user-images.githubusercontent.com/447801/31598744-d8e26ec2-b281-11e7-94c5-e9f5a5237ba1.png)

## Setup

1. Fork the repository:
    ![image](https://user-images.githubusercontent.com/447801/31598991-185f0406-b283-11e7-8f9a-c7ee690a16d8.png)

2. Run `npm run dev` to run **webpack-dev-server** for development.

3. Run `npm run prepublish` to build production code and push the changes to your forked repository.

4. Go to **Settings > GitHub Pages** and use the `/docs` folder for GitHub Pages.
    ![image](https://user-images.githubusercontent.com/447801/31599148-ac46bbe6-b283-11e7-8848-179eb393d9c1.png)

5. Copy the URL of your published site and update the link in README.md or in the repository's website.
    ![image](https://user-images.githubusercontent.com/447801/31599265-32bb0df8-b284-11e7-9e9c-248c89eede7b.png)

## Examples

### examples/Selectable.jsx

```js
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
            title: '#',
            dataKey: 'id'
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
                justified={false}
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

## Table API

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
