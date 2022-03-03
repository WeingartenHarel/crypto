import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chart } from 'react-charts'

export function CryptoChart({ ItemsCrypto }) {

    const [chartData, setChartData] = useState({
        time: [],
        open: [],
        high: [],
        low: [],
        close: [],
    })
    useEffect(() => {
        ItemsCryptoToArray()

    }, [ItemsCrypto]);

    useEffect(() => {
        console.log('chartData', chartData)
    }, [chartData]);


    const ItemsCryptoToArray = () => {
        function toTimestamp(strDate) {
            var datum = Date.parse(strDate);
            return datum / 1000;
        }
        const getValue = (keyWord, index) => {
            let key = Object.keys(valuesStock[index]).filter(item => item.includes(keyWord))[0]
            let value = valuesStock[index][key]
            // console.log('valu t', value)
            return value
        }

        let keysTime = Object.keys(ItemsCrypto)
        let valuesStock = Object.values(ItemsCrypto)

        let currency = Object.keys(valuesStock[0])[0].includes('USD') ? 'USD' : 'ILS'
        console.log('currency', currency)
        let valueOpen = valuesStock.map((item, index) => [toTimestamp(keysTime[index]), parseInt(item[`1a. open (${currency})`])]);
        let valueHigh = valuesStock.map((item, index) => [toTimestamp(keysTime[index]), parseInt(item[`2a. high (${currency})`])]);
        let valueLow = valuesStock.map((item, index) => [toTimestamp(keysTime[index]), parseInt(item[`3a. low (${currency})`])]);
        let valueClose = valuesStock.map((item, index) => [toTimestamp(keysTime[index]), parseInt(item[`4a. close (${currency})`])]);


        setChartData({
            time: keysTime,
            open: valueOpen,
            high: valueHigh,
            low: valueLow,
            close: valueClose,
        })
    }

    const data = React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: chartData.open
            },
            {
                label: 'Series 2',
                data: chartData.high
            },
            {
                label: 'Series 3',
                data: chartData.low
            },
            {
                label: 'Series 4',
                data: chartData.close
            }

        ],
        [chartData]
    )

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    const LineChart = () => {
        // A react-chart hyper-responsively and continuously fills the available
        // space of its parent element automatically
        return (<div
            style={{
                width: '600px',
                height: '422px'
            }}
        >
            <Chart data={data} axes={axes} />
        </div>)
    }
    return (
        <div>
            {chartData.close.length > 1 && <LineChart />}
        </div>
    )
}

/// object example for dev

// 1a. open (USD): "7978.94000000"
// 1b. open (USD): "7978.94000000"
// 2a. high (USD): "8044.65000000"
// 2b. high (USD): "8044.65000000"
// 3a. low (USD): "7751.00000000"
// 3b. low (USD): "7751.00000000"
// 4a. close (USD): "7893.62000000"
// 4b. close (USD): "7893.62000000"
// 5. volume: "22657.32963400"
// 6. market cap (USD): "22657.32963400"

// 1a. open (ILS): "25703.35731600"
// 1b. open (USD): "7978.94000000"
// 2a. high (ILS): "25915.03551000"
// 2b. high (USD): "8044.65000000"
// 3a. low (ILS): "24969.07140000"
// 3b. low (USD): "7751.00000000"
// 4a. close (ILS): "25428.50746800"
// 4b. close (USD): "7893.62000000"
// 5. volume: "22657.32963400"
// 6. market cap (USD): "22657.32963400"
