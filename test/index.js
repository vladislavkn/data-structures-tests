const isEqual = require("is-equal");
const problemTests = require("./problemTests.json");
const chalk = require("chalk");

const test = (problemId, solutionFn) => {
  const problem = problemTests[String(problemId)];

  if (problem === undefined) {
    console.log(chalk.yellow.bold(`⚠️ Problem #${problemId} was not found.`));
    return;
  }

  console.log(chalk.bold(`Problem #${problemId} ${problem.title}`));

  for (const test of problem.tests) {
    const { input, output } = test;
    const actualOutputs = solutionFn(...input);

    if (!isEqual(actualOutputs, ...output)) {
      console.log(chalk.red("\t❌ Failed!"));
      console.log(chalk.grey("\tInputs: "), ...input);
      console.log(chalk.grey("\tExpected outputs: "), ...output);
      console.log(chalk.grey("\tActual outputs: "), actualOutputs);
      return;
    }
  }

  console.log(chalk.green("\t✅ All tests passed!"));
};

module.exports = test;
