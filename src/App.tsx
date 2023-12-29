import {useState, useRef} from 'react'
// import {CurrencyInput} from 'react-currency-mask';
import {IMaskInput} from 'react-imask';
import './App.css'
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns';
import {ru} from 'date-fns/locale'
import {format, addMonths} from 'date-fns';

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
import {Line} from 'react-chartjs-2';
import {CardPaymentsDates} from "./components/CardPaymentsDates";
import {ChartPaymentsCost} from "./charts/ChartPaymentsCost";


ChartJS.register(
    ArcElement,
    annotationPlugin,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, Filler
);


function App() {

    const [stateOptionSelect, setStateOptionSelect] = useState('36') as any //select

    const labels = []

    for (let i = 0; stateOptionSelect > i; i++) {
        labels[i] = format(addMonths(new Date(), i), 'dd-MMMM-yyyy', {locale: ru})
    }


    const [criticalFinance, setCriticalFinance] = useState(2800000) as any //critical zone
    const [minimalFinanceIpoteka, setMinimalFinanceIpoteka] = useState(2500000) as any // Первый взнос 20%/30%
    const [currentFinance, setCurrentFinance] = useState('2000000') as any //Сейчас денег налика

    const [featureFinance] = useState([]) as any

    const [summMunthZP, setSummMunthZP] = useState('175000') // Могу отложить в месяц


    for (let i = 0; stateOptionSelect > i; i++) {
        featureFinance[i] = Number(currentFinance) + (summMunthZP * i)
    }


    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const data = {
        labels,
        datasets: [
            {
                label: `Бюджет на  ${date}`,
                data: [currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance, currentFinance],

                borderColor: '#ffea00',
                backgroundColor: '#ffea00',
                yAxisID: 'y',

            },
            {
                label: 'Доходная прогрессия',
                data: featureFinance,
                borderColor: '#76ff03',
                backgroundColor: 'rgba(118, 225, 3, 0.1)',
                yAxisID: 'y',
                fill: true,
                borderDash: [14, 14]
            },
            {
                label: 'Необходимо заработать денег на первый взнос - 20%',
                data: [minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka, minimalFinanceIpoteka],
                borderColor: '#ff9100',
                backgroundColor: '#ff9100',
                yAxisID: 'y',
                borderDash: [4, 5]
            },
            {
                label: 'Сумма первого взноса ипотеки и все расходы + услуги',
                data: [criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance, criticalFinance],
                borderColor: '#ff3d00',
                backgroundColor: '#ff3d00',
                yAxisID: 'y',
            },

            {
                label: '',
                data: [900000],
                borderColor: 'rgba(118, 225, 3, 0)',
                backgroundColor: 'rgba(118, 225, 3, 0)',
                yAxisID: 'y',
            },

            {
                label: '',
                data: [3500000],
                borderColor: 'rgba(118, 225, 3, 0)',
                backgroundColor: 'rgba(118, 225, 3, 0)',
                yAxisID: 'y',
            },
        ],
    } as any;


    const options = {
        elements: {
            point: {
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
                        xValue: () => {
                            for (let i = 0; featureFinance.length > i; i++) {
                                if (featureFinance[i] >= minimalFinanceIpoteka) {
                                    return i
                                }
                            }
                        },
                        yValue: minimalFinanceIpoteka,
                        backgroundColor: '#3d5afe'
                    },
                    point2: {
                        type: 'point',
                        xValue: () => {
                            for (let i = 0; featureFinance.length > i; i++) {
                                if (featureFinance[i] >= criticalFinance) {
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
            x: {

                adapters: {
                    date: {
                        locale: ru
                    },
                },
                grid: {
                    color: 'rgba(194,224,255,0.3)',
                    lineWidth: '10',
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


    const handlerResetChartData = () => {
        setStateOptionSelect('36')
        setSummMunthZP(200000) as any
        setCurrentFinance('1000000')
        setMinimalFinanceIpoteka(2500000)
        setCriticalFinance(2800000)
    }


    type ValuePiece = Date | null;

    type Value = ValuePiece | [ValuePiece, ValuePiece];
    const [value, onChange] = useState<Value>(new Date()) as any


    //
    //
    const [stateBaseSum, setStateBaseSum] = useState('') as any
    const [statePercentFromSumFeatureIpoteki, setStatePercentFromSumFeatureIpoteki] = useState('') as any
    const handlerResetCalcPercentFromSumIpoteka = () => {
        setStateBaseSum('')
        setStatePercentFromSumFeatureIpoteki('')
    }


    const ref = useRef(null);
    const inputRef = useRef(null);
    return (
        <>


            <div className="grid-wrapper">
            <span className="bg chart">
                <Line options={options} data={data}/>
            </span>
                <span className="bg">

<div style={{display: 'flex', alignItems: 'center'}}>
          <img src={'./logo.jpg'} width={100} height="auto" alt="logo"/>
                <h6>Планирование ипотеки</h6>
</div>
<a href="https://ru.myfin.by/" target="_blank">Calc - link</a>



            </span>
                <span className="bg dd">
 <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <select value={stateOptionSelect} onChange={e => setStateOptionSelect(e.target.value)}>
            <option value="24">2 года</option>
            <option value="36">3 года</option>
            <option value="48">4 года</option>
        </select>


       <button className="button-reset" onClick={handlerResetChartData}>Очистить график</button>
 </div>

            <div style={{display: 'flex', marginBottom: '10px'}}>

                  <div style={{
                      marginTop: 'auto',
                      marginRight: '5px',
                      background: '#76ff03',
                      width: '55px',
                      height: '35px',
                      borderRadius: '5px'
                  }}/>

                  <div>
                      <label style={{fontSize: '12px'}}>Доходная прогрессия в месяц</label>
                            <IMaskInput
                                style={{width: '100px'}}
                                className='input'
                                mask={Number}
                                radix="."
                                thousandsSeparator={' '}
                                value={summMunthZP}
                                unmask={true}
                                ref={ref}

                                inputRef={inputRef}
                                onAccept={

                                    (value, mask) => {
                                        setSummMunthZP(value)
                                    }
                                }
                                placeholder='Доход в месяц'
                            />


                      <button style={{marginRight: '5px'}}
                              className="button"
                              onClick={() => setSummMunthZP((value: string) => String(Number(value) + 50000))}
                      >+</button>
                      <button className="button"
                              onClick={() => setSummMunthZP((value: string) => String(Number(value) - 50000))}
                      >-</button>
                  </div>


              </div>


<div style={{display: 'flex', alignItems: 'end'}}>
    <div style={{marginRight: '5px', background: '#ffea00', width: '55px', height: '35px', borderRadius: '5px'}}/>

         <div>
                      <label style={{fontSize: '12px'}}>Бюджет на {date}</label>
                      <IMaskInput
                          style={{width: '100px'}}
                          className='input'
                          mask={Number}
                          radix="."
                          thousandsSeparator={' '}
                          value={currentFinance}
                          unmask={true}
                          ref={ref}
                          scale={2}
                          inputRef={inputRef}
                          onAccept={

                              (value: any) => {
                                  setCurrentFinance(value)
                              }
                          }
                          placeholder='Доход в месяц'
                      />


             <button
                 style={{marginRight: '5px'}}
                 className="button"
                 onClick={() => setCurrentFinance((value: string) => String(Number(value) + 500000))}
             >+</button>
             <button
                 className="button"
                 onClick={() => setCurrentFinance((value: string) => String(Number(value) - 500000))}
             >-</button>
                  </div>
</div>






            </span>
                <span className="bg dd">
                     <div style={{display: 'flex', marginBottom: '10px'}}>
                  <div style={{
                      marginTop: 'auto',
                      marginRight: '5px',
                      background: '#ff9100',
                      width: '35px',
                      height: '35px',
                      borderRadius: '5px'
                  }}/>
                  <div style={{display: 'flex', flexDirection: 'column', marginRight: '5px'}}>
                      <label style={{fontSize: '14px'}}>Необходимо заработать денег на первый взнос - 20%</label>
                              <IMaskInput
                                  style={{width: '100px'}}
                                  className='input'
                                  mask={Number}
                                  radix="."
                                  thousandsSeparator={' '}
                                  value={summMunthZP}
                                  unmask={true}
                                  ref={ref}

                                  inputRef={inputRef}
                                  onAccept={

                                      (value: any) => {
                                          setSummMunthZP(value)
                                      }
                                  }
                                  placeholder='Доход в месяц'
                              />
                      <input className='input' type="number" value={minimalFinanceIpoteka}
                             onInput={(event: any) => setMinimalFinanceIpoteka(Number(event.target.value))}/>
                  </div>

                  <div style={{display: 'flex', marginTop: 'auto'}}>
                      <button style={{marginRight: '5px'}} className="button"
                              onClick={() => setMinimalFinanceIpoteka((value: any) => Number(value) + 500000)}>+</button>
                      <button className="button"
                              onClick={() => setMinimalFinanceIpoteka((value: any) => Number(value) - 500000)}>-</button>
                  </div>
              </div>

                    <div style={{display: 'flex'}}>
                  <div style={{
                      marginTop: 'auto',
                      marginRight: '5px',
                      background: '#ff3d00',
                      width: '35px',
                      height: '35px',
                      borderRadius: '5px'
                  }}/>
                  <div style={{display: 'flex', flexDirection: 'column', marginRight: '5px'}}>
                      <label style={{fontSize: '14px'}}>Сумма первого взноса ипотеки и все расходы + услуги</label>
                      <input className='input' type="number" value={criticalFinance}
                             onInput={(event: any) => setCriticalFinance(Number(event.target.value))}/>
                  </div>


                  <div style={{marginTop: 'auto'}}>
                      <button style={{marginRight: '5px'}} className="button"
                              onClick={() => setCriticalFinance((value: any) => Number(value) + 500000)}>+</button>
                      <button className="button"
                              onClick={() => setCriticalFinance((value: any) => Number(value) - 500000)}>-</button>
                        </div>
              </div>
            </span>

                <span className="bg">
            <button className="button-reset" onClick={handlerResetCalcPercentFromSumIpoteka}> Сбросить расчет</button>
                <label>Сумма</label>
              <input className='input' type="number" value={stateBaseSum}
                     onInput={(event: any) => setStateBaseSum(event.target.value)}/>
                <br/>

                <label>% от суммы</label>
                   <input className='input' type="number" value={statePercentFromSumFeatureIpoteki}
                          onInput={(event: any) => setStatePercentFromSumFeatureIpoteki(event.target.value)}/>

                <p> {statePercentFromSumFeatureIpoteki | 0}% от {stateBaseSum | 0} руб.</p>
                <p>Итого: {(stateBaseSum / 100) * statePercentFromSumFeatureIpoteki} руб.</p>----3
            </span>
                <span className="bg ">
                <CardPaymentsDates/>
                    {/*4*/}
            </span>
                <span className=" bg">
                 5
            </span>
                <span className="big bg">
                    <h3 style={{textAlign: 'center'}}>Календарь</h3>
                    <Calendar onChange={onChange} value={value}/>
                    {/*6*/}
            </span>
                <div className="bg big">
                    <h3 style={{textAlign: 'center'}}>График крупных расходов</h3>
                    <ChartPaymentsCost/>
                    {/*7*/}

                </div>
                <span className=" bg bg-9">
                8
            </span>
                <span className="big bg ">
                9
            </span>
                <span className="tall bg bg-11">
                10
            </span>
                <span className="bg bg-12">
                11
            </span>
                <span className="bg">
                12
            </span>
                <span className="bg">
                13
            </span>
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
