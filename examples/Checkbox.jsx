import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import chainedFunction from 'chained-function';

class Checkbox extends PureComponent {
    static propTypes = {
        indeterminate: PropTypes.bool
    };
    static defaultProps = {
        indeterminate: false
    };

    get checked() {
        return this.el.checked;
    }
    get indeterminate() {
        return this.el.indeterminate;
    }

    componentDidMount() {
        this.el.indeterminate = this.props.indeterminate;
    }
    componentDidUpdate(prevProps) {
        if (prevProps.indeterminate !== this.props.indeterminate) {
            this.el.indeterminate = this.props.indeterminate;
        }
    }

    render() {
        const { onChange, ...props } = this.props;

        delete props.indeterminate;

        return (
            <input
                {...props}
                type="checkbox"
                ref={el => {
                    this.el = el;
                }}
                onChange={chainedFunction(
                    () => {
                        this.el.indeterminate = this.props.indeterminate;
                    },
                    onChange
                )}
            />
        );
    }
}

export default Checkbox;
