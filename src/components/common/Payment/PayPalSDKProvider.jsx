import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useEffect, useState } from 'react'

const PayPalSDKProvider = ({ children }) => {


  const addPaypalScript = () => {
    const script = document.createElement('script')
    script.src =
      'https://www.paypal.com/sdk/js?client-id=Afg0xZRAH-ud4duvymCZS7lCZ00Qi3erkP3pUt9mbTcPOsgMqJAXWCSZYV5r1TNI_tJ7rYH9zEQ9uB9x' 
      script.type = 'text/javascript'
      script.async = true 
      document.body.appendChild(script)
  }  
    useEffect(() => {
        addPaypalScript()
    }, []);

  const clientId =
    'Afg0xZRAH-ud4duvymCZS7lCZ00Qi3erkP3pUt9mbTcPOsgMqJAXWCSZYV5r1TNI_tJ7rYH9zEQ9uB9x'
  // Replace with your PayPal client ID

  return (
    <PayPalScriptProvider
      options={{ 'client-id': clientId, components: 'buttons' }}
    >
      {children}
    </PayPalScriptProvider>
  )
}

export default PayPalSDKProvider
