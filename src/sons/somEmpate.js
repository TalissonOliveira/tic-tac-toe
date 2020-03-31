import React, { } from 'react'
import empate from './empate.mp3'

export default class ContadorDeTempo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                    ftr: null
                 };
    
  }

  componentDidMount() {
    var teste = new Audio(); teste.src = empate; teste.play()

}
 
  render() {
    return (
        <div>
          {this.state.ftr !== 'Z' ?
          console.log('Audio de empate')
          :
          ''
          }
      </div>
    );
  }
}
