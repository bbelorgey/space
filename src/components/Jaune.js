import React, { Component } from 'react';
import playSound from './playSound';


class Jaune extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorCss: 'jauneUp',
      tirageAleatoire: false,
      pulse: false,
      id : 1
    }
    this.freqPlay = this.freqPlay.bind(this);
    this.repJoueur = this.repJoueur.bind(this);
  }
 
  freqPlay() {
    let frequency = 493.9;
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
    const colorCss = e.type === 'mousedown' ? 'jauneDown' : 'jauneUp';
    this.setState({ colorCss })
  }

  render() {
    const { pulse, reponse } = this.props;
    const { colorCss, id } = this.state;
    let padCss;
    if (pulse) {
      padCss = 'jauneDown';
      this.freqPlay();
    } else {
      padCss = colorCss;
    }

    return (
      <div id="jaune" onMouseDown={this.changeColor} onMouseUp={this.changeColor} onClick={this.repJoueur} className={`jaune ${padCss}`} >
      </div>
    )
  }
}

export default Jaune;