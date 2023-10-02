import {
  Button,
  Card,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from "@material-tailwind/react";
import React, { useReducer, useState } from "react";
import {
  AMERICANEXPRESS,
  OTHERCARDS,
  EXPIRYDATE,
  CVC,
  CARDARR,
  CARDICON,
} from "../../utils/constant";
import MaskedInput from "react-text-mask";
import {
  stripeCardNumberValidation,
  stripeCardExpirValidation,
  textWithSpacesOnly,
  minLength,
} from "../../utils/validations";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const reducer = (state, action) => {
  switch (action.type) {
    case "card":
      return { ...state, card: action.data };
    case "expiry":
      return { ...state, expiry: action.data };
    case "securityCode":
      return { ...state, securityCode: action.data };
    case "cardHodler":
      return { ...state, cardHodler: action.data };
    case "cleanState":
      return { ...action.data };
    default:
      return state;
  }
};

function findDebitCardType(cardNumber) {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    DINERS_CLUB: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
    JCB: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/,
  };
  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) return card;
  }
  return "";
}

const PaymentInfo = (props) => {
  const [error, setError] = useState({});
  const [cardType, setCardType] = useState();
  const [paymentType, setPaymentType] = useState("DEBIT_CREDIT");
  const [state, dispatch] = useReducer(reducer, {
    card: "",
    expiry: "",
    securityCode: "",
    cardHodler: "",
  });

  const handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "card":
        setCardType(findDebitCardType(value));
        errorText = stripeCardNumberValidation(value);
        setError({ ...error, cardError: errorText });
        break;
      case "cardHodler":
        errorText = value === "" ? "Required" : textWithSpacesOnly(value);
        setError({ ...error, cardHodlerError: errorText });
        break;
      case "expiry":
        errorText =
          value === "" ? "Required" : stripeCardExpirValidation(value);
        setError({ ...error, expiryError: errorText });
        break;
      case "securityCode":
        errorText = value === "" ? "Required" : minLength(3)(value);
        setError({ ...error, securityCodeError: errorText });
        break;
      default:
        break;
    }
  };

  const handleInputData = (e) => {
    console.log("IS THIS HANDLE INPUT METHOD CALLED???");
    dispatch({ type: e.target.name, data: e.target.value });
  };

  const handleBlur = (e) => {
    console.log("IS THIS BLUR METHOD CALLED???");
    handleValidations(e.target.name, e.target.value);
    setTimeout(() => {
      const regEx = ["37", "34"].includes(
        state && state.card.split("").splice(0, 2).join("")
      )
        ? AMERICANEXPRESS
        : OTHERCARDS;
      console.log(regEx);
      console.log(state);
    });
  };

  const checkErrorBeforeSave = () => {
    let errorValue = {};
    let isError = false;
    Object.keys(state).forEach(async (val) => {
      if (state[val] === "") {
        errorValue = { ...errorValue, [`${val + "Error"}`]: "Required" };
        isError = true;
      }
    });
    setError(errorValue);
    return isError;
  };

  const handleSave = (e) => {
    e.preventDefault();
    let errorCheck = checkErrorBeforeSave();
    if (!errorCheck) {
      props.paymentCallback({ ...state, cardType });
      dispatch("cleanState", {
        card: "",
        expiry: "",
        securityCode: "",
        cardHodler: "",
      });
    }
  };

  return (
    <>
      <div className="flex justify-center w-full gap-10 flex-col lg:flex-row">
        <Card
          color="transparent"
          shadow={false}
          className="lg:p-12 p-2 flex justify-center"
        >
          <Typography variant="h4" className="text-center mb-4 text-black">
            Payment
          </Typography>
          <List>
            <ListItem
              className={
                "hover:bg-transparent focus:bg-transparent debit_credit_payment login_register_shadow p-2" +
                (paymentType === "DEBIT_CREDIT"
                  ? " border border-blue-500 border-2"
                  : "")
              }
              ripple={false}
            >
              <label
                htmlFor="credit-or-debit-card"
                className="flex w-full cursor-pointer items-center px-3 py-2 flex-col"
              >
                <ListItemPrefix className="mr-3 hover:bg-none flex w-full">
                  <Radio
                    onChange={() => setPaymentType("DEBIT_CREDIT")}
                    value={paymentType}
                    checked={paymentType === "DEBIT_CREDIT"}
                    name="payment-option"
                    id="credit-or-debit-card"
                    ripple={false}
                    className="hover:before:opacity-0"
                    label={
                      <Typography
                        variant="h4"
                        className="text-center text-black"
                      >
                        Credit or Debit card
                      </Typography>
                    }
                  />
                </ListItemPrefix>
                <form
                  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                  onSubmit={handleSave}
                >
                  <div className="mb-4 flex flex-col">
                    <div className="relative">
                      <MaskedInput
                        mask={
                          ["37", "34"].includes(
                            state && state.card.split("").splice(0, 2).join("")
                          )
                            ? AMERICANEXPRESS
                            : OTHERCARDS
                        }
                        guide={false}
                        placeholderChar={"\u2000"}
                        name="card"
                        required
                        value={state.card}
                        onChange={handleInputData}
                        onBlur={handleBlur}
                        render={(ref, props) => (
                          <Input
                            inputRef={ref}
                            label="Card Number"
                            value={state.card}
                            {...props}
                          />
                        )}
                      />
                      {(!error || !error.cardError) &&
                        CARDARR.includes(cardType) && (
                          <img
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                            }}
                            src={CARDICON[cardType]}
                            alt="card"
                            width="50px"
                            height="33px"
                          />
                        )}
                      <span className="flex justify-start text-left input_field_error">
                        {error &&
                          error.cardError &&
                          error.cardError.length > 1 && (
                            <p className="text-red text-sm font-medium">
                              ⚠ {error.cardError}
                            </p>
                          )}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4 flex flex-col">
                    <div>
                      <Input
                        name="cardHodler"
                        required
                        value={state.cardHodler}
                        onChange={handleInputData}
                        onBlur={handleBlur}
                        label="CardHolder's Name"
                      />
                      <span className="flex justify-start text-left input_field_error">
                        {error &&
                          error.cardHodlerError &&
                          error.cardHodlerError.length > 1 && (
                            <p className="text-red text-sm font-medium">
                              ⚠ {error.cardHodlerError}
                            </p>
                          )}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4 flex flex-row gap-4">
                    <div className="w-1/2 expiry_date_input">
                      <MaskedInput
                        mask={EXPIRYDATE}
                        guide={false}
                        name="expiry"
                        required
                        placeholderChar={"\u2000"}
                        value={state.expiry}
                        onChange={handleInputData}
                        onBlur={handleBlur}
                        render={(ref, props) => (
                          <Input
                            inputRef={ref}
                            label="Expiry Date (MM/YY)"
                            value={state.expiry}
                            {...props}
                          />
                        )}
                      />
                      <span className="flex justify-start text-left input_field_error">
                        {error &&
                          error.expiryError &&
                          error.expiryError.length > 1 && (
                            <p className="text-red text-sm font-medium">
                              ⚠ {error.expiryError}
                            </p>
                          )}
                      </span>
                    </div>
                    <div className="w-1/2 expiry_date_input">
                      <MaskedInput
                        mask={CVC}
                        guide={false}
                        name="securityCode"
                        required
                        placeholderChar={"\u2000"}
                        value={state.securityCode}
                        onChange={handleInputData}
                        onBlur={handleBlur}
                        render={(ref, props) => (
                          <Input
                            inputRef={ref}
                            label="Secuirty Code"
                            value={state.securityCode}
                            {...props}
                          />
                        )}
                      />
                      <span className="flex justify-start text-left input_field_error">
                        {error &&
                          error.securityCodeError &&
                          error.securityCodeError.length > 1 && (
                            <p className="text-red text-sm font-medium">
                              ⚠ {error.securityCodeError}
                            </p>
                          )}
                      </span>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="mt-6"
                    fullWidth
                    onClick={handleSave}
                  >
                    Submit
                  </Button>
                </form>
              </label>
            </ListItem>
            <ListItem className={"hover:bg-transparent focus:bg-transparent debit_credit_payment login_register_shadow p-2 mt-4" +  (paymentType === 'PAYPAL' ? ' border border-blue-500 border-2' : '')} ripple={false}>
              <label
                htmlFor="paypal-payment"
                className="flex w-full cursor-pointer items-center px-3 py-2 flex-col"
              >
                <ListItemPrefix className="mr-3 hover:bg-none flex w-full justify-between">
                  <Radio
                    onChange={() => setPaymentType('PAYPAL')}
                    value={paymentType}
                    checked={paymentType === 'PAYPAL'}
                    name="payment-option"
                    id="paypal-payment"
                    ripple={false}
                    className="hover:before:opacity-0"
                    labelProps={{'className': 'flex w-full'}}
                    label={
                        <Typography
                          variant="h4"
                          className="text-center text-black"
                        >
                          Paypal
                        </Typography>
                    }
                  />
                  <div className="flex">
                    <img
                      className="h-12 rounded-lg object-cover object-center"
                      src="/img/paypal_logo.png"
                      alt="nature"
                    />
                  </div>
                </ListItemPrefix>
                <div className="flex flex-col mt-6 w-full">
                  <PayPalScriptProvider options={{ clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID, currency: 'USD' }}>
                    <PayPalButtons
                      onApprove={(data) => {
                        console.log(data);
                      }}
                      onCancel={(data) => {
                        console.log(data);
                      }}
                      onInit={(data) => {
                        console.log(data);
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </label>
            </ListItem>
          </List>
        </Card>
      </div>
    </>
  );
};

export default PaymentInfo;
