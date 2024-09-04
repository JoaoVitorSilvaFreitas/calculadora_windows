const lastOperationText = document.querySelector('#upper__screen-container');
const currentOperationText = document.querySelector('#lower__screen-container');
const buttons = document.querySelectorAll('.container__buttons button');

class Calculadora {
    constructor(lastOperationText, currentOperationText) {
        this.lastOperationText = lastOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    //Adicionar um texto para a tela da calculadora
    addDigit(digit) {
        //verificação dos pontos
        if (digit === "." && currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //Processar as operações da calculadora
    processOperation(operation) {
        //Checar se o current value está vazio.
        if (this.currentOperationText.innerText === '' && operation !== 'C') {
            //trocar a operação
            if (this.lastOperationText.innerText !== '') {
                this.changeOperation(operation)
            }
            return;
        }

        let operationValue;
        const previous = +this.lastOperationText.innerText.split(' ')[0];
        const current = +this.currentOperationText.innerText;
        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "←":
                this.deleteDigit();
                break;
            case "CE":
                this.deleteCurrentText();
                break;
            case "C":
                this.deleteAllText();
                break;
            case "=":
                this.equalOperator();
                break;
            default:
                return;
        }
    }
    //Trocar os valores da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //check if value is zero, if it is just add current value
            if (previous === 0) {
                operationValue = current;
            }

            // adicionar o valor atual para o previous
            this.lastOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = '';
        }


    }

    //Trocar operação
    changeOperation(operation) {
        const mathOperations = ['*', '/', '+', '-'];

        if (!mathOperations.includes(operation)) {
            return
        }

        this.lastOperationText.innerText = this.lastOperationText.innerText.slice(0, -1) + operation;
    }

    //Deletar ultimo digito
    deleteDigit() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //Deletar a tela do texto atual
    deleteCurrentText(){
        this.currentOperationText.innerText = '';
    }

    //Deletar a tela do texto atual e do passado
    deleteAllText(){
        this.currentOperationText.innerText = '';
        this.lastOperationText.innerText = '';
    }

    //Botão igual recebe a operação e a executa.
    equalOperator(){
        const operation = lastOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }

}

const calc = new Calculadora(lastOperationText, currentOperationText);

//Referenciando o cada botao
buttons.forEach((btn) => {
    //Adiciona o evento de click ao botao e adiciona um evento
    btn.addEventListener('click', (e) => {
        //recupera o valor do target clicado como texto
        const value = e.target.innerText;
        //verifica com o +value se é um numero ou operação
        if (+value >= 0 || value === '.') {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})