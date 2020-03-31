import React, { useState, useEffect } from 'react';
import './JogoDaVelha.css';

import ContadorDeTempo from './contadorDeTempo'

import SomTempo from './sons/somEmpate'
import Vitoria from './sons/somVitoria'
import efeito from './sons/efeito.wav'
import efeitoclick from './sons/efeitoclick.wav'

function JogoDaVelha() {
  const tabuleiroVazio = Array(9).fill("") //criar uma array com nove items vazio
  const [tabuleiro, setTabuleiro] = useState(tabuleiroVazio)
  const [jogadorAtual, setJogadorAtual] = useState('O') //o useState ta definindo que o 1° jogador será o 'O'
  const [vencedor, setVencedor] = useState(null)
  const [empate, setEmpate] = useState(null)
  const [ftr, setFtr] = useState()
  const [pontosO, setPontosO] = useState(0)
  const [pontosX, setPontosX] = useState(0)
  const [pontosE, setPontosE] = useState(0)
  const [totalDePartidas, setTotalDePartidas] = useState(0)


  //controlar o que acontece quando clicar na celula
  const ClicarNaCelula = (index) => {
    if (vencedor) return null
    //impedir que use uma célula ocupada(substituir o X ou O que ja tinha)
    if (tabuleiro[index] !== "") return null

    setTabuleiro(tabuleiro.map((item, itemIndex) => itemIndex === index ? jogadorAtual : item))
    //Alternar entre jogador X e O
    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X')
  }
  //verificar se tem vencedor
  const verificarVencedor = () => {
    const formasDeVencer = [
      [tabuleiro[0], tabuleiro[1], tabuleiro[2]],
      [tabuleiro[3], tabuleiro[4], tabuleiro[5]],
      [tabuleiro[6], tabuleiro[7], tabuleiro[8]],

      [tabuleiro[0], tabuleiro[3], tabuleiro[6]],
      [tabuleiro[1], tabuleiro[4], tabuleiro[7]],
      [tabuleiro[2], tabuleiro[5], tabuleiro[8]],

      [tabuleiro[0], tabuleiro[4], tabuleiro[8]],
      [tabuleiro[2], tabuleiro[4], tabuleiro[6]],
    ]

    formasDeVencer.forEach(celulas => {
      if (celulas.every(celula => celula === 'O')) { 
        setVencedor('O');
        setJogadorAtual(null);
        setFtr('Z');
        setPontosO(pontosO + 1);
        console.log('Jogador Atual: ' + jogadorAtual)
      }      
      
      if (celulas.every(celula => celula === 'X')) {       
        setVencedor('X');
        setJogadorAtual(null);
        setFtr('Z');
        setPontosX(pontosX + 1)
        console.log('Jogador Atual: ' + jogadorAtual)
      } 
      contarEmpate()
      verificarEmpate()
    })
  }
  //verificar se o jogo foi empate
  const contarEmpate = () => {
    setPontosE(totalDePartidas - (pontosX + pontosO))
    console.log('TOTAL DE EMPATES: ' + pontosE)
  }
  const verificarEmpate = () => {
    if (tabuleiro.every(item => item !== '')) { //condição para verificar se tds os elementos estão ocupados(diferentes de vazio)
      setEmpate('E')
      setFtr('Z')
    }  
  }

  useEffect(verificarVencedor, [tabuleiro])
  //resetar o jogo
  const resetarJogo = () => {
    if (vencedor === 'X' || vencedor === 'O') {
      setJogadorAtual(vencedor)
    }
    setTabuleiro(tabuleiroVazio) //limpar tabuleiro
    setVencedor(null) //limpasr vencedor
    setFtr(null)
    setEmpate(null)
    setTotalDePartidas(totalDePartidas + 1)
    console.log('TOTAL DE PARTIDAS: ' + totalDePartidas) 
  }

  function tocarAudio(index){
    console.log(vencedor === 'X' || vencedor === 'O')
    if (tabuleiro[index] === "" && (vencedor === null)){
      var audioOver = new Audio();
      audioOver.src = efeito;
      audioOver.play()
    }
  }
  function click(index){
    console.log(vencedor === 'X' || vencedor === 'O')
    if (tabuleiro[index] === "" && (vencedor === null)){
      var audioClick = new Audio();
      audioClick.src = efeitoclick;
      audioClick.play()
    }
  }


  return (
    <main>
      <h1 className="titulo">Jogo da Velha</h1>
      {ftr !== 'Z' ?
      <ContadorDeTempo />
      :
      ''
      }
      {/*<div className='totalDePartidas'>{totalDePartidas}</div>*/}
      <div className={`tabuleiro ${vencedor ? 'jogo-finalizado' : ''}`} >
        {/*Criar o tabuleiro*/}
        {tabuleiro.map((item, index) => (
          <div key={index} className={`celula ${item}`} 
                onMouseDown={() => click(index)} 
                onMouseOver={() => tocarAudio(index)} 
                onClick={() => ClicarNaCelula(index)}>
            {item}
          </div>
        ))}
      </div>

      {/*Placar*/}
      <div className='placar'>
        <h2>
          <span className='O'>O</span> -- <span className='X'>X</span>
        </h2>
      </div>
      <div className='pontosPlacar'>
        <div className='pontosO'>{pontosO}</div> 
        <div className='pontosE'>{pontosE}</div> 
        <div className='pontosX'>{pontosX}</div>      
      </div>

      {/*Criar regra para mostrar vez do jogador*/}
      {empate !== 'E' && (jogadorAtual === 'X' || jogadorAtual === 'O') ?
          <h2 className='mostrarVez'>
            VEZ DE <span className={jogadorAtual}>{jogadorAtual}</span>
          </h2> 
          : ''
      }
      {/*Criar regra para só mostrar o footer quando houver um vencedor*/}
      {ftr &&
        <footer>
          {empate === 'E'  && vencedor !== 'O' && vencedor !== 'X'?
          <SomTempo />
          :
          <Vitoria />
          
          }

          {vencedor !== 'O' && vencedor !== 'X' ?
            <h2 className='mensagem-vencedor'>
              <span className={empate}>EMPATE!</span>
            </h2>
          :
            <h2 className='mensagem-vencedor'>
              <span className={vencedor}>{vencedor}</span> VENCEU!
            </h2>
          }
          <button onMouseOver={() => {var audioBtn = new Audio(); audioBtn.src = efeito; audioBtn.play()}} 
                  onClick={resetarJogo}>JOGAR NOVAMENTE</button>
        </footer>
      } 
    </main>
  );
}

export default JogoDaVelha;