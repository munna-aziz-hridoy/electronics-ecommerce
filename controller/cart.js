import { Response } from "@helper/response";
import { Cart } from "@models/cart";
import { Product } from "@models/product";

const response = new Response();

export const cart = async (req, res) => {
  const user_id = req.query.user_id;

  if (req.method === "GET") {
    if (!user_id) return response.BAD_REQUEST(res, "add user_id as query");

    try {
      const exists = await Cart.findOne({ user_id });

      if (!exists) return response.NOT_FOUND(res);

      const { products } = exists;

      const ids = products?.map((item) => item.id);

      const result = await Product.find(
        {
          id: {
            $in: ids,
          },
        },
        "name id price images -_id"
      );

      const cart_items = result.map((element) => {
        const cp = products?.find((p) => p.id === element.id);

        let extras_prices = 0;

        if (cp.extras) {
          const prices = cp.extras?.map((e) => e.price).reduce((a, b) => a + b);
          extras_prices = prices;
        }

        const sub_total = element.price * cp.quantity;
        const total = sub_total + extras_prices;

        return {
          ...element,
          extras: cp.extras || null,
          quantity: cp.quantity,
          sub_total,
          total,
        };
      });

      const filteredItems = cart_items.map((item) => {
        const { _doc, extras, quantity, sub_total, total } = item;
        return { product: _doc, extras, quantity, sub_total, total };
      });

      const total_items = cart_items
        ?.map((item) => item.quantity)
        .reduce((a, b) => a + b);

      const grand_total = cart_items
        ?.map((item) => item.total)
        .reduce((a, b) => a + b);

      const doc = {
        cart_items: filteredItems,
        total_items,
        grand_total,
      };

      response.SUCCESS(res, doc);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  }

  //   ----- create cart
  else if (req.method === "POST") {
    const { product, quantity, extras } = JSON.parse(req.body);

    if (!product) return response.BAD_REQUEST(res, "add some product on cart");

    if (!quantity) return response.BAD_REQUEST(res, "Must have a quantity");

    try {
      const exists = await Cart.findOne({ user_id });

      if (!exists) {
        const doc = {
          products: [
            {
              id: product,
              quantity,
              extras,
            },
          ],
          user_id,
        };

        const cart = new Cart(doc);

        const result = await cart.save();

        response.SUCCESS(res, result);
      } else {
        const doc = {
          products: [
            ...exists?.products,
            {
              id: product,
              quantity,
              extras,
            },
          ],
        };
        const result = await Cart.findOneAndUpdate({ user_id }, doc);

        response.SUCCESS(res, result);
      }
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else if (req.method === "DELETE") {
    try {
      const result = await Cart.deleteOne({ user_id });

      response.SUCCESS(res, result);
    } catch (error) {
      response.INTERNAL_SERVER_ERROR(res, error);
    }
  } else {
    response.METHOD_NOT_ALLOWED(res, req);
  }
};
