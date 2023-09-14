import React, { useEffect, useState } from "react";
import { CartItems } from "../services/CartService";
import {  Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import Container from "./Container";
import ShippingInfo from "./ShippingInfo";

const Checkout = () => {
  const [activeTabValue, setActiveTabValue] = useState("shipping")

  useEffect(() => {
    const cartObservable = CartItems.subscribe((cartItems) => {
      console.log(cartItems);
    });
    return () => cartObservable.unsubscribe();
  }, []);

  const handleShippingCallBack = (data) => {
    console.log(data);
  }

  return (
    <>
      <Container className="flex flex-wrap lg:h-screen">
        <Tabs value={activeTabValue} className="w-full">
          <TabsHeader>
              <Tab value="shipping" onClick={() => setActiveTabValue("shipping")}>
                Shipping
              </Tab>
              <Tab value="payment" onClick={() => setActiveTabValue("shipping")}>
                Payment
              </Tab>
              <Tab value="confirmation" onClick={() => setActiveTabValue("shipping")}>
                Confirmation
              </Tab>
          </TabsHeader>
          <TabsBody>
              <TabPanel value="shipping" className="flex justify-between p-2 py-8">
                 <ShippingInfo shippingCallback={handleShippingCallBack}/>
              </TabPanel>
              <TabPanel value="payment">
                Payment Content
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
