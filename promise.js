(function(window){
  var callBacks = [];
  var complete = function(type,result){
    var iNum = 0;
    while(callBacks[0]){
      if(iNum>0){
        type='resolve';
      }
      callBacks.shift()[type](result);
      iNum++;
    }
  }
  function Promise(fn){
    callBacks.length = 0;
    typeof fn==='function' && fn.call(this,this.resolve,this.reject);
  }
  Promise.prototype = {
    construct:Promise,
    resolve:function(result){
      complete("resolve",result);
    },
    reject:function(result){
      complete("reject",result);
    },
    then:function(successHandler,failedHandler){
      callBacks.push({
        resolve:successHandler,
        reject:failedHandler
      });
      return this;
    },
    catch:function(failedHandler){
      callBacks[callBacks.length-1].reject = failedHandler;
      return this;
    }
  }

}(window));