'use strict';

fetch('https://neto-api.herokuapp.com/etsy')
	.then(res => res.json())
	.then(res => res.map((el) => <Listing items={el}/>))
	.then(res => {
		ReactDOM.render(
			<div className="item-list">
				{ res }
			</div>,
			document.getElementById('root')
		);
	});



function Listing({items}) {
	const title = items.title.length > 50 ? `${items.title.substr(0, 50)}...` : items.title;

	function getCurrencyCode(cur) {
		const currency = {
			'USD': '$',
			'EUR': '€'
		};
		return (cur in currency) ? currency[cur] : cur;
	}
	
	function getLevelClass(count) {
		const className = (count <= 10) ? 'low' : (count > 20) ? 'high' : 'medium';
		return `item-quantity level-${className}`;
	}

	return (
		<div key={items.listing_id} className="item">
			<div className="item-image">
				<a href={items.url}>
					<img src={items.MainImage.url_570xN}/>
				</a>
			</div>
			<div className="item-details">
				<p className="item-title">{title}</p>
				<p className="item-price">{getCurrencyCode(items.currency_code)} {items.price}</p>
				<p className={getLevelClass(items.quantity)}>{items.quantity} left</p>
			</div>
		</div>
	);
}

Listing.gefaultProps = {
	items: []
};