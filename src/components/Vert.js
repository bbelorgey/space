import React, { Component } from 'react';
import playSound from './playSound';


class Vert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorCss: 'vertUp',
      tirageAleatoire: false,
      pulse: false,
      id : 2
    }
    this.freqPlay = this.freqPlay.bind(this);
    this.repJoueur = this.repJoueur.bind(this);
  }
  
  freqPlay() {
    let frequency = 392;
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
    const colorCss = e.type === 'mousedown' ? 'vertDown' : 'vertUp';
    this.setState({ colorCss })
  }

  render() {
    const { pulse, reponse } = this.props;
    const { colorCss, id } = this.state;
    let padCss;
    if (pulse) {
      padCss = 'vertDown';
      this.freqPlay();
    } else {
      padCss = colorCss;
    }

    return (
      <div id="vert" onMouseDown={this.changeColor} onMouseUp={this.changeColor} onClick={this.repJoueur} className={`bleu ${padCss}`} >
      </div>
    )
  }
}

export default Vert;