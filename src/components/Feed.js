import React, { Component } from 'react'

export default class Feed extends Component {
  render() {
    return (
      <a className="card" href={this.props.url} target="_blank" rel="noopener noreferrer">
        <span className="card-header" style={{backgroundImage: `url(${this.props.urlToImage})`}}>
          <span className="card-title">
            <h3>{this.props.title}</h3>
          </span>
        </span>
        <span className="card-summary">
          {this.props.description}
        </span>
        <span className="card-meta">
          Click to read more..
        </span>
      </a>
    )
  }
}
