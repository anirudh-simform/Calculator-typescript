function addModalEventListeners() {
  const seeFullHistory = document.querySelector(".see-full-history");
  const dialog = document.querySelector("dialog");
  const historyContainer = document.querySelector(".history-container");
  const close = document.querySelector(".close");
  let history;
  seeFullHistory.addEventListener("click", () => {
    history = JSON.parse(localStorage.getItem("history"));
    if (!history) {
      return;
    }

    if (historyContainer.firstElementChild) {
      historyContainer.replaceChild(
        createHistory(history),
        historyContainer.firstElementChild
      );
    } else {
      historyContainer.appendChild(createHistory(history));
    }

    dialog.showModal();
  });

  close.addEventListener("click", () => {
    dialog.close();
  });
}

function createItem(expression, result) {
  const itemContainer = document.createElement("div");
  const expressionNode = document.createElement("div");
  const resultNode = document.createElement("div");

  itemContainer.className = "item-container";
  expressionNode.className = "expression";
  resultNode.className = "result";

  expressionNode.textContent = expression;
  resultNode.textContent = result;

  itemContainer.append(expressionNode, resultNode);

  return itemContainer;
}

function createHistory(history) {
  const wrappingContainer = document.createElement("div");

  for (let i = 0; i < history.length; i++) {
    const item = createItem(history[i].expression, history[i].result);
    wrappingContainer.appendChild(item);
  }

  return wrappingContainer;
}

export { addModalEventListeners };
