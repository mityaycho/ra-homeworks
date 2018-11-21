'use strict';

function MessageHistory({list}) {
	const createList = list.map(item => {

		return (
				item.type === 'message' && <Message from={item.from} message={item} key={item.id}/> ||
				item.type === 'response' && <Response from={item.from} message={item} key={item.id}/> ||
				item.type === 'typing' && <Typing from={item.from} message={item} key={item.id}/>
		);
	});

	return list.length ? <ul> { createList } </ul> : null;
}

MessageHistory.defaultProps = {
	list: []
};