import { useState} from 'react'

import './App.css'
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns';
import { ru } from 'date-fns/locale'
import { format,addMonths } from 'date-fns';

import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement

} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';



ChartJS.register(
    ArcElement,
    annotationPlugin,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,Filler
);




function App() {

    const [stateOptionSelect, setStateOptionSelect] = useState('36') as any //select

const labels =[]
// const labels = [format(new Date(), 'dd-MM-yyyy'),format(addMonths(new Date(), 1), 'dd-MM-yyyy')]
    for(let i= 0; stateOptionSelect >i; i++){
        labels[i] = format(addMonths(new Date(), i), 'dd-MMMM-yyyy',{locale: ru})
    }







    const [criticalFinance,setCriticalFinance] = useState(2800000) as any //critical zone
    const [minimalFinanceIpoteka,setMinimalFinanceIpoteka] = useState(2500000) as any //20%
    const [currentFinance,setCurrentFinance] = useState('1000000') as any //seychas $ nal

    const [featureFinance] = useState([]) as any

let [summMunthZP, setSummMunthZP] = useState(200000)

// let f = 200000
    for(let i= 0; stateOptionSelect >i; i++){
        featureFinance[i] = Number(currentFinance) + (summMunthZP * i)
    }



    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
     const data = {
        labels,
        datasets: [
            {
                label: `Бюджет на  ${date}`,
                data:[currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance],

                borderColor: '#ffea00',
                backgroundColor: '#ffea00',
                yAxisID: 'y',

            },
            {
                label: 'Доходная прогрессия',
                data:featureFinance,
                borderColor: '#76ff03',
                backgroundColor: 'rgba(118, 225, 3, 0.1)',
                yAxisID: 'y',
                fill: true,
                borderDash:[14,14]
            },
            {
                label: 'Необходимо заработать денег на первый взнос - 20%',
                data:[minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka],
                borderColor: '#ff9100',
                backgroundColor: '#ff9100',
                yAxisID: 'y',
                borderDash:[4,5]
            },
            {
                label: 'Сумма первого взноса ипотеки и все расходы + услуги',
                data:[criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance],
                borderColor: '#ff3d00',
                backgroundColor: '#ff3d00',
                yAxisID: 'y',
            },

            {
                label: '',
                data:[900000],
                borderColor: 'rgba(118, 225, 3, 0)',
                backgroundColor: 'rgba(118, 225, 3, 0)',
                yAxisID: 'y',
            },

            {
                label: '',
                data:[3500000],
                borderColor: 'rgba(118, 225, 3, 0)',
                backgroundColor: 'rgba(118, 225, 3, 0)',
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
                        xValue: ()=>{
                            for(let i=0;featureFinance.length > i; i++ ) {
                                if(featureFinance[i] >= minimalFinanceIpoteka) {
                                    return i
                                }
                            }
                        },
                        yValue: minimalFinanceIpoteka,
                        backgroundColor: '#3d5afe'
                    },
                    point2: {
                        type: 'point',
                        xValue: ()=>{
                            for(let i=0;featureFinance.length > i; i++ ) {
                                if(featureFinance[i] >= criticalFinance) {
                                    return i
                                }
                            }
                        },
                        yValue: criticalFinance,
                        backgroundColor: '#3d5afe'
                    }
                }
            },



        },
        scales: {

x:{
    // type: 'time',
    adapters: {
        date: {
            locale: ru
        },
    },
        // type: 'time',
        // time: {
        //     unit: 'month'
        // },

    // type: 'time',
    // time:{
    //     unit:'day',
    //     parser:'dd:mm:yyyy'
    // },
    // adapters: {
    //     date: {
    //         locale: enUS,
    //     },
    // },
    grid:{
        color:'rgba(194,224,255,0.3)',
        lineWidth:'10',
        // border:'none'
    }
},
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


const handlerResetChartData = ()=>{
    setStateOptionSelect('36')
    setSummMunthZP('200000')
    setCurrentFinance('1000000')
    setMinimalFinanceIpoteka(2500000)
    setCriticalFinance(2800000)
}



     const dataD = {
        labels: ['Съем Кв. и ЖКХ', 'Ипотека Краснодар и ЖКХ', 'Новая ипотека', 'Доп. сумма ипотеки', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [65000, 26000, 175000, 25000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    } as any;

    const result = dataD.datasets[0].data.reduce((acc,el)=>{
        return acc+el
    },0)


    type ValuePiece = Date | null;

    type Value = ValuePiece | [ValuePiece, ValuePiece];
    const [value, onChange] = useState<Value>(new Date()) as any
  return (
    <>

        <div className="grid-wrapper">
            <span  className="bg chart">
                <Line  options={options} data={data} />
            </span>
            <span  className="bg">

<div style={{display: 'flex',alignItems:'center'}}>
          <img src={'./public/logo.jpg'} width={100} height="auto" alt="logo"/>
                <h6>Планирование ипотеки</h6>
</div>
<a href="https://ru.myfin.by/" target="_blank">Кальк</a>



            </span>
            <span  className="bg dd">
 <div style={{display:'flex', justifyContent:'space-between'}}>
                          <select value={stateOptionSelect} onChange={e => setStateOptionSelect(e.target.value)}  >
            <option value="24">2 года</option>
            <option value="36">3 года</option>
            <option value="48">4 года</option>
        </select>


       <button onClick={handlerResetChartData}> Reset Chart Data</button>
 </div>

            <div style={{display:'flex', marginBottom:'10px'}}>

                  <div style={{marginTop:'auto', marginRight:'5px', background:'#76ff03', width:'55px',height:'35px',borderRadius:'5px'}}/>

                  <div >
                      <label style={{fontSize:'12px'}}>Доходная прогрессия в месяц</label>
                      <input style={{width:'100px'}} className='input' type="number"   value={summMunthZP} onInput={(event:any)=> setSummMunthZP(Number(event.target.value))}/>

                        <button style={{marginRight:'5px'}} className="button" onClick={()=>setSummMunthZP((value:any)=> Number(value)+100000)}>+</button>
                      <button className="button" onClick={()=>setSummMunthZP((value:any)=> Number(value)-100000)}>-</button>
                  </div>


              </div>


<div style={{display:'flex',alignItems:'end'}}>
    <div style={{ marginRight:'5px', background:'#ffea00', width:'55px',height:'35px',borderRadius:'5px'}}/>

         <div>
                      <label style={{fontSize:'12px'}}>Бюджет на {date}</label>
                      <input style={{width:'100px'}} className='input' type="number"   value={currentFinance} onInput={(event:any)=> setCurrentFinance(Number(event.target.value))}/>

                      <button style={{marginRight:'5px'}} className="button" onClick={()=>setCurrentFinance((value:any)=> Number(value)+500000)}>+</button>
                      <button className="button" onClick={()=>setCurrentFinance((value:any)=> Number(value)-500000)}>-</button>
                  </div>
</div>






            </span>
            <span className="bg dd">
                     <div style={{display:'flex', marginBottom:'10px'}}>
                  <div style={{marginTop:'auto', marginRight:'5px', background:'#ff9100', width:'35px',height:'35px',borderRadius:'5px'}}/>
                  <div style={{display:'flex',  flexDirection: 'column', marginRight:'5px'}}>
                      <label style={{fontSize:'14px'}}>Необходимо заработать денег на первый взнос - 20%</label>
                      <input className='input' type="number"   value={minimalFinanceIpoteka} onInput={(event:any)=> setMinimalFinanceIpoteka(Number(event.target.value))}/>
                  </div>

                  <div style={{display:'flex',marginTop:'auto'}}>
                      <button style={{marginRight:'5px'}} className="button" onClick={()=>setMinimalFinanceIpoteka((value:any)=> Number(value)+500000)}>+</button>
                      <button className="button" onClick={()=>setMinimalFinanceIpoteka((value:any)=> Number(value)-500000)}>-</button>
                  </div>
              </div>

                    <div style={{display:'flex'}}>
                  <div style={{marginTop:'auto', marginRight:'5px', background:'#ff3d00', width:'35px',height:'35px',borderRadius:'5px'}}/>
                  <div style={{display:'flex',  flexDirection: 'column', marginRight:'5px'}}>
                      <label style={{fontSize:'14px'}}>Сумма первого взноса ипотеки и все расходы + услуги</label>
                      <input className='input' type="number"   value={criticalFinance} onInput={(event:any)=> setCriticalFinance(Number(event.target.value))}/>
                  </div>


                  <div style={{marginTop:'auto'}}>
                      <button style={{marginRight:'5px'}} className="button" onClick={()=>setCriticalFinance((value:any)=> Number(value)+500000)}>+</button>
                      <button className="button" onClick={()=>setCriticalFinance((value:any)=> Number(value)-500000)}>-</button>
                  </div>
              </div>
            </span>

            <span className="bg">
                3
            </span>
            <a href="#" className="bg ">
                4
            </a>
            <span  className=" bg">
                 5
            </span>
            <span  className="big bg">
                       <Calendar onChange={onChange} value={value} /> 6
            </span>
            <span className="bg big">
                <Doughnut data={dataD}/>
                {result.toLocaleString('ru')} руб. 7

            </span>
            <a href="#" className=" bg bg-9">
                8
            </a>
            <a href="#" className="big bg ">
                9
            </a>
            <a href="#" className="tall bg bg-11">
                10
            </a>
            <a href="#" className="bg bg-12">
                11
            </a>
            <a href="#" className="bg">
                12
            </a>
            <a href="#" className="bg">
                13
            </a>
            <a href="#" className="bg">
                14
            </a>
            <a href="#" className="wide bg">
                15
            </a>
        </div>


    </>
  )
}

export default App
