let log = [];

function addSeparators(input) {
    let value = input.value;
    value = value.replace(/[^0-9]/g, '');
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (value.length > 5) {
        value = value.substring(0, 5) + '/' + value.substring(5);
    }
    input.value = value;
}

function calculate() {
    // Obtém a data inserida pelo usuário
    let dateStr = document.getElementById('date-input').value;

    // Converte a data para um objeto Date
    let [day, month, year] = dateStr.split('/');
    let date = new Date(year, month - 1, day);

    // Obtém o dia da semana da data inserida
    let weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    let weekday = weekdays[date.getDay()];

    // Calcula o número de dias entre a data inserida e a data atual
    let startDate = new Date("2023-03-14");
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    const delta = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));

    const deltaMod = (delta + 1) % 4;

    // Determina se é um dia de trabalho ou folga
    let output;

    if (deltaMod == 3) {
        output = `${dateStr} ${weekday} Primeiro dia de folga`;
    } else if (deltaMod == 0) {
        output = `${dateStr} ${weekday} Segundo dia de folga`;
    } else if (deltaMod == 1) {
        output = `${dateStr} ${weekday} Primeiro dia de trabalho`;
    } else {
        output = `${dateStr} ${weekday} Segundo dia de trabalho`;
    }

    document.getElementById('output').innerHTML = output;

    // Atualiza o log com a última pesquisa realizada
    log.unshift(output);
    if (log.length > 3) {
        log.pop();
    }
    updateLog();
}

function updateLog() {
    const ul = document.getElementById('log');
    ul.innerHTML = '';
    for (let i = 0; i < log.length; i++) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(log[i]));
        ul.appendChild(li);
    }
}