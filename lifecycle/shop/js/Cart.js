class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate({isOpen, items}) {
    return isOpen !== this.props.isOpen || isOpen && this.props.length !== items.length;
  }

  render() {
		return <CartView {...this.props} />;
  }
};