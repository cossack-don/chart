import { useState} from 'react'

import './App.css'
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns';
import { ru } from 'date-fns/locale'
import { format,addMonths } from 'date-fns';

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

} from 'chart.js';
import { Line } from 'react-chartjs-2';



ChartJS.register(
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




  return (
    <>



<h2>Калькулятор планируемой ипотеки</h2>
          <Line style={{'width': '2200px'}} options={options} data={data} />

        <select value={stateOptionSelect} onChange={e => setStateOptionSelect(e.target.value)}  >
            <option value="24">2 года</option>
            <option value="36">3 года</option>
            <option value="48">4 года</option>
        </select>
      <div style={{display:'flex', marginTop:'25px'}}>
          <section style={{marginRight:'15px'}}>

              <div style={{display:'flex', marginBottom:'10px'}}>
                  <div style={{marginTop:'auto', marginRight:'5px', background:'#76ff03', width:'35px',height:'35px',borderRadius:'5px'}}/>
                  <div style={{display:'flex',  flexDirection: 'column', marginRight:'5px'}}>
                      <label style={{fontSize:'14px'}}>Доходная прогрессия в месяц {summMunthZP.toLocaleString('ru')} руб.</label>
                      <input className='input' type="number"   value={summMunthZP} onInput={(event:any)=> setSummMunthZP(Number(event.target.value))}/>
                  </div>

                  <div style={{marginTop:'auto'}}>
                      <button style={{marginRight:'5px'}} className="button" onClick={()=>setSummMunthZP((value:any)=> Number(value)+100000)}>+</button>
                      <button className="button" onClick={()=>setSummMunthZP((value:any)=> Number(value)-100000)}>-</button>
                  </div>
              </div>

              <div style={{display:'flex', marginBottom:'10px'}}>
                  <div style={{marginTop:'auto', marginRight:'5px', background:'#ffea00', width:'35px',height:'35px',borderRadius:'5px'}}/>
                  <div style={{display:'flex',  flexDirection: 'column', marginRight:'5px'}}>
                      <label style={{fontSize:'14px'}}>Бюджет на {date}</label>
                      <input className='input' type="number"   value={currentFinance} onInput={(event:any)=> setCurrentFinance(Number(event.target.value))}/>
                  </div>

                  <div style={{marginTop:'auto'}}>
                      <button style={{marginRight:'5px'}} className="button" onClick={()=>setCurrentFinance((value:any)=> Number(value)+500000)}>+</button>
                      <button className="button" onClick={()=>setCurrentFinance((value:any)=> Number(value)-500000)}>-</button>
                  </div>
              </div>

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


          </section>

          <section>
              <h4>Примеры для новостроек. С 23 декабря сумма ипотеки 6 млн и первый взнос 30%</h4>
              <table>
                  <tr>
                      <th>Сумма квартиры</th>
                      <th>% первого взноса</th>
                      <th>Сумма первого взноса</th>
                  </tr>
                  <tr>
                      <td>10 000 000 руб.</td>
                      <td>20%</td>
                      <td>2 000 000 руб.</td>
                  </tr>
                  <tr>
                      <td>10 000 000 руб.</td>
                      <td>30%</td>
                      <td>3 000 000 руб.</td>
                  </tr>
                  <tr>
                      <td>11 000 000 руб.</td>
                      <td>20%</td>
                      <td>2 200 000 руб.</td>
                  </tr>
                  <tr>
                      <td>11 000 000 руб.</td>
                      <td>30%</td>
                      <td>3 300 000 руб.</td>
                  </tr>
                  <tr>
                      <td>12 000 000 руб.</td>
                      <td>20%</td>
                      <td>2 400 000 руб.</td>
                  </tr>
                  <tr>
                      <td>12 000 000 руб.</td>
                      <td>30%</td>
                      <td>3 600 000 руб.</td>
                  </tr>
              </table>

          </section>
      </div>

   <div style={{marginTop:'45px'}}>
       <a className='button' style={{color:'blue',padding:'15px'}} href="https://ru.myfin.by/" target="_blank">Мощный калькулятор ипотек, кредитов и вкладов</a>
   </div>
    </>
  )
}

export default App
