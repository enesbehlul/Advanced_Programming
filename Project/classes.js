class User {
    constructor(id, name, surname, password) {
        this.id = id
        this.name = name
        this.surname = surname
        this.accounts = new Map()
        console.log("user created");
    }
    addAccount(account){
        this.accounts.set(account.id, account)
    }
    spendMoney(account_id, action_id, sum, description, category){
        let spend = new Action(action_id, sum, "expence", description, category)
        if (this.accounts.has(account_id)) {
            this.accounts.get(account_id).add_action(spend)
            console.log("Spend success. New balance is:" + this.accounts.get(account_id).balance)
        }
        else
            console.log("No spend money, check infos.")
    }

    earnMoney(account_id, action_id, sum, description, category){
        let earn = new Action(action_id, sum, "income", description,category)
        if (this.accounts.has(account_id)) {
            this.accounts.get(account_id).add_action(earn)
            console.log("Income success. New balance is:" + this.accounts.get(account_id).balance)
        }
        else
            console.log("No earn money, check infos.")
    }

    compute_total_income(){
    	var total = 0
    	for(let i of this.accounts.values()) {
    	    for(let j of i.actions.values()) {
    	    	if(j.action_type == "income")
    		    total+=j.amount
                }
    	}
    	return total;
    }
    compute_total_expence(){
    	var total = 0
    	for(let i of this.accounts.values()) {
    	    for(let j of i.actions.values()) {
    	    	if(j.action_type == "expence")
    		    total+=j.amount
                }
    	}
    	return total;
    }
    compute_total_actions(){
    	var total = 0
    	for(let i of this.accounts.values()) {
    	    total += i.balance
    	}
    	return total;
    }

    remove_action(action_id, account_id){
        let money = this.accounts.get(account_id).actions.get(action_id).amount;
        let type = this.accounts.get(account_id).actions.get(action_id).action_type;
        this.accounts.get(account_id).actions.delete(action_id);
        if (type == 'income') {
            this.accounts.get(account_id).balance -= money;
        }
        else
            this.accounts.get(account_id).balance += money;
    }

    toString() {
        return this.id + " " + this.name + " " + this.surname
    }
}
class Account{
    constructor(id, name, tur){
        this.id = id
        this.name = name
        this.tur = tur
        this.balance = 0
        this.actions = new Map()
        console.log("Account created.");
    }
    add_action(action){
        this.actions.set(action.id, action)
        if (action.action_type == "income")
            this.balance += action.amount
        else
            this.balance -= action.amount
    }
}
class Action{
    constructor(id,amount, action_type, description, category){
        this.id = id
        this.amount = amount
        this.action_type = action_type
        this.percentage = -1
        this.description = description
        this.category = category
    }
    calcPercentage(totalIncome){
        if(totalIncome > 0 ){
            this.percentage = Math.round( (this.value / totalIncome) * 100);
        }else{
            this.percentage = -1;
        }
    }
    getPercentage(){
        return this.percentage;
    }
}

var dummyUser = new User(1, "Ahmet", "AK","123");
dummyUser.addAccount(new Account(1, "Banka", "Mevduat"));
dummyUser.spendMoney(1,1,15, "Dinner", "Food");
dummyUser.spendMoney(1,2,5, "Metrobus", "Transportation");
dummyUser.spendMoney(1,3,5, "Breakfast", "Food");
dummyUser.spendMoney(1,4,20, "Cinema", "Fun");
dummyUser.earnMoney(1,5,75, "Weekly allowance", "");
var users = new Map();
users.set(dummyUser.id, dummyUser);
var loginUsers = []
readUserData(loginUsers);

function addAction(){
    //textfield degerlerinin degiskenlere atanmasi
    var type = document.querySelector(DOMstrings.inputType).value;
    var description = document.querySelector(DOMstrings.inputDescription).value;
    var value = document.querySelector(DOMstrings.inputValue).value;
    var category = document.querySelector(DOMstrings.inputCategory).value;
    //clear textfield
    document.querySelector(DOMstrings.inputValue).value = ""
    document.querySelector(DOMstrings.inputDescription).value = ""
    document.querySelector(DOMstrings.inputCategory).value = ""

    let err = document.getElementById("error");
    if (description != "" && value != "" && category != "") {
        //yeni bir id uretme, gelir ve giderler icin
        var newActionId = user.accounts.get(1).actions.size + 1;
        while(true){
            if (!user.accounts.get(1).actions.has(newActionId)) {
                if (type == "income") {
                    user.earnMoney(1,newActionId, parseInt(value, 10), description, '')
                    break;
                }
                else{
                    user.spendMoney(1,newActionId, parseInt(value, 10), description, category)
                    break;
                }
            }
            else
                newActionId += 1;
        }
        //ekranin guncellenmesi
        displayBudget();
        updateIncomeAndExpenceList()
        err.innerText = "";
    } else {
        err.innerText = "Please fill the blanks";
    }
    drawPie();
}

