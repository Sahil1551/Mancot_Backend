let orderId = null;

const setStatus = (newStatus) => {
  orderId = newStatus;
};

const getStatus = () => {
  return orderId;
};

module.exports = { setStatus, getStatus };