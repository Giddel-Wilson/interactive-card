<script>
  import { navigate } from "svelte-routing";
  import { formData } from "./stores/formData.js";

  let cardNumber = "";
  let username = "";
  let mm = "";
  let yy = "";
  let cvc = "";

  let errors = {
    name: false,
    number: false,
    mm: false,
    yy: false,
    cvc: false,
    numberFormat: false,
    expired: false,
  };

  function formatCardNumber(number) {
    // Remove any non-digit characters and format with spaces after every 4 digits
    return number
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();
  }

  let resetError = (field) => {
    errors[field] = false;
    if (field === "number") errors.numberFormat = false;
  };

  function submitForm(e) {
    let isValid = true;

    errors = {
      name: false,
      number: false,
      mm: false,
      yy: false,
      cvc: false,
      numberFormat: false,
      expired: false,
    };

    const name = e.target.elements.name.value.trim();
    const number = formatCardNumber(e.target.elements.number.value.trim());
    const mm = e.target.elements.mm.value.trim();
    const yy = e.target.elements.yy.value.trim();
    const cvc = e.target.elements.cvc.value.trim();

    if (name === "" || !/^[A-Za-z\s]+$/.test(name)) {
      errors.name = true;
      isValid = false;
    }

    // Validation for Card Number
    const sanitizedNumber = number.replace(/\s+/g, ""); // Removes spaces
    if (sanitizedNumber === "" || sanitizedNumber.length !== 16) {
      errors.number = true;
      isValid = false;
    }

    // Validation for Card Number Format
    if (!/^\d{16}$/.test(sanitizedNumber)) {
      errors.numberFormat = true;
      isValid = false;
    }

    // Validation for Expiration Date (MM/YY)
    const month = parseInt(mm, 10);
    const year = parseInt(yy, 10) + 2000; // Assuming 20XX format

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (
      mm === "" ||
      yy === "" ||
      !/^\d{2}$/.test(mm) ||
      month < 1 ||
      month > 12 ||
      !/^\d{2}$/.test(yy)
    ) {
      errors.mm = mm === "" || !/^\d{2}$/.test(mm) || month < 1 || month > 12;
      errors.yy = yy === "" || !/^\d{2}$/.test(yy);
      isValid = false;
    } else if (
      year < currentYear ||
      (year === currentYear && month < currentMonth)
    ) {
      errors.expired = true;
      isValid = false;
    }

    // Validation for CVC
    if (cvc === "" || cvc.length !== 3 || !/^\d{3}$/.test(cvc)) {
      errors.cvc = true;
      isValid = false;
    }

    if (isValid) {
      // Update the store with the form data
      formData.set({
        cardNumber: number, // Use formatted number here
        username,
        mm,
        yy,
        cvc,
      });

      // Navigate to success page
      navigate("/success");
    }
  }
</script>

<main>
  <form on:submit|preventDefault={submitForm}>
    <fieldset>
      <label for="name">Cardholder Name</label>
      <input
        type="text"
        id="name"
        placeholder="e.g. Jane Appleseed"
        class:error={errors.name}
        style:border={errors.name ? "2px solid red" : "1px solid #ccccce"}
        on:input={() => resetError("name")}
        bind:value={username}
      />
    </fieldset>
    <fieldset>
      <label for="number">Card Number</label>
      <input
        type="text"
        id="number"
        placeholder="e.g. 1234 5678 9123 0000"
        class:error={errors.number}
        style:border={errors.number ? "2px solid red" : "1px solid #ccccce"}
        on:input={() => resetError("number")}
        bind:value={cardNumber}
        on:input={(e) => (cardNumber = formatCardNumber(e.target.value))}
      />
      {#if errors.numberFormat}
        <p class:error={errors.numberFormat}>Wrong format, numbers only</p>
      {/if}
    </fieldset>
    <fieldset class="dateNcvc">
      <fieldset>
        <label for="exp">Exp. Date (MM/YY)</label>
        <div>
          <input
            type="number"
            id="mm"
            placeholder="MM"
            class:error={errors.mm}
            style:border={errors.mm ? "2px solid red" : "1px solid #ccccce"}
            on:input={() => resetError("mm")}
            bind:value={mm}
          />
          <input
            type="number"
            id="yy"
            placeholder="YY"
            class:error={errors.yy}
            style:border={errors.yy ? "2px solid red" : "1px solid #ccccce"}
            on:input={() => resetError("yy")}
            bind:value={yy}
          />
        </div>
      </fieldset>
      <fieldset>
        <label for="cvc">CVC</label>
        <input
          type="number"
          id="cvc"
          placeholder="e.g. 123"
          class:error={errors.cvc}
          style:border={errors.cvc ? "2px solid red" : "1px solid #ccccce"}
          on:input={() => resetError("cvc")}
          bind:value={cvc}
        />
      </fieldset>
    </fieldset>
    <button type="submit" id="btn">Confirm</button>
  </form>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap");

  .error {
    color: red;
  }

  main {
    width: 30vw;
    height: max-content;
    padding: 50px 20px;
  }

  @media (max-width: 1300px) {
    main {
      width: 40vw;
      margin: 0 -50px 0 0;
    }
  }

  @media (max-width: 1025px) {
    main {
      width: 40vw;
      margin: 0 0 0 0;
    }
  }

  @media (max-width: 860px) {
    main {
      width: 100%;
    }
  }

  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  fieldset {
    width: 100%;
    border: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  label {
    font-weight: 500;
    font-size: medium;
    width: max-content;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  @media (max-width: 1025px) {
    label {
      font-size: small;
    }
  }

  input {
    width: 100%;
    height: 7vh;
    border-radius: 10px;
    border: #ccccce 1px solid;
    padding: 0 15px;
  }

  ::-webkit-input-placeholder {
    color: #ccccce;
    font-size: large;
  }

  @media (max-width: 1300px) {
    ::-webkit-input-placeholder {
      font-size: medium;
    }
  }

  @media (max-width: 1025px) {
    ::-webkit-input-placeholder {
      font-size: small;
    }
  }

  :-moz-placeholder {
    color: #ccccce;
    font-size: large;
  }

  @media (max-width: 1300px) {
    :-moz-placeholder {
      font-size: medium;
    }
  }

  @media (max-width: 1025px) {
    :-moz-placeholder {
      font-size: small;
    }
  }

  ::-moz-placeholder {
    color: #ccccce;
    font-size: large;
  }

  @media (max-width: 1300px) {
    ::-moz-placeholder {
      font-size: medium;
    }
  }

  @media (max-width: 1025px) {
    ::-moz-placeholder {
      font-size: small;
    }
  }

  :-ms-input-placeholder {
    color: #ccccce;
    font-size: large;
  }

  @media (max-width: 1300px) {
    :-ms-input-placeholder {
      font-size: medium;
    }
  }

  @media (max-width: 1025px) {
    :-ms-input-placeholder {
      font-size: small;
    }
  }

  .dateNcvc {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .dateNcvc fieldset {
    width: 50%;
  }

  fieldset div {
    display: flex;
    gap: 10px;
  }

  #btn {
    color: white;
    background-color: #220930;
    border: none;
    border-radius: 10px;
    padding: 20px;
    font-size: large;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #btn:hover {
    cursor: pointer;
    background-color: #380b4f;
    transition: 0.15s ease-in-out;
  }

  @media (max-width: 1025px) {
    #btn {
      font-size: 14px;
      padding: 15px;
    }
  }
</style>
