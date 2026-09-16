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

  init() {
    document.title = title1.textContent;

    btnStart.addEventListener("click", () => {
      this.start();
    });
    btnAdd.addEventListener("click", this.addScreenBLock.bind(this));
    resetButton.addEventListener("click", this.reset.bind(this));

    document.querySelectorAll(".other-items").forEach((item) => {
      const checkbox = item.querySelector("input[type='checkbox']");
      const priceInput = item.querySelector("input[type='text']");

      checkbox.addEventListener("change", () => {
        priceInput.disabled = !checkbox.checked;
      });
    });

    range.addEventListener("input", () => {
      this.rollback = Number(range.value);
      rangeValue.textContent = `${range.value}%`;
    });

    this.updateCalculateButton();
  },

  start() {
    if (!this.areScreensValid()) {
      return;
    }

    this.addScreens();
    this.addServices();
    this.addPrices();
    this.getFullPrice();
    this.renderResults();
    this.setFormDisabled(true);
    btnStart.style.display = "none";
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
    btnStart.disabled = !this.areScreensValid();
  },

  bindScreenValidation(screen) {
    screen.querySelector("select").addEventListener("change", () => {
      this.updateCalculateButton();
    });
    screen.querySelector("input").addEventListener("input", () => {
      this.updateCalculateButton();
    });
  },

  addScreens() {
    screens = document.querySelectorAll(".screen");
    this.screens = [];

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const count = Number(input.value);

      if (!select.value || !Number.isFinite(count) || count <= 0) {
        return;
      }

      this.screens.push({
        id: index,
        name: select.options[select.selectedIndex].textContent,
        count,
        price: Number(select.value) * count,
      });
    });
  },

  addServices() {
    this.servicesPercent = {};
    this.servicesNumber = {};

    document.querySelectorAll(".other-items.percent").forEach((item) => {
      let check = item.querySelector("input[type='checkbox']");
      const label = item.querySelector("label");
      let input = item.querySelector("input[type='text']");

      if (check.checked) {
        const percent = Number(input.value);

        if (Number.isFinite(percent) && percent >= 0) {
          this.servicesPercent[label.textContent] = percent;
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
          this.servicesNumber[label.textContent] = price;
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
    this.bindScreenValidation(cloneScreen);
    this.updateCalculateButton();
  },

  addPrices() {
    this.screenPrice = this.screens.reduce(
      (sum, screen) => sum + screen.price,
      0,
    );
    this.screenCount = this.screens.reduce(
      (sum, screen) => sum + screen.count,
      0,
    );

    this.servicesPricesPercent = 0;
    for (const key in this.servicesPercent) {
      this.servicesPricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.servicesPricesNumber = 0;
    for (const key in this.servicesNumber) {
      this.servicesPricesNumber += this.servicesNumber[key];
    }

    this.allServicePrices =
      this.servicesPricesPercent + this.servicesPricesNumber;

    this.fullPrice = this.screenPrice + this.allServicePrices;
    const rollbackAmount = this.fullPrice * (this.rollback / 100);
    this.servicePercentPrice = Math.ceil(
      this.fullPrice - rollbackAmount,
    );
  },

  getFullPrice() {
    this.fullPrice = this.screenPrice + this.allServicePrices;
    return this.fullPrice;
  },

  renderResults() {
    document.querySelector("#total").value = Math.ceil(this.screenPrice);
    document.querySelector("#total-count").value = this.screenCount;
    document.querySelector("#total-count-other").value = Math.ceil(
      this.allServicePrices,
    );
    document.querySelector("#total-full-count").value = Math.ceil(
      this.fullPrice,
    );
    document.querySelector("#total-count-rollback").value =
      this.servicePercentPrice;
  },

  setFormDisabled(disabled) {
    btnAdd.disabled = disabled;
    document
      .querySelectorAll(
        ".main-controls input[type='text'], .main-controls select",
      )
      .forEach((input) => {
        input.disabled = disabled;
      });
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
    this.rollback = 0;
    rangeValue.textContent = "0%";
    screens = document.querySelectorAll(".screen");
    this.screens = [];
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.servicesPricesPercent = 0;
    this.servicesPricesNumber = 0;
    this.screenPrice = 0;
    this.screenCount = 0;
    this.allServicePrices = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.setFormDisabled(false);
    this.renderResults();
    btnStart.style.display = "block";
    resetButton.style.display = "none";
    this.updateCalculateButton();
  },
};

appData.init();
appData.bindScreenValidation(screens[0]);
