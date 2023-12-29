const s = [65000, 26000, 175000, 25000, 0]
const result = s.reduce((acc: any, el: any) => {
    return acc + el
}, 0)

export const data = {
    labels: ['Съем Кв. и ЖКХ - 65 000 руб.', 'Ипотека Краснодар и ЖКХ - 26 000 руб.', 'Новая ипотека - 175 000 руб.', 'Доп. сумма ипотеки - 25 000 руб.', `Итого: ${result.toLocaleString('ru')} руб.`],
    datasets: [
        {
            label: 'Расход',
            data: s,
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
            borderWidth: 2,
        },
    ],
} as any