const isEqual = require("is-equal");
const problemTests = require("./problemTests.json");
const chalk = require("chalk");

const test = (problemId, solutionFn) => {
  console.log(chalk.bold(`Testing problem ${problemId}`));
  const tests = problemTests[problemId];

  if (tests === undefined) {
    console.log(chalk.yellow("\t⚠️ Problem was not found."));
    return;
  }

  for (const test of tests) {
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
