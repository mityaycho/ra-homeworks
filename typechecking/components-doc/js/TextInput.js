'use strict';

const TextInput = props => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input type={props.type} className="form-control" name={props.name} onChange={props.onChange}
             value={props.value} required={props.required}/>
    </div>
  )
};

TextInput.propsType = {
	label: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.func,
	value: PropTypes.string,
	required: PropTypes.bool
};