interface CalculationHistoryObject {
  expression: string;
  result: string;
}
function addModalEventListeners() {
  const seeFullHistory = document.querySelector(".see-full-history");
  const dialog = document.querySelector("dialog");
  const historyContainer = document.querySelector(".history-container");
  const close = document.querySelector(".close");
  let history: CalculationHistoryObject[];

  // Check if the DOM elements being accessed are present in the DOM
  if (
    seeFullHistory != null &&
    dialog != null &&
    historyContainer != null &&
    close != null
  ) {
    seeFullHistory.addEventListener("click", () => {
      const JSONHistoryArray = localStorage.getItem("history");
      if (JSONHistoryArray) {
        history = JSON.parse(JSONHistoryArray);
      } else {
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
}

function createItem(expression: string, result: string) {
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

// Creates a container which contains multiple div nodes corresponding to history of operations performed
function createHistory(history: CalculationHistoryObject[]) {
  const wrappingContainer = document.createElement("div");

  for (let i = 0; i < history.length; i++) {
    const item = createItem(history[i].expression, history[i].result);
    wrappingContainer.appendChild(item);
  }

  return wrappingContainer;
}

export { addModalEventListeners, CalculationHistoryObject };