function updateIncomeAndExpenceList(){

    var html,newHtml,element;

    const elements = document.getElementsByClassName("item clearfix");

    while (elements.length > 0) elements[0].remove();

    for(let i of user.accounts.values()){
        for(let j of i.actions.values()){
            if(j.action_type === 'income'){
                element = DOMstrings.incomeContainer;
                html='<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"> %value%</div><div class="item__delete"><button id="%id%" class="item__delete--btn" onclick="del(this.id)">x</button></div></div></div>'

            }else if(j.action_type === 'expence'){
                element = DOMstrings.expensesContainer;
                html='<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"> %value%</div><div class="item__delete"><button id="%id%" class="item__delete--btn" onclick="del(this.id)">x</button></div></div></div>'
            }

            // Replace the placeholder text with some actual data,
            newHtml = html.replace(/%id%/g, j.id);
            newHtml = newHtml.replace('%description%', j.description +"&emsp;&emsp;&emsp;<b>"+j.category+"</b>");
            newHtml = newHtml.replace('%value%', j.amount+" ₺");

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        }
    }
    displayBudget();
}

var DOMstrings={
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputCategory: '.add__category', //bunu ben ekledim
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container:'.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title'
};
var user;
function managementScreen(id, pass){
    for(let i of loginUsers){
        if (i[0] == id && i[1] == pass) {
            user = users.get(parseInt(id,10));
            giris.innerHTML = a;
            userInfo.innerText += user.name + " " + user.surname;
            displayMonth();
            displayBudget();
            updateIncomeAndExpenceList();
            drawPie()
            console.log("Login success.");
            return;
        }
    }
    console.log("wrong id or password");
}

function displayMonth(){
    var now , year,month,months;

    now = new Date();

    year = now.getFullYear();
    months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    month = now.getMonth();

    console.log(document.querySelector(DOMstrings.dateLabel).textContent);
    document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
}

function displayBudget(){//gelir - gider ne kadar
    var type;
    var budget = user.compute_total_actions();
    budget > 0 ? type = 'inc' : type = 'exp';

    document.querySelector(DOMstrings.budgetLabel).textContent = "Budget: "+user.compute_total_actions()+" ₺";
    document.querySelector(DOMstrings.incomeLabel).textContent = user.compute_total_income()+" ₺";
    document.querySelector(DOMstrings.expensesLabel).textContent = user.compute_total_expence()+" ₺";

    //Gelirin yuzde kaci gider...
    percentage = Math.round((user.compute_total_expence() / user.compute_total_income()) * 100)
    if(percentage > 0){
        document.querySelector(DOMstrings.percentageLabel).textContent =  percentage + '%';
    }else{
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
    }
}

//kullanici adi ve sifrenin txt dosyasindan okunmasi
function readUserData(loginUsers) {
    fetch("https://raw.githubusercontent.com/enesbehlul/Advanced_Programming/master/Project/sifre.txt")
        .then(r => r.text()).then(x => loginUsers.push(x.split("\n")));
}

function drawPie(){
    document.getElementById("container").innerText = '';
    anychart.onDocumentReady(function() {
    var categories = new Map()
    var data = [];
    for(let i of user.accounts.values()){
        let totalC = 0;
        for(let j of i.actions.values()){
            if (j.action_type != "income" && !categories.has(j.category)) {
                categories.set(j.category, j.amount);
            } else if (j.action_type != "income" && categories.has(j.category)) {
                totalC = categories.get(j.category)
                totalC += j.amount
                categories.set(j.category, totalC);
            }
        }
    }
    // set the data
    for (let i of categories.keys()){
        data.push({x: i, value: categories.get(i)})
    }
    console.log(data)
    // create the chart
    var chart = anychart.pie();

    // set the chart title
    chart.title("The rate of expenses.");

    // add the data
    chart.data(data);

    // sort elements
    chart.sort("desc");

    // set legend position
    chart.legend().position("right");
    // set items layout
    chart.legend().itemsLayout("vertical");

    // display the chart in the container
    chart.container('container');
    chart.draw();

    });
}

function del(id){
    user.remove_action(parseInt(id), 1);
    updateIncomeAndExpenceList();
    displayBudget();
    drawPie();
}
