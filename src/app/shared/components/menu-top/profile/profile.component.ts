import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public accordionToggleItemFunction(e: any) {
    const currentClass = e.currentTarget.className;
    const accordionItems: NodeListOf<Element> = window.document.querySelectorAll('div.accordionItem');
    for (let i = 0; i < accordionItems.length; i++) {
      accordionItems[i].className = 'accordionItem close-item';
    }

    let currentAccordionItem = e.currentTarget;
    if (currentClass === 'accordionItem close-item') {
      currentAccordionItem.className = 'accordionItem open';
    } else {
      currentAccordionItem.className = 'accordionItem close-item';
    }
  }


}
