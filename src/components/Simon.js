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
      serieAffichage: [],
      boutonPush: false,
      affichage: [],
      nbCoup: 0,
      maxPlay: 3,
      currentTab: 0,
      currentPlay: 0,
      pulse: [false, false, false, false],
      reponseTab: [],
      affichageResultat: '',
      gestionDuJeu: 0,    //  0 = init / 1 = affichage / 2 = saisie des réponses / 4 = t'as gagné, autre parie / 5 = t'as perdu autre partie
      intervalId: null
    }

    this.tirageAleatoire = this.tirageAleatoire.bind(this);
    this.finish = this.finish.bind(this);
    this.reponseJoueur = this.reponseJoueur.bind(this);
  }

  resetJeu = ()=>{
    this.setState({

    })
  }

  reponseJoueur(id) {
    const { reponseTab, serie, affichageResultat, gestionDuJeu, maxPlay, currentPlay, currentTab } = this.state;
    const tabTmp = [...reponseTab, id];   // tab tmp des reponses
    let repNo = tabTmp.length-1; // no reponse en cours
    let gestionDuJeuTmp = gestionDuJeu;   // phase du jeu
    let affichageResultatTmp = affichageResultat;   // message informatif
    let play = currentPlay;
    let currentTabTmp = currentTab;
    let playContinue=false;

    if (repNo === maxPlay-1) {                                                      // dernier coup
      console.log('reponseJoueur cas1',repNo);
      affichageResultatTmp = 'T\'as gagné t\'es le plus fort, Rejouer?';
      gestionDuJeuTmp = 0;
      for (let i = 0; i < serie.length; i++) {
        if (serie[i] !== tabTmp[i]) {
          affichageResultatTmp = 'T\'as perdu, Rejouer?';
          gestionDuJeuTmp = 0;
        }
      }
      play=0;
      tabTmp.length = 0;    // on vide la saisie pour continuer la partie
      currentTabTmp = 0;
    } else {
      if (repNo < currentPlay) { // verifie coup en cours mais on reste sur même niveau
        console.log('repNo < currentPlay',repNo,currentPlay);
        if (serie[repNo] !== tabTmp[repNo]) {
          affichageResultatTmp = 'T\'as perdu, Rejouer?';
          gestionDuJeuTmp = 0;
          play=0;
          currentTabTmp = 0;
          tabTmp.length = 0;    // on vide la saisie pour continuer la partie
        }
      } else {
        affichageResultatTmp = 'Coup suivant';  // on passe au niveau suivant
        play = currentPlay + 1;   // j'incremente = coup suivant    
        console.log('repNo',repNo,'serie[repNo]',serie[repNo],'tabTmp[repNo]',tabTmp[repNo],'play',play);                                                // pas dernier coup
        if (serie[repNo] !== tabTmp[repNo]) {
          affichageResultatTmp = 'T\'as perdu, Rejouer?';
          gestionDuJeuTmp = 0;    // on recommence une partie
          tabTmp.length = 0;    // on vide la saisie pour continuer la partie
          play=0;
          currentTabTmp = 0;
        } else {
          tabTmp.length = 0;    // on vide la saisie pour continuer la partie
          gestionDuJeuTmp = 1;
          currentTabTmp = 0;     // remise à zéro pour redemarrage au de but de la serie
          playContinue=true;
        }
      }
    }
    this.setState({ currentTab: currentTabTmp, reponseTab: tabTmp, affichageResultat: affichageResultatTmp, gestionDuJeu: gestionDuJeuTmp, currentPlay: play });
    if(playContinue) this.playingGame();   // affichage
  }

  playingGame = () => {
    let intervalIdTmp = null;
    console.log('playingGame');
    intervalIdTmp = setInterval(this.affichageTirage, 1000); // gestion des impulsions couleurs et sonores
    this.setState({ intervalId: intervalIdTmp });
  }

  tirageAleatoire = () => {
    const { maxPlay } = this.state;
    console.log('tirageAleatoire');
    let tirage = [];
    for (let i = 0; i < maxPlay * 2; i = i + 2) {
      tirage[i] = Math.ceil((Math.random()) * 4) - 1;
      tirage[i + 1] = -1;
    }
    const tabTmp = tirage.filter(elt => elt !== -1);
    let affichageResultatTmp = '';
    this.setState({ serie: tabTmp, serieAffichage: tirage, gestionDuJeu: 1, reponseTab: [], affichageResultat : affichageResultatTmp, currentPlay: 0, currentTab: 0 });
  }

  affichageTirage = () => {
    const { serieAffichage, currentTab, currentPlay } = this.state;
    console.log('affichageTirage');
    let varPulse = [false, false, false, false];
    if (currentTab > (currentPlay * 2) + 1) {
      this.finish();
      return;
    }
    let encours = serieAffichage[currentTab];
    if (encours !== -1) varPulse[encours] = true;
    // console.log('encours',encours,'varPulse[encours]',varPulse[encours])
    let current = currentTab + 1;

    this.setState({ pulse: varPulse, currentTab: current });
  }

  finish() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
    this.setState({ gestionDuJeu: 2 });
  }

  start = (e) => {
    const { gestionDuJeu } = this.state;
    let intervalIdTmp = null;
    console.log('start',gestionDuJeu);
    if (gestionDuJeu === 0) this.tirageAleatoire(); // init des couleurs
    const boutonPush = e.type === 'mousedown' ? true : false;
    if (gestionDuJeu === 1) intervalIdTmp = setInterval(this.affichageTirage, 1000); // gestion des impulsions couleurs et sonores
    this.setState({ boutonPush, intervalId: intervalIdTmp });
  }

  render() {
    const { boutonPush, pulse, affichageResultat } = this.state;
    console.log('simon');
    return (
      <div>
        <div id="container" >
          <div id="simonHaut">
            <Bleu pulse={pulse[0]} reponse={this.reponseJoueur} />
            <Jaune pulse={pulse[1]} reponse={this.reponseJoueur} />
          </div>
          <div id="simonBas">
            <Vert pulse={pulse[2]} reponse={this.reponseJoueur} />
            <Rouge pulse={pulse[3]} reponse={this.reponseJoueur} />
          </div>
          <div id="boutonJeu">
            <img src={boutonPush ? boutonRouge : boutonRougeBas} onMouseDown={this.start} onMouseUp={this.start} alt="boutonRouge" />
          </div>
        </div>
        <h1>
          {affichageResultat}
        </h1>
      </div>
    )
  }
}

export default Simon;