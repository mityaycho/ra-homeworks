'use strict';

const DateInput = props => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input type="text" className="form-control" name={props.name} onChange={props.onChange}
             value={props.value} required={props.required} placeholder="YYYY-MM-DD"/>
    </div>
  )
};

const datePropType = function (props, propName, componentName) {
	const date = props[propName];
	const isValidDate = (typeof date === 'string') && /^\d{4}\-\d{2}\-\d{2}$/.test(date);
	if (!isValidDate) {
			return new Error(`Неверный параметр ${date} в компоненте ${componentName}: параметр должен быть датой типа: ГГГГ-ММ-ДД`);
	}
	return null;
};

function getDate() {
	const date = new Date(),
	options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	};
	return date.toLocaleDateString('Ru-ru', options).split('.').reverse().join('-');
}

DateInput.propTypes = {
	value: datePropType,
	name: PropTypes.string,
	onChange: PropTypes.func,
	required: PropTypes.bool
};

DateInput.defaultProps = {
	value: getDate()
};