<script>
  import { Router, Route } from "svelte-routing";
  import ContentShell from "./ContentShell.svelte";
  import MessageShell from "./MessageShell.svelte";
  import { formData } from './stores/formData.js';

  // Local variables to hold the card details
  let cardNumber = '';
  let username = '';
  let mm = '';
  let yy = '';
  let cvc = '';

  // Subscribe to the formData store to get the latest card details
  formData.subscribe(value => {
    cardNumber = value.cardNumber;
    username = value.username;
    mm = value.mm;
    yy = value.yy;
    cvc = value.cvc;
  });
</script>

<main>
  <div class="sideShell">
    <img src="./bg-main-desktop.png" alt="purple side bar" class="desktopImg" />
    <img src="./bg-main-mobile.png" alt="purple top bar" class="mobileImg" />
  </div>
  <div class="mainShell">
    <!-- Router setup -->
    <Router>
      <Route path="/" component={ContentShell} />
      <Route path="success" component={MessageShell} />
    </Router>
  </div>
  <div class="floatShell">
    <div class="cardShell frontCardShell">
      <img src="./bg-card-front.png" alt="" />
      <div class="frontCardContent">
        <div class="logo">
          <img src="./card-logo.svg" alt="Card Logo" />
        </div>
        <div class="content">
          <!-- Display dynamic card number -->
          <p class="accNo">{cardNumber}</p>
          <div class="cardInfo">
            <!-- Display dynamic username and expiration date -->
            <p>{username}</p>
            <p>{mm}/{yy}</p>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="cardShell backCardShell">
      <img src="./bg-card-back.png" alt="Card Back" />
      <div class="backCardContent">
        <!-- Display dynamic CVC -->
        <div class="cvc">{cvc}</div>
      </div>
    </div>
  </div>
</main>

<style>
  main {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    position: relative;
  }

  @media (max-width: 860px) {
    main {
      flex-direction: column;
      height: max-content;
      overflow-x: hidden;
    }
  }

  .floatShell {
    position: absolute;
    top: 10vh;
    left: 7vw;
    display: flex;
    flex-direction: column;
  }

  .cardShell {
    width: 30vw;
    height: auto;
    position: relative;
    display: flex;
    align-items: center;
  }

  .frontCardContent {
    position: absolute;
    z-index: 1;
    color: white;
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .logo {
    width: fit-content;
    height: fit-content;
  }

  .logo img {
    width: 7vw;
    height: 100%;
    object-fit: contain;
  }

  .accNo {
    font-size: 2vw;
    letter-spacing: 2px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .cardInfo {
    display: flex;
    justify-content: space-between;
    letter-spacing: 1px;
  }

  .backCardContent {
    position: absolute;
    z-index: 1;
    width: 93%;
    height: 100%;
    padding: 30px;
    display: flex;
    justify-content: center;
    color: white;
  }

  .cvc {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    letter-spacing: 2px;
  }

  .sideShell {
    width: 50vw;
    height: 100%;
  }

  .sideShell img,
  .cardShell img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .desktopImg {
    display: block;
  }

  .mobileImg {
    display: none;
  }

  .mainShell {
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 15vh 15%;
  }

  .backCardShell {
    margin-left: 5vw;
  }

  @media (max-width: 1300px) {
    .cardShell {
      width: 35vw;
    }
    .sideShell {
      width: 30vw;
    }
    .mainShell {
      padding: 12vh 10%;
    }
  }

  @media (max-width: 860px) {
    .sideShell {
      width: 100vw;
      height: 30vh;
    }
    .desktopImg {
      display: none;
    }
    .mobileImg {
      display: block;
    }
    .cardShell {
      width: 65vw;
    }

    .frontCardContent {
      gap: 20px;
    }

    .logo {
      width: fit-content;
      height: fit-content;
    }

    .logo img {
      width: 13vw;
      height: 100%;
      object-fit: contain;
    }

    .accNo {
      font-size: 5vw;
      letter-spacing: 2px;
    }

    .cardInfo {
      font-size: small;
    }

    .floatShell {
      left: 16vw;
    }
    .mainShell {
      width: 100%;
      height: auto;
      padding: 10vh 5%;
      align-items: flex-end;
      justify-content: center;
      margin-top: 5vh;
    }
    .frontCardShell {
      margin: 15% 0 0 0;
      z-index: 1;
    }
    .backCardShell {
      margin: -90% 0 0 17%;
    }
  }

  @media (width = 540px) {
    .cardShell {
      width: 50vw;
    }
  }

  @media (max-width: 560px) {
    .cardShell {
      width: 75vw;
    }
    .floatShell {
      left: 7vw;
    }
    .frontCardShell {
      margin: 20% 0 0 0;
      z-index: 1;
    }
    .backCardShell {
      margin: -93% 0 0 15%;
    }
  }

  @media (max-width: 380px) {
    .accNo {
      font-size: 4.5vw;
    }
  }

  @media (max-width: 360px) {
    .mainShell {
      padding: 5vh 5%;
      align-items: flex-start;
      margin-top: 1vh;
    }

    .cardInfo,
    .cvc {
      font-size: x-small;
    }
  }

  @media (max-width: 320px) {
    .mainShell {
      margin-top: 5vh;
    }
    .cardInfo,
    .cvc {
      font-size: x-small;
    }
  }
</style>