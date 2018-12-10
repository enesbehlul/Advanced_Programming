class User {
    constructor(id, name, surname) {
        this.id = id
        this.name = name 
        this.surname = surname
        this.accounts = new Map()
    }
    addAccount(account){
        this.accounts.set(account.id, account)
    }
    spendMoney(account_id, action_id, sum){
        let spend = new Action(action_id, sum, 1)
        if (this.accounts.has(account_id)) {
            this.accounts.get(account_id).add_action(spend)
            console.log("harcama yapildi. Yeni bakiye:" + this.accounts.get(account_id).balance)
        }
        else
            console.log("harcama yapilamadi. bilgileri kontrol ediniz")
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
    constructor(id,amount, action_type){
        this.id = id
        this.amount = amount
        if (action_type == 0)
            this.action_type = "income"
        else
            this.action_type = "expence"
    }
}