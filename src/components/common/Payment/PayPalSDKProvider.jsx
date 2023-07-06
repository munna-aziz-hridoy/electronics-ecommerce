import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const PayPalSDKProvider = ({ children }) => {

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
