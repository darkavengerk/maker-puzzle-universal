/*
  Basic Trie Datastructure
  
  1. Supports having data attached to insert word
  
*/

class Trie {
  constructor() {
    this.trieRoot = new Node(); 
  }

  insertLetter(node, word){
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
        return this.insertLetter(missingNode, truncatedWord);
      }
    }
    else{
      if(word.length === 1){
        node.letters[letterToAdd].isEndOfWord = true;
        return node.letters[letterToAdd];
      }
      else{
        var truncatedWord = word.substring(1, (word.length));
        return this.insertLetter(node.letters[letterToAdd], truncatedWord);
      }
    }
  };
  
  discoverWords(string, maxResults, returnWithData){
    var prefixRoot = getPrefixRoot(string, this.trieRoot);
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
  
  getWordsReturnHandling(result, callback){
    if(result.length === 0){
        callback("No Matches")
      }
      else{
        callback(null, result)
      }
  };

  addWord(word){
    this.insertLetter(this.trieRoot, word);
  }
  
  addWordWithData(word, data){
    var lastLetterNode = this.insertLetter(this.trieRoot, word);
    lastLetterNode.data = data;
  }

  getWords(partialWord, maxResults, callback){
    var results = this.discoverWords(partialWord, maxResults);
    this.getWordsReturnHandling(results, callback);
  }

  getWordsWithData(partialWord, maxResults, callback){
    var results = this.discoverWords(partialWord, maxResults, true);
    this.getWordsReturnHandling(results, callback);
  }

  getDataStructure(){
    return this.trieRoot;
  }
}

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

exports.Trie = Trie;