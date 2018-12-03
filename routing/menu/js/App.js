class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Menu active={"menu__item-active"} style={'menu__item'}/>
          <div className="page">
            <Route path="/" exact component={HomePage} />
            <Route path="/drift" component={DriftPage} />
            <Route path="/timeattack" component={TimeAttackPage} />
            <Route path="/forza" component={ForzaPage} />
          </div>
        </div>
      </Router>
    );
  }
}