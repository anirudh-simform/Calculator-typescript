function getHistoryArray() {
  const historyArrayJSON = localStorage.getItem("history");
  if (historyArrayJSON !== null) {
    const history = JSON.parse(historyArrayJSON);
    return history;
  }
}
export { getHistoryArray };
