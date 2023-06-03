export const getpaymentClientSecret = async (id, amount) => {
  const url = "/api/payment";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ paymentMethodId: id, amount }),
  });

  if (res.status === 500) return { res, data: null };

  const data = await res.json();

  return { res, data };
};
