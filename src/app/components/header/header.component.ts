import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  private headerElement?: HTMLElement | null;
  private wordList: string[] = [
    "HTML",
    "CSS",
    "Bootstrap",
    "JavaScript",
    "Angular",
    "Node.JS",
    "Express.JS",
    "C#",
    ".NET"
  ];

  ngOnInit(): void {
    this.typewriter();
    this.typewriter();
    this.typewriter();
  }

  private typewriter() {
    this.headerElement = document.querySelector("header");

    let newWordElement = this.generateWordElement();
    this.headerElement?.append(newWordElement);
    this.writeWord(this.chooseWord(), newWordElement);
  }

  private generateRandomNumber(max: number, min = 0): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private generateWordElement() {
    let word = document.createElement("p");
    let posX = this.generateRandomNumber(this.headerElement!.clientWidth);
    let posY = this.generateRandomNumber(this.headerElement!.clientHeight);

    word.classList.add("header-word");
    word.style.position = "absolute";
    word.style.top = `${posY}px`;
    word.style.left = `${posX}px`;
    word.style.margin = `0`;
    word.style.opacity = "1";
    word.style.transition = "opacity 5s";

    return word;
  }

  private chooseWord() {
    let randomNumber = this.generateRandomNumber(this.wordList.length - 1);
    return this.wordList[randomNumber];
  }

  private writeWord(word: string, element: HTMLElement, counter = 1) {
    let time = this.generateRandomNumber(300, 100);

    setTimeout(() => {
      element.innerText = word.slice(0, counter);
      counter++;

      if (element.style.opacity != "0") {
        element.style.opacity = "0";
      }

      if (counter <= word.length) {
        this.writeWord(word, element, counter);
      } else {
        setTimeout(() => {
          element.remove();
        }, 7000);

        let newWordElement = this.generateWordElement();
        this.headerElement?.append(newWordElement);
        this.writeWord(this.chooseWord(), newWordElement);
      }

    }, time);
  }
}
