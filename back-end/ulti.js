const commonFc = {
  isNullOrEmpty: (input) => {
    if (input == null || input.trim() == "") {
      return true;
    } else {
      return false;
    }
  },
};

module.exports = commonFc;
