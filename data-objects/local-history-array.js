function getHistoryArray() {
  const history = JSON.parse(localStorage.getItem("history"));
  return history;
}
export { getHistoryArray };
