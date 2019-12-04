import React from 'react';


import './App.css';
import ButtonBar from './component/ButtonBar'

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      data: null,
      type: "All",
      status: "upcoming",
      type_btn:1,
      status_btn:1,

    };

    this.getData = this.getData.bind(this);

  }

  getData = async () => {
    await fetch('https://api.devcdc.com/cricket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ schedule(type:' + JSON.stringify(this.state.type) + ', status:' + JSON.stringify(this.state.status) + ',page:0) { matchID seriesName matchNumber homeTeamName awayTeamName toss venue startDate} }' }),
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res.data.schedule });
        console.log(this.state.data + " " + this.state.status + " " + this.state.type);
      });
  }



  changeStatus = async (sts,btn_id) => {
    this.setState({ status:sts,status_btn:btn_id })
    await this.getData();
  }

  changeType = async (typ,btn_id) => {
    this.setState({ type: typ,type_btn:btn_id});
    await this.getData();
  }

  componentDidMount() {
    this.getData();
  }



  render() {

    let { status, type, data } = this.state;

    if (data == null) {
      return (
        <div className="bg-light-gray w-100">
          Loading....
        </div>
      )
    }

    return (
      <div className="bg-light-gray">
        <div className="bg-light-gray w-100">
          <div className="f3">Schedule</div>
          <center>
            <div className="mt3 tc">
              <span className="f6 link tc dim ba b--near-black pa2  mw5 dib near-black hover-red bg-black-05" style={{backgroundColor:this.state.status_btn==1?"gray":"transparent"}} onClick={() => this.changeStatus("upcoming",1)}>UPCOMING</span>
              <span className="f6 link tc dim ba  b--near-black pa2   mw5 mt3 dib near-black hover-red bg-black-05" style={{backgroundColor:this.state.status_btn==2?"gray":"transparent"}} onClick={() => this.changeStatus("live",2)}>RUNNING</span>
              <span className="f6 link tc dim ba b--near-black  pa2   mw5 mt3 dib near-black hover-red bg-black-05" style={{backgroundColor:this.state.status_btn==3?"gray":"transparent"}} onClick={() => this.changeStatus("completed",3)}>COMPLETED</span>
            </div>
            <div className="mt3 tc">
              <span className=" link underline-hover f5 hover-red near-black" style={{fontWeight:this.state.type_btn==1?"700":"100"}} onClick={() => this.changeType("All",1)}>All</span>
              <span className="ml4 link underline-hover f5 hover-red near-black" style={{fontWeight:this.state.type_btn==2?"700":"100"}} onClick={() => this.changeType("International",2)}>Internationl</span>
              <span className="ml4 link underline-hover f5 hover-red near-black" style={{fontWeight:this.state.type_btn==3?"700":"100"}} onClick={() => this.changeType("Domestic",3)}>Domestic</span>
            </div>
          </center>
        </div>

        {this.state.data.map(item => {
          return (<ButtonBar key={item.matchID} data={item}></ButtonBar>);
        })}

      </div>
    );
  }
}