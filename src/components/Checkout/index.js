import React, { useEffect, useState } from "react";
import { CartItems } from "../../services/CartService";
import {  Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import Container from "../Container";
import ShippingInfo from "./ShippingInfo";
import PaymentInfo from "./PaymentInfo";

const Checkout = () => {
  const [activeTabValue, setActiveTabValue] = useState("shipping");
  const [isAddressCompleted, setIsAddressCompleted] = useState(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  useEffect(() => {
    console.log(activeTabValue);
    console.log(isAddressCompleted);
    const cartObservable = CartItems.subscribe((cartItems) => {
      console.log(cartItems);
    });
    return () => cartObservable.unsubscribe();
  }, [activeTabValue, isAddressCompleted]);

  const handleShippingCallBack = (data) => {
    console.log(data);
    setActiveTabValue(JSON.parse(JSON.stringify("payment")));
    setIsAddressCompleted(true);
    document.getElementById('payment_tab').click();
    console.log((activeTabValue !== 'confirmation') && !isAddressCompleted && !isPaymentCompleted);
  }

  const handlePaymentCallBack = (data) => {
    console.log(data);
    setActiveTabValue(JSON.parse(JSON.stringify("confirmation")));
    setIsPaymentCompleted(true);
    document.getElementById('confirmation_tab').click();
  }

  return (
    <>
      <Container className="flex flex-wrap">
        <Tabs value={activeTabValue} className="w-full">
          <TabsHeader>
              <Tab value="shipping" onClick={() => setActiveTabValue("shipping")} id="shipping_tab">
                Shipping
              </Tab>
              <Tab disabled={(activeTabValue !== 'payment') && !isAddressCompleted} value="payment" onClick={() => setActiveTabValue("payment")} id="payment_tab">
                Payment
              </Tab>
              <Tab disabled={(activeTabValue !== 'confirmation') && !isAddressCompleted && !isPaymentCompleted} value="confirmation" onClick={() => setActiveTabValue("confirmation")} id="confirmation_tab">
                Confirmation
              </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value="shipping" className="flex justify-between p-2 py-8">
              <ShippingInfo shippingCallback={handleShippingCallBack}/>
            </TabPanel>
            <TabPanel value="payment">
              <PaymentInfo paymentCallback={handlePaymentCallBack}/>
            </TabPanel>
            <TabPanel value="confirmation">
              Confirmation Content
            </TabPanel>
          </TabsBody>
        </Tabs>
      </Container>
    </>
  );
};

export default Checkout;
