import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Trie from './trie.js';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'none',
            text: "",
            words : [],
        };
        this.trie = new Trie();
        this.clickButton = this.clickButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.morty = 9;
    }

    clickButton() {
         this.setState({ mode: 'ready' });
         let poop = this.state.text.split("“").join(" ");
         poop = poop.toLowerCase();
        const words = poop.split(/[ ,.\"-\']+/);
        for(let i = 0; i < words.length; i++){
            this.trie.insert(words[i]);
        }
        for(let i = 0; i < words.length; i++){
            this.state.words.push({name: words[i], num: this.trie.count(words[i])});
        }
    }

     handleChange(event){
         this.setState({text: event.target.value});
     }

     handleSearchChange(event){
         const arrs = [];
         console.log(this.trie.search(event.target.value));
         for(const word of this.trie.search(event.target.value)){
             arrs.push(
                {name: word.name, num: word.count }
             )
         }
         console.log(arrs);
         this.setState({words : arrs});
     }

    renderNone() {

        return (<div className='article'>
            <h1>Please copy and paste your article: </h1>
            <textarea rows="30" cols="100" onChange={this.handleChange}>
                Insert text here.
            </textarea>
            <p><button onClick={this.clickButton} type="button" class="btn btn-primary">Submit!</button></p>
        </div>)
    }

    renderReady() {
        let arr = [];
        for(const word of this.state.words){
            arr.push(
                <div> {word.name} {word.num} </div>
            )
        }

        return (
            <div>
            <p>Search for: </p>
            <input type="text" onChange={this.handleSearchChange}></input>
            <p>Your wordlist: </p>
            {arr}
            </div>
        )
    }


    render() {
        switch (this.state.mode) {
            case 'none':
                return this.renderNone();
                break;
            case 'ready':
                return this.renderReady();
                break;
        }

    }
}