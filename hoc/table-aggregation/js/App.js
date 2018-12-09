'use strict';

const withData = callback => Component => class extends React.Component {
    constructor(props) {
        super(props);
    }

    static get displayName() {
        const name = Component.displayName || Component.name || 'Component';
        return `withData(${name})`;
    }

    componentWillReceiveProps(nextProps) {
        nextProps.list.sort((a, b) => new Date(a.date) - new Date(b.date));
        nextProps.list = callback(nextProps);
    }

    render() {
        return <Component {...this.props} />;
    }
};

const treatData = (measure, props) => {
    const getValidItem = item => isNaN(parseInt(item)) ? item : parseInt(item);
    const data = [];
    const current = {};
    props.list.forEach(el => {
        if (!(measure(el) in current)) {
            current[measure(el)] = 0;
        }
    });
    Object.keys(current).forEach(item => {
        props.list.forEach(el => {
            if (getValidItem(item) === measure(el)) {
                current[item] += el.amount;
            }
        });
        data.push({[`${measure.name}`]: item, amount: current[item]});
    });
    return data;
};

const getMonthTable = props => {
    const month = item => new Date(item.date).toLocaleDateString('en-En', {month: 'long'});
    return treatData(month, props);
};

const getYearTable = props => {
    const year = item => new Date(item.date).getFullYear();
    return treatData(year, props);
};

const getSortTable = props => props.list,
WithDataMonth = withData(getMonthTable)(MonthTable),
WithDataYear = withData(getYearTable)(YearTable),
WithDataSort = withData(getSortTable)(SortTable);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        axios.get('https://api.myjson.com/bins/l2s9l')
            .then(response => {
                this.setState(response.data);
            });
    }

    render() {
        return (
            <div id="app">
                <WithDataMonth list={this.state.list} />
                <WithDataYear list={this.state.list} />
                <WithDataSort list={this.state.list} />
            </div>
        );
    }
};