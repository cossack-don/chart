import {Doughnut} from "react-chartjs-2";
import {optionsPaymentsCost} from "./options";
import {data} from "./data";

export const ChartPaymentsCost = () => {

    return (
        <div style={{width: '100%', height: 'auto'}}>
            <Doughnut
                options={optionsPaymentsCost}
                data={data}
            />
        </div>
    )
}