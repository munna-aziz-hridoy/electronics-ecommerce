import { createContext, useEffect, useState } from "react";
import useAuthStore from "@/store/auth";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    total_price: 0,
    total_products: 0,
  });

  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      const prevCartStr = localStorage.getItem("ec_cart");

      if (prevCartStr) {
        const prevCart = JSON.parse(prevCartStr);

        // console.log(prevCart);

        if (prevCart?.user?.id === user?.id) {
          setCart({ ...prevCart, user });
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (user && !cart?.user) {
      setCart((prev) => {
        return { user: user, ...prev };
      });
    }
  }, [user]);

  const addToCart = (product) => {
    setCart((prev) => {
      const { user, items } = prev;

      let newItems = [...items, { ...product, quantity: 1 }];

      newItems = newItems.map((item) => {
        const { price, ...rest } = item;

        let extra_price = 0;
        if (item?.extras) {
          extra_price = item.extras
            .map((extra) => extra.price)
            .reduce((a, b) => a + b);
        }

        return { ...rest, price, extra_price };
      });

      const prices = newItems
        .map((item) => item.price * item.quantity + item.extra_price)
        .reduce((a, b) => a + b);
      const quantities = newItems
        .map((item) => item.quantity)
        .reduce((a, b) => a + b);

      localStorage.setItem(
        "ec_cart",
        JSON.stringify({
          user,
          items: newItems,
          total_price: prices,
          total_products: quantities,
        })
      );

      return {
        user,
        items: newItems,
        total_price: prices,
        total_products: quantities,
      };
    });
  };

  const removeFromCart = (product) => {
    setCart((prev) => {
      const { user, items, total_price, total_products } = prev;

      const newItems = items.filter((item) => item.id !== product.id);

      const prices =
        newItems.length !== 0
          ? newItems
              .map((item) => item.price * item.quantity + item.extra_price)
              .reduce((a, b) => a + b)
          : 0;
      const quantities =
        newItems.length !== 0
          ? newItems.map((item) => item.quantity).reduce((a, b) => a + b)
          : 0;

      localStorage.setItem(
        "ec_cart",
        JSON.stringify({
          user,
          items: newItems,
          total_price: prices,
          total_products: quantities,
        })
      );

      return {
        user,
        items: newItems,
        total_price: prices,
        total_products: quantities,
      };
    });
  };

  const clearCart = () => {
    setCart((prev) => {
      localStorage.removeItem("ec_cart");

      return { ...prev, items: [], total_price: 0, total_products: 0 };
    });
  };

  const increaseQuantity = (product) => {
    setCart((prev) => {
      const { user, items, total_price, total_products } = prev;

      const exists = items.find((item) => item.id === product.id);

      exists.quantity = exists.quantity + 1;

      const existsIndex = items.indexOf(product);

      const newItems = items.filter((item) => item.id !== product.id);

      newItems.splice(existsIndex, 0, exists);

      const prices = newItems
        .map((item) => item.price * item.quantity + item.extra_price)
        .reduce((a, b) => a + b);
      const quantities = newItems
        .map((item) => item.quantity)
        .reduce((a, b) => a + b);

      localStorage.setItem(
        "ec_cart",
        JSON.stringify({
          user,
          items: newItems,
          total_price: prices,
          total_products: quantities,
        })
      );

      return {
        user,
        items: newItems,
        total_price: prices,
        total_products: quantities,
      };
    });
  };

  const decreaseQuantity = (product) => {
    setCart((prev) => {
      const { user, items, total_price, total_products } = prev;

      const exists = items.find((item) => item.id === product.id);

      if (!exists) return prev;

      let newItems;

      if (exists.quantity === 1) {
        newItems = items.filter((item) => item.id !== product.id);
      } else {
        exists.quantity = exists.quantity - 1;
        const existsIndex = items.indexOf(product);

        newItems = items.filter((item) => item.id !== product.id);

        newItems.splice(existsIndex, 0, exists);
      }

      const prices =
        newItems.length !== 0
          ? newItems
              .map((item) => item.price * item.quantity + item.extra_price)
              .reduce((a, b) => a + b)
          : 0;
      const quantities =
        newItems.length !== 0
          ? newItems.map((item) => item.quantity).reduce((a, b) => a + b)
          : 0;

      localStorage.setItem(
        "ec_cart",
        JSON.stringify({
          user,
          items: newItems,
          total_price: prices,
          total_products: quantities,
        })
      );

      return {
        user,
        items: newItems,
        total_price: prices,
        total_products: quantities,
      };
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
