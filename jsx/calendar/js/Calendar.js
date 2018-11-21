"use strict";

const Calendar = function ({ date }) {
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	function upperCase(elem) {
		return elem.replace(elem[0], elem[0].toUpperCase());
	}

	function getDate(date, options) {
		return date.toLocaleString('ru', options).replace(/[,.]/g, '').split(' ');
	}

	function getHeaderCalendar([day, count, month, year]) {
		return (
			<div className="ui-datepicker-material-header">
				<div className="ui-datepicker-material-day">{upperCase(day)}</div>
				<div className="ui-datepicker-material-date">
					<div className="ui-datepicker-material-day-num">{count}</div>
					<div className="ui-datepicker-material-month">{month}</div>
					<div className="ui-datepicker-material-year">{year}</div>
				</div>
			</div>
		);
	}

	function datepickerHeader(date) {
		delete options.day;
		date = getDate(date, options);
		let [month, year] = date;

		month = upperCase(month);
		return (
			<div className="ui-datepicker-header">
				<div className="ui-datepicker-title">
					<span className="ui-datepicker-month">{month}</span>&nbsp;<span
						className="ui-datepicker-year">{year}</span>
				</div>
			</div>
		);
	}

	function getColGroup() {
		let count = 0, 
		cols = [], 
		className;

		while (count !== 7) {
			if (count > 4) {
				className = "ui-datepicker-week-end";
			}
			cols.push(<col className={className}></col>);
			count++;
		}
		return (
			<colgroup>
				{cols}
			</colgroup>
		);
	}

	function getNamesDate() {
		const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], 
		shortDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'], 
		daysName = days.map((el, index) => <th key={index} scope="col" title={el}>{shortDays[index]}</th>);

		return (
			<tr>
				{daysName}
			</tr>
		);
	}

	function getDataElements() {
		let className, 
		totalDays = [];
		const beforeDays = [], 
		afterDays = [], 
		startMonth = new Date(date.getFullYear(), date.getMonth(), 1), 
		endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

		for (let i = startMonth.getDate(); i <= endMonth.getDate(); i++) {
			let day = new Date(date.getFullYear(), date.getMonth(), i), countDays = day.getDay() === 0 ? 6 : 1;
			if (day.getDate() === 1) {
				if (day.getDay() === 0) {
					while (countDays > day.getDay()) {
						const newDay = startMonth.setDate(startMonth.getDate() - 1);
						beforeDays.push(<td className="ui-datepicker-other-month">{new Date(newDay).getDate()}</td>);
						countDays--;
					}
				} else {
					while (countDays < day.getDay()) {
						const newDay = startMonth.setDate(startMonth.getDate() - 1);
						beforeDays.push(<td className="ui-datepicker-other-month">{new Date(newDay).getDate()}</td>);
						countDays++;
					}
				}
			}
			className = (date.getDate() === day.getDate()) ? 'ui-datepicker-today' : null;
			totalDays.push(<td className={className}>{day.getDate()}</td>);
			if (day.getDate() === endMonth.getDate() && day.getDay() !== 0) {
				let countDays = day.getDay();
				while (countDays <= 6) {
					const newDay = endMonth.setDate(endMonth.getDate() + 1);
					afterDays.push(<td className="ui-datepicker-other-month">{new Date(newDay).getDate()}</td>);
					countDays++;
				}
			}
		}

		beforeDays.reverse();
		totalDays = [...beforeDays, ...totalDays, ...afterDays];

		return totalDays;
	}

	function getColumns(totalDataElements) {
		let line = [];
		const totalColumn = [];

		totalDataElements.forEach((td, index) => {
			if (index !== 0 && index % 7 === 0) {
				totalColumn.push(line);
				line = [];
			}
			line.push(td);
		});
		totalColumn.push(line);
		return totalColumn;
	}
	const calendar = getColumns(getDataElements());

	function getLine(data) {
		return data.map(el => <tr>{el}</tr>)
	}

	return (
		<div className="ui-datepicker">
			{getHeaderCalendar(getDate(date, options))}
			{datepickerHeader(date)}
			<table className="ui-datepicker-calendar">
				{getColGroup()}
				<thead>
					{getNamesDate()}
				</thead>
				<tbody>
					{getLine(calendar)}
				</tbody>
			</table>
		</div>
	)
};

const nowDate = new Date();

ReactDOM.render(
	<Calendar date={nowDate} />,
	document.getElementById('root')
);