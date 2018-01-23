import React, { Component } from 'react';

class StatBar extends Component {
  render() {
    const style = {
      top: this.props.position.top.toString() + 'vh',
      left: this.props.position.left.toString() + 'vw',
      width: this.props.position.width.toString() + 'vw',
      height: this.props.position.height.toString() + 'vh',
    };

    // const statClass = "stat-block " + this.props.color;
    const iconStyle = {
      fontSize: (this.props.position.iconSize).toString() + 'vh'
    }

    let blocks = [];
    let iconOffset = this.props.position.iconSize/this.props.statMax;
    for (let i = 0; i < this.props.statMax; i++) {
      let statStyle = {
        height: ((this.props.position.height/this.props.statMax) - (this.props.position.gutter/2) - iconOffset).toString() + 'vh',
        width: (this.props.position.width - this.props.position.gutter).toString() + 'vw',
        left: (this.props.position.gutter/2).toString() + 'vw',
        marginTop: (this.props.position.gutter/2).toString() + 'vh',
        marginBottom: (this.props.position.gutter/2).toString() + 'vh'
        // top: ((this.props.position.height/this.props.stat)*i + (this.props.position.gutter/2)).toString() + 'vh'
      }
      if (i < this.props.stat) {
        let statClass = "stat-block " + this.props.color;
        blocks.push(<div key={this.props.name + i.toString()} className={statClass} style={statStyle}/>);
      } else {
        let statClass = "stat-block stat-icon-background";
        blocks.push(<div key={this.props.name + i.toString()} className={statClass} style={statStyle}/>);
      }
    }

    return (
      <div className="StatBar" style={style}>
        <i className={this.props.icon} style={iconStyle} aria-hidden="true"></i>
        {blocks}
      </div>
    );
  }
}

export default StatBar;
