//  * ATRIBUTOS SAO VARIAVEIS DENTRO DE UMA CLASSE
//  * MÉTODOS SÃO OS MESMO QUE FUNÇÕES(COM ALGUMAS), PORÉM ESTAO DENTRO DE CLASSES.
//  * CLASSE = CONJUNTO DE ATRIBUTOS E MÉTODOS.
//  * O .this REFERENCIA ATRIBUTOS E MÉTODOS
// O OBJETO REPRESENTA ESSA CLASSE.
class CalcController {
    constructor() {

        this.operation = [];
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._locale = 'pt-BR'
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();


    }

    initialize() {

        this.setDisplayDateTime();

        setInterval(() => {

            this.setDisplayDateTime();
        }, 1000);

    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });

    }

    clearAll() {

        this._operation = [];

    }

    clearEntry() {

        this._operation.pop();

    }

    getLastOperation() {

        return this._operation[this._operation.length - 1];
    }

    setLastOperation() {
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) {

        return (['+', '-', '*', '/', '%'].indexOf(value) > -1)

    }

    pushOperation(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {


            this.calc();
            console.log(this._operation);
        }

    }

    calc() {
        let last = this._operation.pop();

        let result = eval(this._operation.join(""));

        this._operation = [result, last];

    }

    setLastNumberToDisplay() {

        let lastNumber;

        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }

        this.displayCalc = lastNumber;

    }

    addOperation(value) {

        console.log('A', this.getLastOperation());

        if (isNaN(this.getLastOperation())) {
            //string
            if (this.isOperator(value)) {

                this.setLastOperation(value);


            } else if (isNaN(value)) {

                console.log('outra coisa', value);
            } else {
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        } else {
            //number
            if (this.isOperator(value)) {
                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();

            }

        }



    }

    setError() {
        this.displayCalc = "Error";
    }

    execBtn(value) {
        switch (value) {

            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                // this.soma();
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                // this.soma();
            case 'multiplicacao':
                // this.multiplicacao();
                this.addOperation('*');
                break;

            case 'divisao':
                // this.divisao();
                this.addOperation('/');
                break;

            case 'porcento':
                // this.porcento();
                this.addOperation('%');
                break;

            case 'igual':

                break;
            case 'ponto':
                this.addOperation('.');

                break;

            case '0':
            case '1':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                // this.setError();
                break;


        }
    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {

                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn();

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });
    };

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, { day: "2-digit", month: "long", year: "numeric" });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }


    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }


    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set dataAtual(value) {
        this._dataAtual = value;
    }

}