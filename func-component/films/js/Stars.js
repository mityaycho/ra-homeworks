'use strict';

function Stars(props) {
	const counterStarsValid = (typeof (props.count) === 'number' || props.count < 1 || props.count > 5) ? props.count : null;
  return <ul className="card-body-stars u-clearfix">{new Array(counterStarsValid).fill(<li><Star key={props.id} /></li>)}</ul>;
}

