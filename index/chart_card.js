import { html, } from '../js/web.js'
import { Chart, Modal } from '../js/cmp.js'

export let ChartCard = () => html`
<div class="card m-1 h-100">
    <div class="card-header">Chart</div>
    <div class="card-body">
        <button
            class="btn btn-primary m-1"
            onClick=${() => Modal.show({
                title: 'Chart example',
                size: 'modal-xl',

                content: html`<${Chart}

                    type=${'bar'}

                    data=${({
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],

                        datasets: [{
                            label: '# of Votes',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }],
                    })}

                    options=${({
                        scales: {
                            y: { beginAtZero: true }
                        }
                    })}

                />`,

            })}
        >show</button>
    </div>
    <div class="card-footer h6 small fst-italic">
        uses Chart.js library
    </div>
</div>`
