export {Trie}

class TrieNode{
    constructor(){
        this.children = Array(10).fill(null);
        this.parent = null;
    }
}

class ContactNode{
    constructor(name, number, parent){
        this.name = name;
        this.number = number;
        this.parent = parent;
    }
}

class Trie {
    constructor(){
        this.root = new TrieNode();
        this.current = this.root;

        let init = [
            ["Ujjval","9872611111"],
            ["Akshu", "8654312345"]
        ];

        for(let i=0;i<init.length;i++){
            this.add(init[i][1], init[i][0], 0);
        }
    }

    add(number, name, pos = 0, node = this.root){

        if(pos===number.length-1){
            node.children[number[pos]-'0'] = new ContactNode(name, number, node);
            return;
        }

        if(node.children[number[pos]-'0']===null){
            let newnode = new TrieNode();
            newnode.parent = node;
            node.children[number[pos]-'0'] = newnode;   
        }
        this.add(number, name, pos+1, node.children[number[pos]-'0']);
    }

    findAll(node){
        if(node===null)
            return;

        if(node instanceof ContactNode){
            this.res.push(node);
            return;
        }

        for(let i=0;i<10;i++){
            this.findAll(node.children[i]);
        }
    }

    findNext(step){
        if(step===-1){
            this.current = this.current.parent;
        } else if(step!==-2) {
            if(this.current.children[step-'0']===null){
                let newnode = new TrieNode();
                this.current.children[step-'0'] = newnode;
                newnode.parent = this.current;
            }

            this.current = this.current.children[step-'0'];
        }
        this.res = [];
        this.findAll(this.current);
        return this.res;
    }

    del(number, pos = 0, node = this.root){
        if(pos===number.length-1){
            node.children[number[pos]-'0'] = null;
            return;
        }

        if(node.children[number[pos]-'0']===null){
            return;
        }
        this.del(number, pos+1, node.children[number[pos]-'0']);
    }
}
