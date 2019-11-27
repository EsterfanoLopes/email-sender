const { validate } = require('email-validator');

const buildParsedData = (line) => {
  if (validate(line[0])) {
    return {
      email: line[0],
      data: {
        name: line[1],
        uf: line[2],
        site: line[3],
        seller: line[4],
        total_objective: line[5],
        consolidated: line[6],
        objective: line[7],
        percentual_objective: line[8],
      },
    };
  }
  return false;
};

module.exports = {
  dataParser: (allLines) => {
    return allLines.map(line => {
      return buildParsedData(line);
    });
  }
};
