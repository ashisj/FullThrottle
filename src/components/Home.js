import React,{ Component } from "react";
import History from "./History";
import Result from "./Result";
import Loader from './Loader';
import Error from './Error';
import axios from "axios";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      amount: "500",
      duration: "6",
      result: {},
      loading: false,
      error: false,
      history: [{"amount":"500","duration":"6"}]
    }
  }

  handleChange = async (e) => {
      await this.setState({
          [e.target.id] : e.target.value,
      });
      const {amount,duration} = this.state;
      this.getAndUpdateInterest(amount,duration);
  }

  clickFromHistory = async (amount,duration) => {
    await this.setState({
        amount,
        duration
    });
    this.getAndUpdateInterest(amount,duration);
  }

  getAndUpdateInterest = (amount,duration) => {
    const {history} = this.state;
    this.loading();
    axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${duration}`)
      .then(result => {
        history.unshift({
          amount,
          duration
        });
        this.setState({
          result: result.data,
          history
        });
        this.loadingSuccess()
        localStorage.setItem("history",JSON.stringify(history));
      })
  }

  loading = () => {
    this.setState({
      loading: true
    })
  }

  loadingSuccess = () => {
    this.setState({
      loading: false
    })
  }

  componentDidMount(){
    const {amount,duration} = this.state;
    const history = JSON.parse(localStorage.history);
    this.loading();
    axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${duration}`)
      .then(result => {
        this.setState({
          result: result.data,
          history
        });
        this.loadingSuccess();
      })
      .catch(err => {
        this.setState({
          error: true,
          history
        });
        this.loadingSuccess();
      })
  }
  render(){
    const {amount,duration,result,loading,error,history} = this.state;

    return(
      <>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <a className="navbar-brand" href="#">Loan Calculation</a>
        </nav>
        <History history={history} clickFromHistory = {this.clickFromHistory}/>
        <div className="main">
          <div className = "data-input">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="d-flex justify-content-center my-4">
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="amount"><b>Loan amount : </b>{amount}</label>
                    </div>
                    <div className="col-12">
                      <span className="font-weight-bold indigo-text mr-2 mt-1">500</span>
                      <input className="border-0" type="range" min="500" max="5000" id="amount" value={amount} onChange={this.handleChange}/>
                      <span className="font-weight-bold indigo-text ml-2 mt-1">5000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-6">
                <div className="d-flex justify-content-center my-4">
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="duration"><b>Loan Duration : </b>{duration}</label>
                    </div>
                    <div className="col-12">
                      <span className="font-weight-bold indigo-text mr-2 mt-1">6</span>
                      <input className="border-0" type="range" min="6" max="24" id="duration" value={duration} onChange={this.handleChange}/>
                      <span className="font-weight-bold indigo-text ml-2 mt-1">24</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="result">
            <Result result = {result}/>
          </div>
        </div>
        <Loader loading = {loading}/>
        <Error error = {error}/>
      </>
    );
  }
}

export default Home;
