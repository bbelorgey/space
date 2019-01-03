import React, { Component } from 'react';
import playSound from './playSound';
// import freqStop from './playSound';

class Bleu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorCss: 'bleuUp',
      tirageAleatoire: false,
      pulse: false,
      id : 0
    }
    this.freqPlay = this.freqPlay.bind(this);
    this.repJoueur = this.repJoueur.bind(this);
  }

  freqPlay() {
    let frequency = 440.0;
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
    const colorCss = e.type === 'mousedown' ? 'bleuDown' : 'bleuUp';
    this.setState({ colorCss })
  }

  render() {
    const { pulse, reponse } = this.props;
    const { colorCss, id } = this.state;
    let padCss;
    if (pulse) {
      padCss = 'bleuDown';
      this.freqPlay();
    } else {
      padCss = colorCss;
    }
    return (
      <div id="bleu" onMouseDown={this.changeColor} onMouseUp={this.changeColor} onClick={this.repJoueur} className={`bleu ${padCss}`} >
      </div>
    )
  }
}

export default Bleu;