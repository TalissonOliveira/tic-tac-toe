import React from 'react'
import './JogoDaVelha.css';

export default class ContadorDeTempo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
                    elapsed: 0,
                    tempoPassado: 0,
                    ftr: null
                 };
    this.tick = this.tick.bind(this);  
  }
 
  componentDidMount() {
    this.contadorDeTempo = setInterval(this.tick, 1000);

  }
  
  componentWillUnmount() {
    //this.setState({ tempoPassado: this.state.elapsed })
    clearInterval(this.contadorDeTempo);
    console.log('Duração da partida: ' + this.state.tempoPassado)
    this.setState({ ftr: 'Z' })
    
  }

  tick() {
    this.setState({ elapsed: this.state.elapsed + 1 });
    this.setState({ tempoPassado: this.state.elapsed })
  }
 
  render() {
    return (
        <div>
            {this.state.ftr !== 'Z' ?
            <h1 className='tempo'>A PARTIDA COMEÇOU A {this.state.elapsed}s</h1>
            : console.log('TEMPOOOOOO: ' + this.state.tempoFinal)}
        </div>
    );
  }
}
