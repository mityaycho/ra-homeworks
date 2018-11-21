'use strict';

const items = [
  { title: 'Главная страница', href: '#home' },
  { title: 'О компании', href: '#about' },
  { title: 'Контакты', href: '#contact' }
];

const app = (
  <div>
    <Menu items={items} opened={true} />
    <Menu items={items} />
  </div>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);

function Menu({ items, opened }) {
	if (items && !opened) {
		return (
			<div className="menu">
				<div className="menu-toggle"><span></span></div>
			</div>
		);
	}
	const item = items.map((el, idx) => <li key={idx}><a href={el.href}>{el.title}</a></li>);

	return (
		<div className="menu menu-open">
			<div className="menu-toggle"><span></span></div>
			<nav>
				<ul>
					{ item }
				</ul>
			</nav>
		</div>
	);
}