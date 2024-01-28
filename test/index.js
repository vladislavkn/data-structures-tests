const isEqual = require("is-equal");
const problemTests = require("./problemTests.json");
const chalk = require("chalk");
const { copy } = require("copy-anything");

const test = (problemId, solutionFn) => {
  const problem = problemTests[String(problemId)];

  if (problem === undefined) {
    console.log(chalk.yellow.bold(`⚠️ Problem #${problemId} was not found.`));
    return;
  }

  console.log(chalk.bold(`Problem #${problemId} "${problem.title}"`));

  for (let i = 0; i < problem.tests.length; i++) {
    const { input, output } = problem.tests[i];
    const inputCopy = copy(input);
    const actualOutputs = solutionFn(...inputCopy);

    if (!isEqual(actualOutputs, ...output)) {
      console.log(
        chalk.red(`\t❌ Failed! [Test ${i + 1}/${problem.tests.length}]`)
      );
      console.log(chalk.grey("\tInputs: "), ...input);
      console.log(chalk.grey("\tExpected outputs: "), ...output);
      console.log(chalk.grey("\tActual outputs: "), actualOutputs);
      return;
    }
  }

  console.log(chalk.green("\t✅ All tests passed!"));
};

module.exports = test;
