'use strict';

const navLinks = [
	{
		title: 'Главная',
		href: '/'
	},
	{
		title: 'Дрифт-такси',
		href: '/drift'
	},
	{
		title: 'Time Attack',
		href: '/timeattack'
	},
	{
		title: 'Forza Karting',
		href: '/forza'
	}
];

const Menu = (props) => {
	return (
		<nav className="menu">
			{navLinks.map((el, idx) => <NavLink exact key={idx} to={el.href} activeClassName={props.active} className={props.style}>{el.title}</NavLink>)}
		</nav>
	);
};