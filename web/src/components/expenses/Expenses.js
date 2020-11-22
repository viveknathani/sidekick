import React from 'react';
import './Expenses.css';

const CASH = 0, BANK = 1, EWALLET = 2;
const DEBIT = 0, CREDIT = 1;

function radioInput(radioName)
{
    const array = document.getElementsByName(radioName);
    for(let i = 0; i < array.length; i++)
    {
        if(array[i].checked)
        {
            return array[i];
        }
    }
}

function getID(id) { return document.getElementById(id); }

const commonHeaders  =  { 'Content-Type': 'application/json' }

class Expenses extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            summary: { cash: 0, bank: 0, ewallet : 0},
            transactions: []
        }
        this.getAllData = this.getAllData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteButton = this.deleteButton.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    getAllData()
    {
        fetch(`/expenses/summary/${this.props.id}`, {
            method:'GET',
            headers: commonHeaders
        }).then((res) => res.json())
          .then((data) => {
              if(data.length !== 0)
              {
                  this.setState({
                      summary: {
                          cash: data[0].cash, bank: data[0].bank, ewallet: data[0].ewallet
                      },
                      transactions: this.state.transactions
                  })
              }
          });

        fetch(`/expenses/transactions/${this.props.id}`, {
            method:'GET',
            headers: commonHeaders
        }).then((res) => res.json())
          .then((data) => {
              if(data.length !== undefined)
              {
                  let newTransactionsArray = []

                  for(let i = 0; i < data.length; i++)
                  {
                      let object = {
                          transaction_id: data[i].transaction_id,
                          amount: data[i].transaction_value,
                          ttype: data[i].transaction_type,
                          medium: data[i].transaction_mode,
                          desc: data[i].description 
                      }
                      newTransactionsArray.push(object);
                  }
                  console.log(data);
                  console.log(newTransactionsArray);
                  this.setState({
                      summary: this.state.summary,
                      transactions: newTransactionsArray
                  })
              }
          });
    }

    show = (id) => { getID(id).style.display="block"; }
    hide = (id) => { getID(id).style.display="none"; }

    componentDidMount()
    {
        this.getAllData();
    }

    handleSubmit()
    { 
        const newObject = {
            id : this.props.id,
            value : parseInt(getID("amount").value),
            type : parseInt(radioInput("ttype").value),
            mode : parseInt(radioInput("medium").value),
            description : getID("desc").value
        }

        let amount = parseInt(getID("amount").value);
        let stateCash = this.state.summary.cash;
        let stateBank = this.state.summary.bank;
        let stateEwallet   = this.state.summary.ewallet;
        if(newObject.type === DEBIT) { amount = amount * -1; }
        if(newObject.mode === CASH) { stateCash = stateCash + amount; }
        if(newObject.mode === BANK) { stateBank = stateBank + amount; }
        if(newObject.mode === EWALLET) { stateEwallet = stateEwallet + amount; }

        const newSummaryObject = { id : this.props.id, 
                                   cash: stateCash, 
                                   bank: stateBank, 
                                   ewallet: stateEwallet, 
                                   total: stateCash + stateBank + stateEwallet };
        console.log(newSummaryObject);
        
        fetch('/expenses/transaction', {
            method: 'POST',
            headers: commonHeaders,
            body: JSON.stringify(newObject)
        }).then((res) => res.json()).then((data) => console.log(data));
        
        fetch('/expenses/summary', {
            method: 'POST',
            headers: commonHeaders,
            body: JSON.stringify(newSummaryObject)
        }).then((res) => res.json()).then((data) => console.log(data));

        window.location.reload();
    }

    deleteButton(tid)
    {
        for(let i = 0; i < this.state.transactions.length; i++)
        {
            console.log(tid);
            if(this.state.transactions[i].transaction_id === tid)
            {
                fetch('/expenses/transaction', {
                    method: 'DELETE',
                    headers: commonHeaders,
                    body: JSON.stringify({transaction_id: tid})
                }).then((res) => res.json()).then((data) => console.log(data));
                console.log('Deleting');

                let amount = this.state.transactions[i].amount
                let stateCash = this.state.summary.cash;
                let stateBank = this.state.summary.bank;
                let stateEwallet   = this.state.summary.ewallet;
                if(this.state.transactions[i].ttype === CREDIT) { amount = amount * -1; }
                if(this.state.transactions[i].medium === CASH) { stateCash = stateCash + amount; }
                if(this.state.transactions[i].medium === BANK) { stateBank = stateBank + amount; }
                if(this.state.transactions[i].medium === EWALLET) { stateEwallet = stateEwallet + amount; }                
                const newSummaryObject = { id : this.props.id, 
                    cash: stateCash, 
                    bank: stateBank, 
                    ewallet: stateEwallet, 
                    total: stateCash + stateBank + stateEwallet };
                fetch('/expenses/summary', {
                    method: 'POST',
                    headers: commonHeaders,
                    body: JSON.stringify(newSummaryObject)
                }).then((res) => res.json()).then((data) => console.log(data));
                break;
            }
        }
        window.location.reload();
    }

    render()
    {
        return(
            <div>
               <div id="exp_main">
                   <div id="exp_title">
                        <p>Expenses</p>
                   </div>
                   <div id="exp_summary">
                       <p id="exp_s_head">Summary</p>
                       <p>Cash : {this.state.summary.cash}</p>
                       <p>Bank : {this.state.summary.bank}</p>
                       <p>Ewallet : {this.state.summary.ewallet}</p>
                   </div>

                   <div id="exp_form">
                        <p id="exp_f_head">New transaction</p>
                        <label for="amount">Amount</label>
                        <input id="amount" name="amount"></input>

                        <label for="desc">Description</label>
                        <input id="desc" name="desc"></input>
                        
                        <div id="set_ttype">
                        <p>Transaction type</p>
                        <label for="debit">Debit</label>
                        <input type="radio" name="ttype" id="debit" value={DEBIT}></input>
                        <label for="credit">Credit</label>
                        <input type="radio" name="ttype" id="credit" value={CREDIT}></input>
                        </div>

                        <div id="set_medium">
                        <p>Transaction medium</p>
                        <label for="cash">Cash</label>
                        <input type="radio" name="medium" id="cash" value={CASH}></input>
                        <label for="bank">Bank</label>
                        <input type="radio" name="medium" id="bank" value={BANK}></input>
                        <label for="ewallet">Ewallet</label>
                        <input type="radio" name="medium" id="ewallet" value={EWALLET}></input>
                        </div>

                        <button type="submit" onClick={this.handleSubmit}>submit</button> 
                   </div>
                    <button id="show" href="#" onClick={() => { this.show("exp_popup")}}>show list</button>

                   <div id="exp_popup">
                        <p>Transaction list</p>
                        <table>
                            <tr>
                                <th>Index</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Medium</th>
                                <th>Delete</th>
                            </tr>
                            {this.state.transactions.map(
                               (transaction, index) => (
                                   <tr>
                                        <td>{index}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.desc}</td>
                                        <td>{transaction.ttype}</td>
                                        <td>{transaction.medium}</td>
                                        <td><button onClick={() => this.deleteButton(transaction.transaction_id)}>Delete</button></td>
                                   </tr>
                               )
                           )}

                        </table>
                       <a href="#" onClick={() => { this.hide("exp_popup")}}>Close</a>
                   </div>
               </div>
            </div>
        )
    }
}

export default Expenses;