var getBlacklistRE = function getBlacklistRE(){
	return new RegExp("(.*\\android\\.*|.*\\__fixtures__\\.*|node_modules[\\\\]react[\\\\]dist[\\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$");
}

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
   
  };
};
