import { useEffect, useState } from "react"
import { userData } from "../client/ViewDetail";
import Loader from "react-loader-spinner";

const PaymentForm = (props) => {
  // sandbox
  const appId = 'sandbox-sq0idb-iZkr2npf3e6_2NqpbtlRjA';
  const locationId = 'L4V566ZZ9TRNM';
//  production
  // const appId = 'sq0idp-GT5i2-Nm9izaREH7GSbWaw';
  // const locationId = 'L7QSK61QEQKJN';
  let payments;
  // let card;
  const [cards, setCard] = useState({})
  const [loader, setLoader] = useState(false)
  const [state, setState] = useState({
    cardBrand: "",
    nonce: undefined,
  })

  const [buyerData,setBuyerData] = useState(props.userData)

  async function initializeCard(payments) {
    setLoader(true)
    const card = await payments.card();
    setCard(card)
    await card.attach('#card-container');
    setLoader(false)
    return card;
  }
  async function  createPayment(token, verificationToken) {
    const body = JSON.stringify({
      locationId : locationId,
      sourceId: token,
      source_id: token,
      verificationToken : verificationToken,
      idempotencyKey: window.crypto.randomUUID(),
      idempotency_key: window.crypto.randomUUID(),
      amount_money: {
        amount: 1.00,
        currency: "USD"
      }
    });

    const paymentResponse = await fetch('https://connect.squareupsandbox.com/v2/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer EAAAl0ql7vD7uGt_gPKnvEuJHkT9XE8OdZVGDrH1oGbN_NLaltNrfnzgwLWN_lhe',
      },
      body,
    });
    
    if (paymentResponse.ok) {
      return paymentResponse.json();
    }

    const errorBody = await paymentResponse.text();
    throw new Error(errorBody);
  }
  async function tokenize(paymentMethod) {
    const tokenResult = await paymentMethod.tokenize();
    if (tokenResult.status === 'OK') {
      return tokenResult.token;
    } else {
      let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
      if (tokenResult.errors) {
        errorMessage += ` and errors: ${JSON.stringify(
          tokenResult.errors,
        )}`;
      }

      throw new Error(errorMessage);
    }
  }

  // Required in SCA Mandated Regions: Learn more at https://developer.squareup.com/docs/sca-overview
  async function verifyBuyer(payments, token) {
    const buyersdata = {
      ...buyerData,
      billingContact: {
        ...buyerData.billingContact,
        givenName: buyerData.billingContact.givenName.split(" ")[0],
      },
    } 

    const verificationDetails = buyersdata;
    // const verificationDetails = {
    //   billingContact: {
    //     givenName: 'kamlesh',
    //     familyName: 'dhamandiya',
    //     email: 'kamlesh74420@gmail.com',
    //     phone: '1234567890',
    //     addressLines: ['123 Main Street'],
    //     city: 'London',
    //     state: 'LND',
    //     countryCode: 'US',
    //   },
    //   amount: props.planCost,
    //   currencyCode: 'USD',
    //   intent: 'CHARGE',
    // };

    const verificationResults = await payments.verifyBuyer(
      token,
      verificationDetails,
    );
    // console.log(verificationResults);
    return verificationResults.token;
  }

  async function handlePaymentMethodSubmission(event) {
    event.preventDefault();
    const cardButton = document.getElementById('kt_sign_up_submit');
    try {
      // disable the submit button as we await tokenization and make a payment request.
      cardButton.disabled = true;
      // console.log("cards",cards);
      const token = await tokenize(cards);
      // console.log("token",token);
      // const verificationToken = await verifyBuyer(payments, token);
      // console.log(verificationToken);
      props.getNonce(token);
      setState({
          nonce: token
        });
        cardButton.disabled = false;
    } catch (e) {
      cardButton.disabled = false;
      console.error(e.message);
      alert(e.message);
    }
  }

  useEffect(async () => {
    if (!props.paymentForm) {
      throw new Error('Square.js failed to load properly');
    }

    // let payments;
    try {
      payments = props.paymentForm.payments(appId, locationId);
    } catch {
      const statusContainer = document.getElementById(
        'payment-status-container',
      );
      statusContainer.className = 'missing-credentials';
      statusContainer.style.visibility = 'visible';
      return;
    }

    // let card;
    try {
      const card = await initializeCard(payments);
      setCard(card)
    } catch (e) {
      console.error('Initializing Card failed', e);
      return;
    }
  },[])

  return (
    <div>
      <div
        id="prime-card-error"
        className="fv-plugins-message-container invalid-feedback mt-0 mb-6"
      ></div>
      {loader ? (
        <div className="text-center">
          <Loader
            type="ThreeDots"
            color="#017EAD"
            height={50}
            width={50}
            timeout={10000}
          />
        </div>
      ) : (
        <div className="fv-row mb-7">
        <label className="align-items-center fs-6 text-dark fw-bold form-label mb-2">
          <span className="required">Name On Card</span>
        </label>
        <input
          type="text"
          className="form-control form-control-solid"
          placeholder="Max Doe"
          name="card_name"
          value={buyerData.billingContact.givenName}
          onChange={(e) => {
            const full_name = e.target.value.split(" ");
            setBuyerData((prev) => {
              return {
                ...prev,
                billingContact: {
                  ...prev.billingContact,
                  givenName: e.target.value,
                  familyName: full_name[1] ?? "",
                },
              };
            });
          }}
        />
      </div>
      )}
      
      <div id="card-container"></div>
      {!loader && <div className="text-center">
        <button
          type="button"
          id="kt_sign_up_submit"
          className="btn btn-lg btn-primary"
          onClick={handlePaymentMethodSubmission}
        >
          <span className="indicator-label">Submit</span>
          <span className="indicator-progress">
            Please wait...
            <span className="spinner-border spinner-border-sm align-middle ms-2" />
          </span>
        </button>
      </div>}
      
      <div id="payment-status-container"></div>
    </div>
  );
}

export default PaymentForm;