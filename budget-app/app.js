
let budgetController = (function () {

    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);   
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let calculateTotal = function(type) {
        let sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, desc, val) {
            let newItem, id, dataItem;

            dataItem = data.allItems[type];

            if (dataItem.length > 0) {
                id = dataItem[dataItem.length - 1].id + 1;
            } else {
                id = 0;
            }

            if (type === 'exp') {
                newItem = new Expense(id, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(id, desc, val);
            }

            dataItem.push(newItem);
            return newItem;
        },

        deleteItem: function(type, id) {
            let ids, index;

            ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function() {
            calculateTotal('exp');
            calculateTotal('inc');

            data.budget = data.totals.inc - data.totals.exp;

            if(data.totals.inc > 0 || data.totals.inc > data.totals.exp) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
        },

        calculatePercentages: function() {
            data.allItems.exp.forEach(function(cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentage: function() {
            let allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });

            return allPerc;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            };
        },
    };

})();

let uiController = (function () {

    let selectors = {
        inputType: document.querySelector('.add__type'),
        inputDescription: document.querySelector('.add__description'),
        inputValue: document.querySelector('.add__value'),
        addBtn: document.querySelector('.add__btn'),
        incomeContainer: document.querySelector('.income__list'),
        expenseContainer: document.querySelector('.expenses__list'),
        container: document.querySelector('.container'),
        budgetLabelValue: document.querySelector('.budget__value'),
        incomeLabelValue: document.querySelector('.budget__income--value'),
        expenseLabelValue: document.querySelector('.budget__expenses--value'),
        percentageLabelValue: document.querySelector('.budget__expenses--percentage'),
        expPercentLabelValue: '.item__percentage',
        dateLabel: '.budget__title--month',
    };

    let formatNumber = function(num, type) {
        let numSplit, int, dec;
        
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = numSplit[0];
        dec = numSplit[1];

        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    let nodeListForEach = function(list, callback) {
        for(let i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function () {
            return {
                type: selectors.inputType.value,
                description: selectors.inputDescription.value,
                value: parseFloat(selectors.inputValue.value),
            };
        },
        getSelectors: function () {
            return selectors;
        },

        addListItem: function (obj, type) {
            let html, element, newHtml;

            if (type === 'inc') {
                element = selectors.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix">' +
                    '<div class="item__value">%value%</div>' +
                    '<div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div></div></div>';
            } else if (type === 'exp') {
                element = selectors.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix">' +
                    '<div class="item__value">%value%</div>' +
                    '<div class="item__percentage">P</div>' +
                    '<div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div></div></div>';
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            element.insertAdjacentHTML('beforeend', newHtml);
        },

        clearInput: function () {
            selectors.inputDescription.value = '';
            selectors.inputValue.value = '';
            selectors.inputDescription.focus();
        },

        deleteListItem: function(selectId) {
            let el = document.getElementById(selectId);
            el.parentNode.removeChild(el);
        },

        displayBudget: function(obj) {

            obj.budget > 0 ? type = 'inc' : type = 'exp';

            selectors.budgetLabelValue.textContent = formatNumber(obj.budget, type);
            selectors.incomeLabelValue.textContent = formatNumber(obj.totalInc, 'inc');
            selectors.expenseLabelValue.textContent = formatNumber(obj.totalExp, 'exp');
            selectors.percentageLabelValue.textContent = obj.percentage + '%';
        },

        displayPercentages: function(percentages) {
            let fields = document.querySelectorAll(selectors.expPercentLabelValue);
            console.log(fields);

            nodeListForEach(fields, function(cur, i) {
                if(percentages[i] > 0) {
                    cur.textContent = percentages[i] + '%';
                } else {
                    cur.textContent = '---';
                }
            });  
        },

        displayMonth: function() {
            let now, year, month, months;
            now = new Date();
            year = now.getUTCFullYear();
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            month = now.getUTCMonth();

            document.querySelector(selectors.dateLabel).textContent = months[month] + ' ' + year;
        },

        changeType: function() {
            let fields = document.querySelectorAll(
                '.add__type' + ',' + '.add__description' + ',' + '.add__value');
            console.log(fields);
            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus');
            });

            selectors.addBtn.classList.toggle('red');
        }
    };

})();

let controller = (function (budgetCtrl, uiCtrl) {

    let selectors = uiCtrl.getSelectors();

    let setupEventListeners = function () {
        selectors.addBtn.addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        selectors.container.addEventListener('click', ctrlDeleteItem);

        selectors.inputType.addEventListener('change', uiCtrl.changeType);
    };

    let updatePercentage = function() {
        budgetCtrl.calculatePercentages();
        let percentages = budgetCtrl.getPercentage();
        uiCtrl.displayPercentages(percentages);
    };

    let updateBudget = function () {
        let budget;
        budgetCtrl.calculateBudget();
        budget = budgetCtrl.getBudget();
        uiCtrl.displayBudget(budget);
    };

    let ctrlAddItem = function () {
        let input, addItem;

        input = uiCtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            uiCtrl.clearInput();
            addItem = budgetCtrl.addItem(input.type, input.description, input.value);
            uiCtrl.addListItem(addItem, input.type);
            updateBudget();
            updatePercentage();
        } else if(input.description === "") {
            selectors.inputDescription.focus();
        } else if(isNaN(input.value) || input.value < 0) {
            selectors.inputValue.focus();
        }
    };

    let ctrlDeleteItem = function(event) {
        let itemId, splitId, type, Id;
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemId) {
            splitId = itemId.split('-');
            type = splitId[0];
            Id = parseInt(splitId[1]);
            budgetCtrl.deleteItem(type, Id);
            uiCtrl.deleteListItem(itemId);
            updateBudget();
            updatePercentage();
        }
    };

    return {
        init: function () {
            setupEventListeners();
            uiCtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1,
            });
            uiCtrl.displayMonth();
        },    
    };

})(budgetController, uiController);

controller.init();