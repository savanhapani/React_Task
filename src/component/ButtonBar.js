import React from 'react';


export default class ButtonBar extends React.Component {

  render() {


    var date = new Date(this.props.data.startDate * 1);
    return (
      <article className="center mw5 mw6-ns hidden ba mv4" >
        <h1 className="f6 bg-near-gray black mv0 pv2 ph3">{this.props.data.seriesName} <span className="fr">></span></h1>
        <div className="pa3 bt bg-white">
          <p className="f6 f5-ns lh-copy measure mv0">
            {this.props.data.matchNumber}
          </p>
          <img alt="flag1" src="https://images-na.ssl-images-amazon.com/images/I/41S5hn5RE6L._AC_.jpg" width="50" /><span className="pb2">{this.props.data.homeTeamName}</span>
          <br></br>
          <img alt="flag2" className="mt2" src="https://images-na.ssl-images-amazon.com/images/I/41S5hn5RE6L._AC_.jpg" width="50" /><span>{this.props.data.awayTeamName}</span>
          <br></br>
          <center><button className="br-pill mt3">{date.toDateString()}</button></center>
        </div>
      </article>
    )
  }
}
