import { renderHook, act } from "@testing-library/react-hooks";
import { useCardCount } from "./useCardCount";

let callback = () => {};

jest.mock("cart/cart", () => {
    cart: {
        cartItems: [],
        subscribe: (cb) => {
            callback = cb;
        }
    }
});

describe("useCardCount", () => {

    it("should return card count", () => {
        const { result } = renderHook(() => useCardCount());
        expect(result.current).toBe(0);
    });

    it("should return card count", () => {
        const { result } = renderHook(() => useCardCount());
        act(() => {
            callback({
                cartItems: [{
                    id: 1
                }]
            })
        });
        expect(result.current).toBe(1);
    });
});
