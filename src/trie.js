
class Node{
	constructor(poop) {
		this.children = []; //array of nodes pointing to the next node
		this.count = 0;
		this.toilet= poop;
	}
}

export default class Trie {
	constructor() {
		this.root = new Node(); //root will always be empty
	}

	insert(word) { //insert a word "a"
		let count = 0;
		let current = this.root; //use let instead of var
		let currString = "";
		for (let i = 0; i < word.length; i++) {
			var index = word.charCodeAt(i) - 97;
			//console.log(index);
			if (!current.children[index]) { //check if its null
			  currString += String.fromCharCode(index + 97);
				let pooh = new Node(currString);
				current.children[index] = pooh;
				//console.log(currString);
				current = pooh;
			}
			else { //if theres already something there
			  currString += String.fromCharCode(index + 97);
				current = current.children[index]; //set current to the node at that spot
			}
		}
		//console.log(current);
		current.count++;
		//console.log(current.count);
	}

	remove(word) { //remove a word
		let current = this.root;
		for (let i = 0; i < word.length; i++) {
			var index = word.charCodeAt(i) - 97;
			if (current.children[index]) { //if its not empty, if it exists, keep moving
				current = current.children[index]; //move current to its children node
			}
			else { //if its empty
				console.log("Error- word not found");
				return;
			}
		}
		if (current.count === 0) {
			console.log("Error- word count is already 0");
			return;
		}
		return current.count -= 1;
	}

	count(word) {
		let current = this.root;
		for (let i = 0; i < word.length; i++) {
			var index = word.charCodeAt(i) - 97;
			if (current.children[index]) { //if its not empty, if it exists, keep moving
				current = current.children[index]; //move current to its children node
			}
			else { //if its empty
				console.log("Error- word not found");
				return;
			}
		}
		return current.count;
	}

	search(subletters) { //suppose "po"
	  let tigger = "";
    let current = this.root;
    //Boolean lesgo = true;
    for(let i = 0; i < subletters.length; i++){
      let index = subletters.charCodeAt(i) - 97;
      if(current.children[index]){
        tigger += String.fromCharCode(index + 97);
        current = current.children[index]; //move current to its children node- move to the "po" node
        //at the end of this loop, we've reached the "po" node
      }
      else{ 
        if(i === 0) console.log("Error- doesn't exist");
        else{ //if we have "pu" and "p-u" isnt a node but "p" is
        //then we're already at the node we want to eb at ("p") and we just have to perform the search AKA go down to its last nodes
        console.log("asdfdsasdf");
        console.log(tigger);
        return [];
        }
      }
      //this is when uve finished moving to "po"
      //how would u get to the bottom? 
    }
    console.log('tigger',tigger, current);
    let wordlist = [];
    this.search2(current, wordlist);
    for(let i = 0; i < wordlist.length; i++){
      console.log(wordlist[i].name, wordlist[i].count);
		}
		return wordlist;
	}
	
	search2(current, wordlist){
	  //console.log(current);
	  if(current.count >= 1) wordlist.push({name: current.toilet, count: current.count});
	  for(let i = 0; i < 26; i++){
      if(current.children[i]){ //if it exists call it
        //console.log('dfs', i);
        //console.log(piglet);
        //console.log(piglet);
        this.search2(current.children[i], wordlist);
      }
    
    }
    return 3;
	}
	
}
