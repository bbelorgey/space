import React, { Component } from 'react';
import Bleu from './Bleu';
import Rouge from './Rouge';
import Vert from './Vert';
import Jaune from './Jaune';
import boutonRouge from '../images/boutonRouge.png';
import boutonRougeBas from '../images/boutonRougeBas.png';

class Simon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serie: [],
      boutonPush: false
    }
    this.tirageAleatoire = this.tirageAleatoire.bind(this);
    // this.generateJsx = this.generateJsx.bind(this);
  }

  tirageAleatoire = (push) => {
    let tirage = Math.ceil((Math.random()) * 4);
    console.log(tirage);
    const { serie } = this.state;
    this.setState({ serie: [...serie, tirage], boutonPush:push });
  }

  changeColorButtom = (e) => {
    console.log(e.type);
    const boutonPush = e.type === 'mousedown' ? true : false;
    if (boutonPush) this.tirageAleatoire(boutonPush);
    else this.setState({ boutonPush });
  }

  render() {
    const { boutonPush, serie } = this.state;
    return (
      <div>
        {
          serie.length > 0 ? serie.map((couleur,index) =>
            <div id="container" key={index}>
            HAUT
              <div id="simonHaut">
                {couleur==='1'?<Bleu pulse />:<Bleu />}
                {couleur==='2'?<Jaune pulse />:<Jaune />}
              </div>
              <div id="simonBas">
                {couleur==='3'?<Vert pulse />:<Vert />}
                {couleur==='4'?<Rouge pulse />:<Rouge />}
              </div>
              <div id="boutonJeu">
                <img src={boutonPush ? boutonRouge : boutonRougeBas} onMouseDown={this.changeColorButtom} onMouseUp={this.changeColorButtom} alt="boutonRouge" />
              </div>
            </div>
          )
            :
            <div id="container">
            BAS
              <div id="simonHaut">
                <Bleu />
                <Jaune />
              </div>
              <div id="simonBas">
                <Vert />
                <Rouge />
              </div>
              <div id="boutonJeu">
                <img src={boutonPush ? boutonRouge : boutonRougeBas} onMouseDown={this.changeColorButtom} onMouseUp={this.changeColorButtom} alt="boutonRouge" />
              </div>
            </div>
        }

      </div>
    )
  }
}

export default Simon;