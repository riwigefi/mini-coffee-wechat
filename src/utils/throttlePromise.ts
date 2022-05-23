type CallApi = (...args: unknown[]) => Promise<unknown>;
type CallApis = CallApi[];

const items: {
  name: string;
}[] = Array(20)
  .fill(1)
  .map((_, idx) => ({
    name: `item${idx}`
  }));

// This is the api request that you send and return a promise
const apiCall = (item: { name: string }) => {
  return new Promise<string>(resolve => {
    setTimeout(() => resolve(item.name), 50);
  });
};

const callApis = items.map(item => () => apiCall(item));

const throttlePromise = (callApis: CallApis, concurrency: number) => {
  return new Promise(resolve => {
    let results: any[] = [];

    const sendReq = (callApis: CallApis, iterate: number) => {
      console.log('第几次迭代--', iterate, `延时时间--`, iterate * 1000);
      setTimeout(async () => {
        // slice callApis to send request according to the api limit
        let slicedArray = callApis.slice(
          iterate * concurrency,
          iterate * concurrency + concurrency
        );
        let currResult: unknown[] = [];
        console.log('当前有几个请求需要执行', slicedArray);
        // slicedArray.forEach( async apiCall => {
        //   const res = await apiCall();
        //   console.log('请求结果是啥--', res);
        //   currResult.push(res);
        // });
        for (let i = 0, len = slicedArray.length; i < len; i++) {
          const callApi = slicedArray[i];
          const res = await callApi();
          currResult.push(res);
        }
        console.log('计算结果--', currResult);

        results = [...results, ...currResult];
        console.log('当前这次合并结果--', results);
        // This will resolve the promise when reaches to the last iteration
        if (iterate === Math.ceil(callApis.length / concurrency) - 1) {
          resolve(results);
        }
      }, 1000 * iterate); // every 1000ms runs (api limit of one second)
    };

    // This will make iteration to split array(request) to chunks of five items
    for (let i = 0; i < Math.ceil(callApis.length / concurrency); i++) {
      sendReq(callApis, i);
    }
  });
};

const test = async () => {
  const startTime = Date.now();
  const result = await throttlePromise(callApis, 5);
  const endTime = Date.now();
  console.log(`20个请求，每秒发5个请求，大概需要的时间--`, endTime - startTime);
  console.log('请求结果--', result);
};

test();
