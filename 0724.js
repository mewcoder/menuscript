const eventBus = {}

/* 
{
  add:  [callback1, callback2]
  delete: [callback3]
}
*/
let callbacksObj = {}

/* 
绑定事件监听
*/
eventBus.on = function (eventName, callback) {
  const callbacks = callbacksObj[eventName]
  if (callbacks) {
    callbacks.push(callback)
  } else {
    callbacksObj[eventName] = [callback]
  }
}

/* 
分发事件
*/
eventBus.emit = function (eventName, data) {
  const callbacks = callbacksObj[eventName]
  if (callbacks && callbacks.length > 0) {
    callbacks.forEach(callback => {
      callback(data)
    })
  }
}

/* 
移除事件监听
*/
eventBus.off = function (eventName) {
  if (eventName) {
    delete callbacksObj[eventName]
  } else {
    callbacksObj = {}
  }
}


eventBus.on('add', (data) => {
    console.log('add', data)
})
eventBus.on('add', (data) => {
    console.log('add2', data)
})
eventBus.on('delete', (data) => {
    console.log('delete', data)
})

// eventBus.off('add')
// eventBus.off()

eventBus.emit('add', 123)
eventBus.emit('delete', 'abc')