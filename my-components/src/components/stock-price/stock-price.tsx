import { Component, h, State, Element, Prop, Watch, Listen } from "@stencil/core"
import { API_KEY } from "../api/apiKey"
@Component({
  tag: 'js-stock-price',
  styleUrl: "./stock-price.css",
  shadow: true,
})

export class StockPrice {
  stockInput: HTMLInputElement;
  initialStockSymbol: string

  @Element() el: HTMLElement

  @State() price: Number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;

  @Prop({ mutable: true, reflect: true }) stockSymbol: string;
  @Watch('stockSymbol') stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue)
    }
    return
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value
    if (this.stockUserInput.trim().length > 0) {
      this.stockInputValid = true
    } else {
      this.stockInputValid = false
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    this.stockSymbol = this.stockInput.value;
    this.fetchStockPrice(this.stockSymbol)
  }


  componentDidLoad() {
    if (this.stockSymbol) {
      this.initialStockSymbol = this.stockSymbol
      this.stockUserInput = this.stockSymbol
      this.stockInputValid = true
      this.fetchStockPrice(this.stockSymbol)
    }
  }

  componentDidUpdate() {
    if (this.stockSymbol !== this.initialStockSymbol) {
      this.initialStockSymbol = this.stockSymbol
      this.fetchStockPrice(this.stockSymbol)
    }
  }



  @Listen('jsSymbolSelected', { target: 'body' })
  onStockSymbolSelected(event: CustomEvent) {
    console.log('received event ' + event.detail);
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail
      // this.fetchStockPrice(this.stockSymbol)
    }
  }

  fetchStockPrice(stockSymbol: string) {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Invalid')
        }
        return res.json();
      })
      .then(parsedRes => {
        if (!parsedRes["Global Quote"]['05. price']) {
          throw new Error('Invalid symbol')
        }
        this.error = null
        this.price = +parsedRes["Global Quote"]['05. price'];
      })
      .catch(err => {
        this.error = err.message
        console.log(err);
      })
  }

  hostData() {
    return {
      class: this.error ? 'error' : '',
      
    }
  }

  render() {
    let dataContent = <p>Please enter something</p>
    if (this.error) {
      dataContent = <p>{this.error} </p>
    }
    if (this.price) {
      dataContent = <p>Price: ${this.price}</p>
    }
    return [
      <form onSubmit={this.onSubmit.bind(this)}>
        <input id="stock-symbol"
          ref={el => this.stockInput = el}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)} />
        <button type="submit" disabled={
          !this.stockInputValid}>
          <slot></slot>
        </button>
      </form>,
      <div>
        {dataContent}
      </div>
    ]
  }
}