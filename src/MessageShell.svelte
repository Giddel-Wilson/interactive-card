<script>
  import { navigate } from "svelte-routing";

</script>

<main>
  <div class="completeIcon">
    <img src="./icon-complete.svg" alt="complete icon" />
  </div>
  <div class="infoShell">
    <h1>THANK YOU!</h1>
    <p>We've added your card details</p>
  </div>
    <button class="btn" on:click={() => navigate("/")}>Continue</button>
</main>

<style>
  main {
    width: 27vw;
    height: max-content;
    padding: 50px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* font-family: Arial, Helvetica, sans-serif; */
    gap: 30px;
    /* background-color: red; */
  }

  @media (max-width: 1300px) {
    main {
      width: 30vw;
      height: 100%;
      margin-right: 7vh;
      /* margin: 0 -50px 0 0; */
    }
  }

  @media (max-width: 1025px) {
    main {
      width: 35vw;
      margin: 0 0 0 0;
    }
  }

  @media (max-width: 860px) {
    main {
      width: 100%;
    }
  }

  .completeIcon {
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .infoShell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .infoShell h1 {
    color: #22092f;
    letter-spacing: 2px;
    font-weight: 500;
  }

  .infoShell p {
    color: #b0b3b8;
    letter-spacing: 2px;
  }

  .btn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #22092f;
    color: white;
    border: none;
    padding: 15px 0;
    border-radius: 10px;
    font-size: medium;
  }
</style>
