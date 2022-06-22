type PromiseTask = (...args: unknown[]) => Promise<unknown>;

export const promiseAllStepN = (n: number, list: PromiseTask[]) => {
  let tail = list.splice(n);
  let head = list;
  let resolved: Promise<unknown>[] = [];
  let processed = 0;
  return new Promise((resolve) => {
    head.forEach((task) => {
      let res = task();
      resolved.push(res);
      res.then((x) => {
        runNext();
        return x;
      });
    });
    function runNext() {
      if (processed === tail.length) {
        resolve(Promise.all(resolved));
      } else {
        resolved.push(
          tail[processed]().then((x) => {
            runNext();
            return x;
          })
        );
        processed++;
      }
    }
  });
};
