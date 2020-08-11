import React, { useState, useEffect } from 'react'
import './styles.css'
import QRCode from 'react-qr-code'
import { getRequestsByStatus } from '../../services/api'
import io from 'socket.io-client'
import { baseURL, baseURLQRCode } from '../../services/api'


const Home = () => {
  const [preparing, setPreparing] = useState([])
  const [ready, setReady] = useState([])
  const [data, setData] = useState([])
  const [status, setStatus] = useState('');


  useEffect(() => {

    const socket = io(baseURL)
    socket.on('status', (status) => setStatus(status))
    const statusList = ['1', '2', '3']
    const stateStatus = [setPreparing, setReady, setData]
    statusList.map(status => getRequestsByStatus(status).then(stateStatus[status - 1]))

  }, [status])

  return (

    <React.StrictMode>
      <div className="div-principal">

        <section className="grid grid-template-columns-2">

          <div className="item">
            <div>
              <QRCode value={baseURLQRCode} />
              <p className="text-scan">...</p>
            </div>

            <br />
            <h2 className="text-desc">Scaneie o código acima e realize <br />o pedido de seu cafézinho.</h2>

            <h2 className="text-desc">Você será avisado no painel <br />quando ele estiver pronto.</h2>
          </div>

          <div className="item2">
            <p>Venha retirar seu pedido</p>
            {data.map(item => (
              <h1 className="text-client" key={String(item.id)}>{item.name}</h1>
            ))}

            <section className="grid grid-columns-2">
              <div className="column1">
                <p>Preparação</p>
                {preparing.map(item => (
                  <p className="text-client2" key={String(item.id)}>{item.name}</p>
                ))}

              </div>

              <div className="column2">
                <p>Prontos</p>
                {ready.map(item => (

                  <p className="text-client2" key={String(item.id)}>{item.name}</p>

                ))}
              </div>

            </section>

          </div>

        </section>
      </div>
    </React.StrictMode>
  )
}

export default Home
