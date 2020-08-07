import React, { useState, useEffect } from 'react';
import './styles.css';
import QRCode from "react-qr-code";
import api from '../../services/api';
import { Link } from 'react-router-dom';


const Home = () => {

    const [preparing, setPreparing] = useState([]);
    const [ready, setReady] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('requests/1').then(response => {
            setPreparing(response.data)
        })
    }, [])

    useEffect(() => {
        api.get('requests/2').then(response => {
            setReady(response.data)
        })
    }, [])


    useEffect(() => {
        api.get('requests/3').then(response => {
            setData(response.data)
        })
    }, [])


    return (
        <div className="div-principal">
            <Link to="/admin">
                <button style={{ marginLeft: 30, borderRadius: 10, padding: 15, cursor: "pointer" }}>Painel Admin</button>
            </Link>
            <section className="grid grid-template-columns-2">

                <div className="item">
                    <div>
                        <QRCode value='http://localhost:3000/create' />
                        <p className="text-scan">...</p>
                    </div>

                    <br />
                    <h2 className="text-desc">Scaneie o código acima e realize <br />o pedido de seu cafézinho.</h2>
                    <br />
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



    )

}


export default Home;