const table = document.querySelector(".xyz");
const expenses = document.querySelector("#expenses");
const sum = document.querySelector("#sum");
const totalSumCell = document.querySelector(".total_sum");

const button = document.querySelector("#new_button");

const ctx = document.getElementById("myChart");
const chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: Array.from(document.querySelectorAll(".expenses")).map((item) => item.textContent),
        datasets: [
            {
                label: "Сумма расходов",
                data: Array.from(document.querySelectorAll(".sum")).map((item) => ~~item.textContent),
                borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

const updateChart = () => {
    const labels = Array.from(document.querySelectorAll(".expenses")).map((item) => item.textContent);
    const data = Array.from(document.querySelectorAll(".sum")).map((item) => ~~item.textContent);
    chart.data.datasets[0].data = data;
    chart.data.labels = labels;
    chart.update();
};

const updateTotalSum = () => {
    const sumCells = Array.from(document.querySelectorAll(".sum"));

    let totalSum = 0;

    sumCells.forEach((cell) => {
        const currentCellValue = Number.parseFloat(cell.textContent);
        totalSum += currentCellValue;
    });

    totalSumCell.textContent = totalSum;
};

button.addEventListener("click", () => {
    let removeButton = document.createElement("button");
    removeButton.textContent = "remove";

    let tableRow = document.createElement("tr");

    tableRow.innerHTML = `
        <td class="expenses">${expenses.value}</td>
        <td class="sum">${sum.value}</td>
        <td></td>
    `;

    removeButton.addEventListener("click", () => {
        tableRow.remove();
        updateTotalSum();
        updateChart();
    });

    tableRow.lastElementChild.appendChild(removeButton);
    table.appendChild(tableRow);

    updateTotalSum();
    updateChart();
});
