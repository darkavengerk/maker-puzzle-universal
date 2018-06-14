/*
  Basic Trie Datastructure
  
  1. Supports having data attached to insert word
  
*/

var trie = function(){
  var trieRoot = new Node(); 

  function insertLetter(node, word){
    var letterToAdd = word[0];
    var missingNode = new Node();
    
    if(typeof(node.letters[letterToAdd]) === 'undefined'){
      if(word.length === 1){
        missingNode.isEndOfWord = true;
        node.letters[letterToAdd] = missingNode;
        return node.letters[letterToAdd];
      }
      else{
        var truncatedWord = word.substring(1, (word.length));
        node.letters[letterToAdd] = missingNode;
        return insertLetter(missingNode, truncatedWord);
      }
    }
    else{
      if(word.length === 1){
        node.letters[letterToAdd].isEndOfWord = true;
        return node.letters[letterToAdd];
      }
      else{
        var truncatedWord = word.substring(1, (word.length));
        return insertLetter(node.letters[letterToAdd], truncatedWord);
      }
    }
  };
  
  function discoverWords(string, maxResults, returnWithData){
    var prefixRoot = getPrefixRoot(string, trieRoot);
    var wordsFound = [];
    var wordBeingBuilt = string;
    var attachData = returnWithData;
    
    traverseNode(prefixRoot);
    return wordsFound;
    
    function traverseNode(node){
      if(wordsFound.length === maxResults){
        return;
      }
      
      if(node.isEndOfWord){
        if(attachData){
          wordsFound.push({ 
            word: wordBeingBuilt, 
            data: node.data
          });
        }
        else{
          wordsFound.push(wordBeingBuilt);
        }
      }
      
      for (var letter in node.letters) {
        var nextNode = node.letters[letter];
        wordBeingBuilt += letter;
        traverseNode(nextNode);
        wordBeingBuilt = wordBeingBuilt.substring(0, wordBeingBuilt.length - 1);
      }
    };
  };
  
  function getWordsReturnHandling(result, callback){
    if(result.length === 0){
        callback("No Matches")
      }
      else{
        callback(null, result)
      }
  };
  
  return {
    addWord: function(word){
      insertLetter(trieRoot, word);
    },
    addWordWithData: function(word, data){
      var lastLetterNode = insertLetter(trieRoot, word);
      lastLetterNode.data = data;
    },
    getWords: function(partialWord, maxResults, callback){
      var results = discoverWords(partialWord, maxResults);
      getWordsReturnHandling(results, callback);
    },
    getWordsWithData: function(partialWord, maxResults, callback){
      var results = discoverWords(partialWord, maxResults, true);
      getWordsReturnHandling(results, callback);
    },
    getDataStructure: function(){
      return trieRoot;
    }
  }
};

var getPrefixRoot = function(prefix, rootNode){
  var objectNavigation = rootNode;
  for(var i = 0; i < prefix.length; i++){
    if(typeof objectNavigation.letters[prefix[i]] === 'undefined'){
      return false;
    }
    objectNavigation = objectNavigation.letters[prefix[i]];
  }
  return objectNavigation;
};

var Node = function(){
  return {
    isEndOfWord: false,
    data : {},
    letters : new AlphabetSet()
  }
};

var AlphabetSet = function() {
  return {}
};


var Trie = trie;

var autoComplete = (function(){

  var cachedData = new Trie();
  var nbrCachedItems = 0;
  var maximumResults = 10;
  var configuration = {};

  var constructor = function(config, callback){
    configuration = config;
    buildCache(callback);
  };

  function buildCache(done){
    configuration.model.aggregate(buildAggregateQuery(), aggregateResult);

    function aggregateResult(err, docs){
      if(err){
        console.log("Error initializing autocomplete cache");
        done(err); //?
      }
      for(var i = 0; i < docs.length; i++){
        var wordWithData = buildInsertableData(docs[i]);
        cachedData.addWordWithData(wordWithData.word, wordWithData.data);
      }
      nbrCachedItems = docs.length;
      done(null);
    }
  };

  function buildInsertableData(doc){
    var word = "";
    var lowerCased = "";
    var data = [];

    configuration.autoCompleteFields.forEach(function(item){
      if(word === ""){
        lowerCased = doc[item].toLowerCase();
        word = doc[item];
      }
      else{
        lowerCased += " " + doc[item].toLowerCase();
        word += " " + doc[item];
      }
    });

    configuration.dataFields.forEach(function(item){
      data.push(doc[item]);
    });

    var itemToCache = {"word": lowerCased, "data": data};
    itemToCache.data.originalWord = word;
    return itemToCache;
  };

  function buildAggregateQuery(){
    var aggregateTemplate = [{ $project: {} }];

    configuration.autoCompleteFields.forEach(function(item){
      aggregateTemplate[0].$project[item] = 1;
    });

    configuration.dataFields.forEach(function(item){
      aggregateTemplate[0].$project[item] = 1;
    });

    return aggregateTemplate;
  };

  function RebuildToOriginalContent(content){
    var newarray = [];
    content.forEach(function(item){
      newarray.unshift({ word: item.data.originalWord, data: item.data});
    });
    return newarray;
  }

  constructor.prototype = {

    buildCache,

    getResults: function(string, cb){
      cachedData.getWordsWithData(string.toLowerCase(), maximumResults, function(err, result){
        if(err){
          cb(err);
        }
        else{
          cb(null, RebuildToOriginalContent(result));
        }
      });
    },
    
    getCacheSize: function(){
      return nbrCachedItems;
    }
  };

  return constructor;
})();

exports.AutoComplete = autoComplete;
