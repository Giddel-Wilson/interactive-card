import { writable } from "svelte/store";

export const formData = writable({
  cardNumber: "0000 0000 0000 0000",
  username: "JANE APPLESEED",
  mm: "00",
  yy: "00",
  cvc: "000",
});
