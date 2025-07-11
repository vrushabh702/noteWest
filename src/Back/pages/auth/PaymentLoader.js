import React, { Component } from 'react'
// import PaymentForm from './PaymentForm';
import PaymentForm from './PaymentForm';
import Loader from 'react-loader-spinner';

export default class PaymentLoader extends Component {


    constructor(props){
        super(props)
        this.state = {
          loaded: false
        }
    }

    componentWillMount(){
        // console.log(this.props.planCost);
        const that = this;
        let sqPaymentScript = document.createElement('script');
        //it is old code not use full 21 number line
        // sqPaymentScript.src = "https://js.squareup.com/v2/paymentform";

        //staging url for payment Square
        sqPaymentScript.src = "https://sandbox.web.squarecdn.com/v1/square.js";

        // production url for payment Square 
        // sqPaymentScript.src = "https://web.squarecdn.com/v1/square.js";
        sqPaymentScript.type = "text/javascript"
        sqPaymentScript.async = false;
        sqPaymentScript.onload = ()=>{that.setState({
          loaded: true
        })};
        document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
    }


    render() {

        return (
          this.state.loaded ?
            <PaymentForm
              paymentForm={ window.Square }
              getNonce={(token) => this.props.getNonce(token)}              
              planCost={this.props.planCost}   
              userData={this.props.userData}           
            />
            :
            <>
             {/* <div className="text-center">
                <Loader type="ThreeDots" color="#017EAD" height={100} width={100} timeout={10000}/>                    
            </div> */}
            </> 
        );
      }
}
