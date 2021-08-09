const { r } = require("tar");

class Promise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFullfiiled, onRejected) {
    if (this.state === "fulfilled") {
      this.onResolvedCallbacks.push(() => {
        onFullfiiled(this.value);
      });
    }
    if (this.state === "reject") {
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}
