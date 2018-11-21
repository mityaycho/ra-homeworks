'use strict';

const AuthForm = props => {

	function handle(event) {
		event.preventDefault();

		if (!props.onAuth && typeof props.onAuth !== 'function') {
			return null;
		}

		const userAuth = {},
		inputs = event.currentTarget.querySelectorAll('input');

		Array.from(inputs).forEach(el => {
			userAuth[el.name] = el.value
		});
		props.onAuth(userAuth);
	}

	function checkInput(event) {
		const inputText = event.target;

		if (inputText.name === 'email') {
			inputText.value = inputText.value.replace(/[^A-Za-z0-9_@\-/\.]/g, '');
		}

		if (inputText.name === 'password') {
			inputText.value = inputText.value.replace(/\W/g, '');
		}
	}

	return (
		<form className="ModalForm" action="/404/auth/" method="POST" onSubmit={handle} onChange={checkInput}>
			<div className="Input">
				<input required type="text" name="name" placeholder="Имя"/>
				<label></label>
			</div>
			<div className="Input">
				<input type="email" name="email" placeholder="Электронная почта"/>
				<label></label>
			</div>
			<div className="Input">
				<input required type="password" name="password" placeholder="Пароль"/>
				<label></label>
			</div>
			<button type="submit">
				<span>Войти</span>
				<i className="fa fa-fw fa-chevron-right"></i>
			</button>
		</form>
	);
};