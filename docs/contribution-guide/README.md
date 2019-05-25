---
sidebar: false
---

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
    <h1
      style="font-size: 3rem;"
    >
      Contribution Guide
    </h1>
    <br>
    <p
      style="
        font-size: 1.6rem;
        line-height: 1.8;
        color: #6a8bad;
        max-width: 48rem;
      "
    >
      Do you want to contribute to this project or report an issue? <br> Find answers for your questions here.
      <br>
      <br>
      <span style="font-size: 3rem;">🛠</span>
    </p>
    <div
      style="
        margin: auto;
        margin-top: 5rem;
        display: flex;
        justify-content: center;
      "
    >
      <button
        style="
          display: inline-block;
          justify-content: center;
          -webkit-apparance: none;
          -moz-appearance: none;
          font-size: 1.2rem;
          line-height: 1.7;
          color: #fff;
          background-color: #3eaf7c;
          padding: 0.8rem 1.6rem;
          border: none;
          border-radius: 4px;
          transition: background-color 0.1s ease;
          box-sizing: border-box;
          border-bottom: 1px solid #389d70 !important;
        "
      >
        <router-link :to="'/guide/introduction/why/'" style="color: #fff !important; text-decoration: none !important;">
          Learn more →
        </router-link>
      </button>
    </div>
  </div>
</div>