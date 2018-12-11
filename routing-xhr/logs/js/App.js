class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
  }

  componentDidMount() {
    fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=50')
      .then(response => response.json())
      .then(logs => this.setState({ logs }));
  }

  render() {
    const { logs } = this.state;

    return (
      <Router>
        <div>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Текущие данные</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/archive">Архив</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/">
              <Current logs={logs} />
            </Route>
            <Route path="/archive">
              <Archive logs={logs} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
};

const withFetcher = ({ url, collName }) => WrappedComponent =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        [collName]: []
      };
    }

    componentDidMount() {
      if (typeof url === 'function') {
        url = url(this.props);
      }

      const params = {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      };

      fetch(url, params)
        .then(response => response.json())
        .then(data => {
          this.setState({ [collName]: data })
        })
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };

const Main = withFetcher({
  url: "https://baconipsum.com/api/?type=meat-and-filler&paras=50",
  collName: "logs"
})(App);