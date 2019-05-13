
const Trie = require('./trie').Trie;

class AutoComplete {
  constructor(config, callback){
    this.nbrCachedItems = 0;
    this.maximumResults = 10;
    this.configuration = config;
    this.buildCache(callback);
  }

  buildCache(done){
    this.cachedData = new Trie();
    this.configuration.model.aggregate(this.buildAggregateQuery(), (err, docs) => {
      if(err){
        console.log("Error initializing autocomplete cache");
        done(err); //?
      }
      for(var i = 0; i < docs.length; i++){
        var wordWithData = this.buildInsertableData(docs[i]);
        this.cachedData.addWordWithData(wordWithData.word, wordWithData.data);
      }
      this.nbrCachedItems = docs.length;
      done(null);
    });
  }

  buildInsertableData(doc){
    var word = "";
    var lowerCased = "";
    var data = [];

    this.configuration.autoCompleteFields.forEach(function(item){
      if(word === ""){
        lowerCased = doc[item].toLowerCase();
        word = doc[item];
      }
      else{
        lowerCased += " " + doc[item].toLowerCase();
        word += " " + doc[item];
      }
    });

    this.configuration.dataFields.forEach(function(item){
      data.push(doc[item]);
    });

    var itemToCache = {"word": lowerCased, "data": data};
    itemToCache.data.originalWord = word;
    return itemToCache;
  }

  buildAggregateQuery(){
    var aggregateTemplate = [{ $project: {} }];

    this.configuration.autoCompleteFields.forEach(function(item){
      aggregateTemplate[0].$project[item] = 1;
    });

    this.configuration.dataFields.forEach(function(item){
      aggregateTemplate[0].$project[item] = 1;
    });

    return aggregateTemplate;
  }

  RebuildToOriginalContent(content){
    var newarray = [];
    content.forEach(function(item){
      newarray.unshift({ word: item.data.originalWord, data: item.data});
    });
    return newarray;
  }

  getResults(string, cb){
    this.cachedData.getWordsWithData(string.toLowerCase(), this.maximumResults, (err, result) => {
      if(err){
        cb(err);
      }
      else{
        cb(null, this.RebuildToOriginalContent(result));
      }
    });
  }
  
  getCacheSize(){
    return this.nbrCachedItems;
  }

}

exports.AutoComplete = AutoComplete;
