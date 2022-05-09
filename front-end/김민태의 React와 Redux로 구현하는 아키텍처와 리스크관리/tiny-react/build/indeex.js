/* @jsx createElement */
import { createElement, render } from "./react";

function Title() {
  return createElement("h2", null, "\uC815\uB9D0 \uB3D9\uC791\uD560\uAE4C?");
}

render(createElement(Title, null), document.querySelector("#root"));