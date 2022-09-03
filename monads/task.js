// like a promise

const Task = (fork) => ({
  fork,
  of: (x) => Task((rej, res) => res(x)),
  rejected: (x) => Task((rej, res) => rej(x)),
  map: (f) => Task((rej, res) => fork(rej, (x) => res(f(x)))),
  chain: (f) => Task((rej, res) => fork(rej, (x) => f(x).fork(rej, res))),
});

// example
const task1 = Task((rej, res) => res(2))
  .map((two) => two + 1)
  .map((three) => three * 2);

const task2 = Task()
  .of(2)
  .map((two) => two + 1)
  .map((three) => three * 2);

task1.fork(console.error, console.log);
task2.fork(console.error, console.log);
