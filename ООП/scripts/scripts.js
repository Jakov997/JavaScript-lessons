"use strict";

const DomElement = function (selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
};

DomElement.prototype.newElement = function () {
  if (!this.selector) return;

  let element;

  if (this.selector[0] === ".") {
    element = document.createElement("div");
    element.className = this.selector.slice(1);
  } else if (this.selector[0] === "#") {
    element = document.createElement("p");
    element.id = this.selector.slice(1);
  }

  element.style.cssText = `height: ${this.height}px; width: ${this.width}px; background: ${this.bg}; font-size: ${this.fontSize}px; display: flex; align-items: center; justify-content: center;`;

  element.textContent = "Random Text";

  appendToBody(element);
};

function appendToBody(name) {
  document.body.append(name);
}

const box = new DomElement("#block", "150", "300", "lightblue", "18");

box.newElement();
