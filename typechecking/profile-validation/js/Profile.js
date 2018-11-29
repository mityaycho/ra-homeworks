'use strict';

const profileStyle = {
    border: '1px solid #cccccc',
    borderRadius: '5px',
    width: '100%',
    height: '100%',
    margin: '5px'
};

const imageStyle = {
    width: '200px',
    height: '200px'
};

const getValidDatePropType = function (props, propName, componentName) {
    const date = props[propName];
    const compareDate = new Date(date) > new Date();
    const isValidDate = (typeof date === 'string') && /^\d{4}-\d{2}-\d{2}$/.test(date);
    if (!isValidDate) {
        return new Error(`Неверно указано значение в аргументе ${date} компонента ${componentName}: аргумент должен быть типа ГГГГ-ММ-ДД`);
    }
    if (compareDate) {
        return new Error(`Неверно указано значение в атрибуте ${date} компонента ${componentName}: указанная дата не может превышать текущую дату`);
    }
    return null;
};

const getValidUrlPropType = function (props, propName, componentName) {
    const url = props[propName];
    const isValidUrl = (typeof url === 'string') && /^(https:\/\/vk\.com\/)(\(id[0-9]+|[A-Za-z0-9_-]+)/g.test(url);
    if (!isValidUrl) {
        return new Error(`Неверно указан адрес в аргументе ${url} компонента ${componentName}: адрес должен быть типа https://vk.com/(id[0-9]+|[A-Za-z0-9_-]+`);
    }
    return null;
};

const createChainableTypeChecker = (validate) => {
    const checkType = (isRequired, props, propName, componentName) => {
        if (props[propName] === null) {
            if (isRequired) {
                return new Error(`Обязательный атрибут ${propName} не был передан компоненту ${componentName}`);
            }
            return null
        } else {
            return validate(props, propName, componentName);
        }
    };
    let chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
};

const isValidUrl = createChainableTypeChecker(getValidUrlPropType);

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            first_name: PropTypes.string.isRequired,
            last_name: PropTypes.string.isRequired,
            url: isValidUrl.isRequired,
            birthday: getValidDatePropType,
            img: PropTypes.string
        }
    }

    static get defaultProps() {
        return {
            img: './images/profile.jpg',
            birthday: '1990-05-16',
            first_name: 'Unknown',
            last_name: 'User'
        }

    }

    render() {
        return (
            <div className="col-md-4 text-center" style={{marginBottom: '10px'}}>
                <div style={profileStyle}>
                    <h2>{this.props.first_name} {this.props.last_name}</h2>
                    <div>
                        <img src={this.props.img} className="img-thumbnail" style={imageStyle}/>
                    </div>
                    <p>vk: <a href={this.props.url}>{this.props.url}</a></p>
                    <p>birthday: <a href={this.props.birthday}>{this.props.birthday}</a></p>
                </div>
            </div>
        )
    }
}