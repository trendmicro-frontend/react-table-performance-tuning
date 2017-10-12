import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class Checkbox extends PureComponent {
    static propTypes = {
        indeterminate: PropTypes.bool
    };
    static defaultProps = {
        indeterminate: false
    };

    componentDidMount() {
        this.el.indeterminate = this.props.indeterminate;
    }
    componentDidUpdate(prevProps) {
        if (prevProps.indeterminate !== this.props.indeterminate) {
            this.el.indeterminate = this.props.indeterminate;
        }
    }

    render() {
        const props = { ...this.props };

        delete props.indeterminate;

        return (
            <input
                {...props}
                type="checkbox"
                ref={el => {
                    this.el = el;
                }}
            />
        );
    }
}

export default Checkbox;
