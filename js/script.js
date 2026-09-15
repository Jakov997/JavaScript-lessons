const title1 = document.getElementsByTagName("h1")[0];
const btnStart = document.querySelector(".handler_btn#start");
const btnAdd = document.querySelector(".screen-btn");
let screenBtn = document.querySelector(".screen-btn");
let range = document.querySelector('.rollback input[type="range"]');
let rangeValue = document.querySelector(".rollback .range-value");
let screens = document.querySelectorAll(".screen");
let resetButton = document.querySelector("#reset");

const appData = {
  screens: [],
  screenPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  servicesPricesPercent: 0,
  servicesPricesNumber: 0,
  allServicePrices: 0,
  fullPrice: 0,
  screenCount: 0,
  servicePercentPrice: 0,
  rollback: Number(range.value),

  init: function () {
    document.title = title1.textContent;

    btnStart.addEventListener("click", () => {
      appData.start();
    });
    btnAdd.addEventListener("click", appData.addScreenBLock);
    resetButton.addEventListener("click", appData.reset);

    document.querySelectorAll(".other-items").forEach((item) => {
      const checkbox = item.querySelector("input[type='checkbox']");
      const priceInput = item.querySelector("input[type='text']");

      checkbox.addEventListener("change", () => {
        priceInput.disabled = !checkbox.checked;
      });
    });

    range.addEventListener("input", () => {
      appData.rollback = Number(range.value);
      rangeValue.textContent = `${range.value}%`;
    });

    appData.updateCalculateButton();
  },

  start() {
    if (!appData.areScreensValid()) {
      return;
    }

    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.getFullPrice();
    appData.renderResults();
    resetButton.style.display = "block";
  },

  areScreensValid() {
    screens = document.querySelectorAll(".screen");

    return (
      screens.length > 0 &&
      [...screens].every((screen) => {
        const select = screen.querySelector("select");
        const input = screen.querySelector("input");
        const count = Number(input.value);

        return (
          Boolean(select.value) &&
          input.value.trim() !== "" &&
          Number.isFinite(count) &&
          count > 0
        );
      })
    );
  },

  updateCalculateButton() {
    btnStart.disabled = !appData.areScreensValid();
  },

  bindScreenValidation(screen) {
    screen.querySelector("select").addEventListener("change", () => {
      appData.updateCalculateButton();
    });
    screen.querySelector("input").addEventListener("input", () => {
      appData.updateCalculateButton();
    });
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    appData.screens = [];

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const count = Number(input.value);

      if (!select.value || !Number.isFinite(count) || count <= 0) {
        return;
      }

      appData.screens.push({
        id: index,
        name: select.options[select.selectedIndex].textContent,
        count,
        price: Number(select.value) * count,
      });
    });
  },

  addServices: function () {
    appData.servicesPercent = {};
    appData.servicesNumber = {};

    document.querySelectorAll(".other-items.percent").forEach((item) => {
      let check = item.querySelector("input[type='checkbox']");
      const label = item.querySelector("label");
      let input = item.querySelector("input[type='text']");

      if (check.checked) {
        const percent = Number(input.value);

        if (Number.isFinite(percent) && percent >= 0) {
          appData.servicesPercent[label.textContent] = percent;
        }
      }
    });

    document.querySelectorAll(".other-items.number").forEach((item) => {
      let check = item.querySelector("input[type='checkbox']");
      const label = item.querySelector("label");
      let input = item.querySelector("input[type='text']");

      if (check.checked) {
        const price = Number(input.value);

        if (Number.isFinite(price) && price >= 0) {
          appData.servicesNumber[label.textContent] = price;
        }
      }
    });
  },

  addScreenBLock() {
    const cloneScreen = screens[0].cloneNode(true);
    cloneScreen.querySelector("select").selectedIndex = 0;
    cloneScreen.querySelector("input").value = "";

    screenBtn.insertAdjacentElement("beforebegin", cloneScreen);
    screens = document.querySelectorAll(".screen");
    appData.bindScreenValidation(cloneScreen);
    appData.updateCalculateButton();
  },

  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(
      (sum, screen) => sum + screen.price,
      0,
    );
    appData.screenCount = appData.screens.reduce(
      (sum, screen) => sum + screen.count,
      0,
    );

    appData.servicesPricesPercent = 0;
    for (const key in appData.servicesPercent) {
      appData.servicesPricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.servicesPricesNumber = 0;
    for (const key in appData.servicesNumber) {
      appData.servicesPricesNumber += appData.servicesNumber[key];
    }

    appData.allServicePrices =
      appData.servicesPricesPercent + appData.servicesPricesNumber;

    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    const rollbackAmount = appData.fullPrice * (appData.rollback / 100);
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - rollbackAmount,
    );
  },

  getFullPrice() {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    return appData.fullPrice;
  },

  renderResults() {
    document.querySelector("#total").value = Math.ceil(appData.screenPrice);
    document.querySelector("#total-count").value = appData.screenCount;
    document.querySelector("#total-count-other").value = Math.ceil(
      appData.allServicePrices,
    );
    document.querySelector("#total-full-count").value = Math.ceil(
      appData.fullPrice,
    );
    document.querySelector("#total-count-rollback").value =
      appData.servicePercentPrice;
  },

  reset() {
    const screenItems = document.querySelectorAll(".screen");

    screenItems.forEach((screen, index) => {
      if (index > 0) {
        screen.remove();
      }
    });

    const firstScreen = document.querySelector(".screen");
    firstScreen.querySelector("select").selectedIndex = 0;
    firstScreen.querySelector("input").value = "";

    document.querySelectorAll(".other-items").forEach((item) => {
      const checkbox = item.querySelector("input[type='checkbox']");
      const priceInput = item.querySelector("input[type='text']");

      checkbox.checked = false;
      priceInput.disabled = true;
    });

    range.value = 0;
    appData.rollback = 0;
    rangeValue.textContent = "0%";
    screens = document.querySelectorAll(".screen");
    appData.screens = [];
    appData.servicesPercent = {};
    appData.servicesNumber = {};
    appData.screenPrice = 0;
    appData.screenCount = 0;
    appData.allServicePrices = 0;
    appData.fullPrice = 0;
    appData.servicePercentPrice = 0;
    appData.renderResults();
    resetButton.style.display = "none";
    appData.updateCalculateButton();
  },
};

appData.init();
appData.bindScreenValidation(screens[0]);
