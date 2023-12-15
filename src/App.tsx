import {useEffect, useState} from 'react'

import './App.css'
import annotationPlugin from 'chartjs-plugin-annotation';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,

} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(annotationPlugin,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);




function App() {
    const labels = [ 'Январь','Фвевраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль','Август','Сентябрь','Октябрь','Ноябрь'];


    const [criticalFinance,setCriticalFinance] = useState(2800000) as any //critical zone
    const [minimalFinanceIpoteka,setMinimalFinanceIpoteka] = useState(2500000) as any //20%
    const [currentFinance,setCurrentFinance] = useState('1000000') as any //seychas $ nal

    const [featureFinance] = useState([]) as any
    const [w,setW]= useState(null) as any


let f = 200000
    for(let i= 0; 11 >i; i++){
        featureFinance[i] = Number(currentFinance) + (f * i)
    }


useEffect(()=>{

    featureFinance.find((el:any,index:any)=>{
        if(minimalFinanceIpoteka === 1000000 ) {
            setW(0)

        }
        if(el <= minimalFinanceIpoteka) {

            if( minimalFinanceIpoteka === 2000000 || minimalFinanceIpoteka === 3000000) {
                setW(index)
            }
            if(minimalFinanceIpoteka === 2500000 || minimalFinanceIpoteka === 1500000 ||minimalFinanceIpoteka === 3500000) {
                setW(index + 0.5)
            }

        }


    })
    if(currentFinance === 1500000) {
        setW(5)
    }
    if(minimalFinanceIpoteka === 2000000) {
        setW(2.5)
    }
},[
    minimalFinanceIpoteka,featureFinance,currentFinance
])


     const data = {
        labels,
        datasets: [
            {
                label: 'Актуальный бюджет на сегодня',
                data:[currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance],

                borderColor: '#ffea00',
                backgroundColor: '#ffea00',
                yAxisID: 'y',

            },
            {
                label: 'Доходная прогрессия',
                data:featureFinance,
                borderColor: '#76ff03',
                backgroundColor: '#76ff03',
                yAxisID: 'y',
                borderDash:[14,14]
            },
            {
                label: 'Общая сумма только на первый взнос по Ипотеке',
                data:[minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka],
                borderColor: '#ff9100',
                backgroundColor: '#ff9100',
                yAxisID: 'y',
                borderDash:[4,5]
            },
            {
                label: 'Первый взнос Ипотеки + Съем + Ипотека Крас + остальные траты',
                data:[criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance],
                borderColor: '#ff3d00',
                backgroundColor: '#ff3d00',
                yAxisID: 'y',
            },

            {
                label: '',
                data:[900000,900000,900000,900000,900000,900000],

                borderColor: '#ffffff',
                backgroundColor: '#ffffff',
                yAxisID: 'y',
            },

            {
                label: '',
                data:[3500000,3500000,3500000,3500000,3500000,3500000],

                borderColor: '#ffffff',
                backgroundColor: '#ffffff',
                yAxisID: 'y',
            },
        ],
    } as any;


    const options = {
        elements: {
            point:{
                radius: 0
            }
        },

        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        stacked: false,


        plugins: {

            annotation: {
                annotations: {
                    point1: {
                        type: 'point',
                        xValue: w,
                        yValue: minimalFinanceIpoteka,
                        backgroundColor: '#3d5afe'
                    },
                    point2: {
                        type: 'point',
                        xValue: 9,
                        yValue: 2800000,
                        backgroundColor: '#3d5afe'
                    }
                }
            },



        },
        scales: {

            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    } as any
  return (
    <>

        <div style={{padding:'15px',background:'gray', display:'flex',justifyContent: 'space-around'}}>
            <section style={{'display': 'flex'}}>

                <div style={{flexDirection: 'column', display: 'flex'}}>
                    <p>Бюджет на сегодня - $</p>
                    <input type="number"   value={currentFinance} onInput={(event:any)=> setCurrentFinance(Number(event.target.value))}/>
                    <button style={{padding:'5px'}} onClick={()=>setCurrentFinance((value:any)=> Number(value)+500000)}>+</button>
                    <button style={{padding:'5px'}} onClick={()=>setCurrentFinance((value:any)=> Number(value)-500000)}>-</button>
                </div>

                <div style={{flexDirection: 'column', display: 'flex'}}>
                    <p>Необходимо 20% - $</p>
                    <input type="number"  step='500000' value={minimalFinanceIpoteka} onInput={(event:any)=> setMinimalFinanceIpoteka(Number(event.target.value))}/>
                    <button style={{padding:'5px'}} onClick={()=>setMinimalFinanceIpoteka((value:any)=> Number(value)+500000)}>+</button>
                    <button style={{padding:'5px'}} onClick={()=>setMinimalFinanceIpoteka((value:any)=> Number(value)-500000)}>-</button>
                </div>

                <div style={{flexDirection: 'column', display: 'flex'}}>
                    <p>Новая ипотека + все услуги и подстраховки</p>
                    <input type="number"  step='500000' value={criticalFinance} onInput={(event:any)=> setCriticalFinance(Number(event.target.value))}/>
                    <button style={{padding:'5px'}} onClick={()=>setCriticalFinance((value:any)=> Number(value)+500000)}>+</button>
                    <button style={{padding:'5px'}} onClick={()=>setCriticalFinance((value:any)=> Number(value)-500000)}>-</button>
                </div>


            </section>

            <div>
                <h2>Новая ипотека</h2>
                <h3>10 000 000 - 20% = 2 000 000 руб.</h3>
                <h3>11 000 000 - 20% = 2 200 000 руб.</h3>
                <h3>12 000 000 - 20% = 2 400 000 руб.</h3>
                <h3>13 000 000 - 20% = 2 600 000 руб.</h3>

                <h5>Оказание юр.услуг - 30ка</h5>
                <h5>Открытие эксроу счета 10ка</h5>
                <h5>Страховка на меня</h5>
                <h5>Страховка на недвижимость</h5>
                <h5>Ремонт + техника</h5>

                <h2>Остальные расходы</h2>
                <h5>Ипотека Краснодар 23ка - 30 лет</h5>
                <h5>ЖКХ - 4ка</h5>
                <h5>Страховка на меня 1 раз в год</h5>
                <h5>Страховка на недвижимость 1 раз в год</h5>
                <h5>Налог на квартиру 1 раз в год</h5>
            </div>
        </div>



<div>





</div>


          <Line style={{'width': '2200px'}} options={options} data={data} />


    </>
  )
}

export default App
