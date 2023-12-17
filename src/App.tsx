import {useState} from 'react'

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
    Filler,

} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(annotationPlugin,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,Filler
);




function App() {
    const labels = [ 'Январь 2024-0','Фвевраль 2024-1', 'Март 2024-2', 'Апрель 2024-3', 'Май 2024-4', 'Июнь 2024-5', 'Июль 2024-6','Август 2024-7','Сентябрь 2024-8','Октябрь 2024-9','Ноябрь 2024-10','Декабрь 2024-11',
        'Январь 2025-0','Фвевраль 2025-1', 'Март 2025-2', 'Апрель 2025-3', 'Май 2025-4', 'Июнь 2025-5', 'Июль 2025-6','Август 2025-7','Сентябрь 2025-8','Октябрь 2025-9','Ноябрь 2025-10','Декабрь 2025-11'];


    const [criticalFinance,setCriticalFinance] = useState(2800000) as any //critical zone
    const [minimalFinanceIpoteka,setMinimalFinanceIpoteka] = useState(2500000) as any //20%
    const [currentFinance,setCurrentFinance] = useState('1000000') as any //seychas $ nal

    const [featureFinance] = useState([]) as any

let [summMunthZP, setSummMunthZP] = useState(200000)

// let f = 200000
    for(let i= 0; 24 >i; i++){
        featureFinance[i] = Number(currentFinance) + (summMunthZP * i)
    }



    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
     const data = {
        labels,
        datasets: [
            {
                label: `Бюджет на  ${date}`,
                data:[currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance,currentFinance],

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
                data:[minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka,minimalFinanceIpoteka],
                borderColor: '#ff9100',
                backgroundColor: '#ff9100',
                yAxisID: 'y',
                borderDash:[4,5]
            },
            {
                label: 'Сумма первого взноса ипотеки и все расходы + услуги',
                data:[criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance,criticalFinance],
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

       <h3>Калькулятор ипотеки</h3>
       <iframe
           width="100%"
           height="700"
           src="https://ru.myfin.by/bank/sberbank/kalkulator-ipoteki?attribute=&CreditCalculatorMortgageFormBank%5Bform_bank_sef_alias%5D=sberbank&CreditCalculatorMortgageFormBank%5Bform_product_id%5D=304&CreditCalculatorMortgageFormBank%5Bamount_start%5D=11000000&CreditCalculatorMortgageFormBank%5Bperiod_year%5D=30&CreditCalculatorMortgageFormBank%5Bvznos%5D=3000000&CreditCalculatorMortgageFormBank%5Bvznos_currency%5D=5&CreditCalculatorMortgageFormBank%5Btype_calc%5D=&CreditCalculatorMortgageFormBank%5Btype_calc%5D=0&CreditCalculatorMortgageFormBank%5Bdate%5D=09.12.2023&CreditCalculatorMortgageFormBank%5Bone_time_commission%5D=0&CreditCalculatorMortgageFormBank%5Bone_time_fee_currency%5D=5&CreditCalculatorMortgageFormBank%5Badditional_monthly_payments%5D=0&CreditCalculatorMortgageFormBank%5Bpreterms%5D%5B2%5D=09.12.2023%3A100000%3A2%3A1"
       >
       </iframe>
   </div>
    </>
  )
}

export default App
