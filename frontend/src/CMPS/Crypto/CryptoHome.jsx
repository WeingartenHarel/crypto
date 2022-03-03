import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet
} from 'react-router-dom'
import {
    loadItems,
    getById,
    setItem,
    removeItem,
    addItem,
    editItem,
} from '../../store/actions/cryptoActions';
import { CryptoChart } from './CryptoChart'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Crypto
// crypto
export function CryptoHome() {
    const dispatch = useDispatch();
    const ItemsCrypto = useSelector((state) => state.cryptoReducer.ItemsCrypto);
    const elementRef = useRef();
    const [cryptoData, setCryptoData] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [params, setParams] = useState({date:null,loc:'USD'})


    useEffect(() => {
        if (startDate) {
            let year = startDate.getFullYear();
            let month = startDate.getMonth();
            let day = startDate.getDate();
            let date = year + '-' + month + '-' + day;
            setParams(prevState =>({
                ...prevState,
                date:date
            }))
        }
    }, [startDate]);


    useEffect(() => {
        async function fetchData() {
            await dispatch(loadItems(params));
        }
        if (params.date) {
            fetchData()
        }
    }, [params]);

    useEffect(() => {
        // console.log('params',params)
    }, [params]);

    const handleToggle = ()=>{
        let loc = params.loc === 'USD' ? 'ILS' :'USD'
        setParams(prevState =>({
            ...prevState,
            loc:loc
        }))
    }

    return (
        <div className="crypto-section">
            <h2>Crypto Home:</h2>
            <div>
                <DatePicker title="Date picker" onChange={(date) => setStartDate(date)} dateFormat="dd mm yyyy" allowSameDay='true' selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                <button onClick={handleToggle}>Toggle USD/ILS</button>
            </div>
            {ItemsCrypto && <CryptoChart ItemsCrypto={ItemsCrypto} />}
        </div>
    );
}
