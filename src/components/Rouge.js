import React, { Component } from 'react';
import playSound from './playSound';


class Rouge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorCss: 'rougeUp',
      tirageAleatoire: false,
      pulse: false,
      id : 3
    }
    this.freqPlay = this.freqPlay.bind(this);
    this.repJoueur = this.repJoueur.bind(this);
  }

  freqPlay() {
    let frequency = 349.2;
    playSound(frequency);
  }

  repJoueur(){
    const { reponse } = this.props;
    const { id } = this.state;
    this.freqPlay();
    reponse(id);
  }
  
  changeColor = (e) => {
    // console.log(e.type);
    const colorCss = e.type === 'mousedown' ? 'rougeDown' : 'rougeUp';
    this.setState({ colorCss })
  }

  render() {
    const { pulse, reponse } = this.props;
    const { colorCss, id } = this.state;
    let padCss;
    if (pulse) {
      padCss = 'rougeDown';
      this.freqPlay();
    } else {
      padCss = colorCss;
    }

    return (
      <div id="rouge" onMouseDown={this.changeColor} onMouseUp={this.changeColor} onClick={this.repJoueur} className={`rouge ${padCss}`} >
      </div>
    )
  }
}

export default Rouge;