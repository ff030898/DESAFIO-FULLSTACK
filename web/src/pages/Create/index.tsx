import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import banner from '../../assets/img/banner.png'
import { FiArrowRight } from 'react-icons/fi'
import { createRequest } from '../../services/api'
import './styles.css'


interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}


interface State {
  textmask: string;
}


const Create = () => {
  const [counter, setCounter] = useState(1)

 

  const { register, handleSubmit, errors } = useForm()

  async function onSubmit(data: any) {
    const { name, email, tel } = data
    const coffee = 'Café Expresso'
    const qtd = counter
    const status = '1'

    const dataSend = {
      name,
      email,
      tel,
      coffee,
      qtd,
      status
    }

    createRequest(dataSend)

    alert('Pedido cadastrado com sucesso. Acompanhe no monitor')

    window.location.reload()
  }

  async function handleButtonMin() {
    if (counter > 1) {
      setCounter(counter - 1)
    } else {
      alert('Atenção, escolha 1 ou mais unidades!')
    }
  }

  async function handleButtonMax() {
    setCounter(counter + 1)
  }



  return (
    <div>
      <div className="banner">
        <img src={banner} alt="Café Expresso" className="banner" />
        <div className="qtd-pedido">
          <div className="text-qtd">
            0{counter}
          </div>
          <button className="btn-min" onClick={handleButtonMin}>-</button>
          <button className="btn-max" onClick={handleButtonMax}>+</button>
        </div>

      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="div-form">

          <input
            placeholder="Nome"
            className="input"
            name="name"
            ref={register({
              required: 'Digite seu nome'
            })}
          />

          {errors.name && <p className="error">{errors.name.message}</p>}

          <input
            placeholder="Email"
            className="input"
            name="email"
            ref={register({
              required: 'Digite seu email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Digite um endereço de email válido'
              }
            })}
          />

          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            placeholder="Telefone"
            className="input"
            name="tel"
            type="tel"
            minLength={10}
            maxLength={11}
            ref={register({
              required: 'Digite seu telefone',
              pattern: {
                value: /[0-9]$/i,
                message: 'Digite um telefone válido'
              }
            })}
          />

          {errors.tel && <p className="error">{errors.tel.message}</p>}

        </div>

        <button type="submit" className="btn-create">Clique para realizar o pedido <FiArrowRight /></button>

      </form>

    </div >

  )
}
export default Create
