const { validate } = require('email-validator');

const compare = (a, b, property) => {
  const elementA = a.data[property];
  const elementB = b.data[property];

  let comparison = 0;
  if (elementA > elementB) {
    comparison = 1;
  } else if (elementA < elementB) {
    comparison = -1;
  }
  return comparison;
};

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

const rankData = (parsedData) => parsedData
  .sort((a, b, property = 'consolidated') => {
    if (a && b) {
      return compare(a, b, property)
    }
  })
  .reverse();


module.exports = {
  dataParser: (allLines) => {
    const allParsed = allLines.map(line => buildParsedData(line));
    const rankedData = rankData(allParsed);

    return {
      parsedData: allParsed,
      rankedData: rankedData.filter(item => item),
    }
  }
};
