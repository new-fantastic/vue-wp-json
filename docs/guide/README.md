<div
  style="
    position: absolute;
    left: 50%;
    margin-right: -50%;
    top: 45%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items:center;
  "
>
  <div
    style="text-align: center;"
  >
    <h1>Guide</h1>
    <br>
    <p>
      We prepared an easy-to-follow guide for you to have a smooth kick-off with Vue.js WordPress module.
    </p>
    <br>
    <h3>We would recommend starting with these:</h3>
    <div
      style="
        margin: auto;
        margin-top: 4rem;
        display: flex;
        justify-content: center;
      "
    >
      <button
        style="
          display: flex;
          padding: 1rem 2rem;
          justify-content: center;
          -webkit-apparance: none;
          -moz-appearance: none;
          background-color: #46bd87;
          color: #fff;
          border: none;
          border-radius: .5rem;
          font-size: 1rem;
          margin-right: 3rem;
        "
      >
        <router-link :to="'/guide/introduction/why/'" style="color: #fff !important;">
          Why use this module?
        </router-link>
      </button>
      <button
        style="
          display: flex;
          padding: 1rem 2rem;
          justify-content: center;
          -webkit-apparance: none;
          -moz-appearance: none;
          background-color: #46bd87;
          color: #fff;
          border: none;
          border-radius: .5rem;
          font-size: 1rem;
        "
      >
        <router-link :to="'/guide/getting-started/installation/'" style="color: #fff !important;">
          Installation
        </router-link>
      </button>
    </div>
  </div>
</div>