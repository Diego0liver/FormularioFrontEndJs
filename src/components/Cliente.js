import  {React, useEffect, useState} from 'react'
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {ClientStyled} from './styled/clientCss'
import Client from '../img/ico.png'
import gerarPdf from './pdf/gerarPdf'


const Cliente = () => {
    const [cliente, setCliente] = useState([])
    const { id } = useParams()
    let history = useNavigate()
    
    useEffect(() => {
      if ( id ) {
          axios.get(`http://localhost:4000/form/${id}`)
              .then(res => {
                  setCliente(res.data) 
              })
              .catch(err => {
                  console.log(err)
              })}
  }, [ id ]);



 //Soma de idade
 const age =(cliente)=>{
    const a = cliente.datas
    if(cliente.datas !== undefined){
        return a.slice(0, -6)
    }}
 const numberAge = Number(age(cliente))
 const dataAtual = new Date();
const anoAtual = dataAtual. getFullYear();
const soma = anoAtual - numberAge
//


  return (<ClientStyled>
            <div className='header'>
            <img alt='cliente' src={Client} ></img>
            <h1>Cliente {cliente.nome}</h1>
            </div>
            <ul>
            <li>Nome: {cliente.nome}</li>
            <li>Sobre nome: {cliente.sobre_nome}</li>
            <li>Telefone: {cliente.telefone}</li>
            <li>E-mail: {cliente.email}</li>
            <li>Data de nascimento: {cliente.datas}</li>
            <li>Idade: {soma}</li>
            <li>Sexo: {cliente.sexo}</li>
            <li>Estado civil: {cliente.estado_civil}</li>
            <li>CPF: {cliente.cpf}</li>
            <li>Renda mensal: R${cliente.renda}</li>
            <li>CEP: {cliente.cep}</li>
            <li>Rua: {cliente.rua}</li>
            <li>Cidade: {cliente.cidade}</li>
            <li>Estado: {cliente.estado}</li>
            <li>Numero da casa: {cliente.n_casa}</li>
            
          </ul>
          <button onClick={()=>history("/")}>Voltar</button>
          <button onClick={()=>gerarPdf(cliente)}>Gerar PDF</button>
         
          
  </ClientStyled>
  )
 
}

export default Cliente