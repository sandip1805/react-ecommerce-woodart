import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React from "react";
import {
  AMERICANEXPRESS,
  OTHERCARDS,
  EXPIRYDATE,
  CVC,
  CARDARR,
  CARDICON,
} from "../../constant";
import MaskedInput from "react-text-mask";
import {
  stripeCardNumberValidation,
  stripeCardExpirValidation,
  textWithSpacesOnly,
  minLength,
} from "../../validations";

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
  const [error, setError] = React.useState({});
  const [cardType, setCardType] = React.useState();
  const [state, dispatch] = React.useReducer(reducer, {
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
          className="lg:p-12 p-6 login_register_shadow lg:mt-20 flex justify-center"
        >
          <Typography variant="h4" className="text-center mb-4 text-black">
            Payment
          </Typography>
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
                {(!error || !error.cardError) && CARDARR.includes(cardType) && (
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
                  {error && error.cardError && error.cardError.length > 1 && (
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
                  {error && error.expiryError && error.expiryError.length > 1 && (
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
                  {error && error.securityCodeError && error.securityCodeError.length > 1 && (
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
        </Card>
      </div>
    </>
  );
};

export default PaymentInfo;
