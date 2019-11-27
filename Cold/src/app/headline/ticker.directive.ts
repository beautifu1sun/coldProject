import { Directive, ElementRef, Input, Renderer, OnInit } from '@angular/core';

@Directive({ selector: '[ticker]' })
export class TickerDirective implements OnInit {
    margin: number; // margin of the text nodes which decrements to tick to the left
    interval: any;  // used to kill the setTimout
    firstNode: any; // the node which displays first and without mouseover
    textWidth: number;
    trigger: string;

    @Input('speed') speed: number; // milliseconds between ticks
    @Input('padding-left') paddingLeft: number; // must be equal to the width of parent
    @Input('size') size: number; // font size
    @Input('text') text: any; // rss array

    constructor(private el: ElementRef, private r: Renderer) {}

    initTicker(): void {
        if (this.tickerNeeded()) {
            this.margin = 0;
            this.moveLeft();
        }
    }

    ngOnInit(): void {
        this.trigger = 'auto';
        this.firstNode = this.createTickerNode(this.firstNode, this.text);
        if (this.trigger === 'auto' && this.tickerNeeded()) {
            this.initTicker();
        }
    }

    createTickerNode(self: any, _text: string): any {
        self = this.r.createElement(this.el.nativeElement, 'div');
        this.r.setElementStyle(self, 'padding-left', this.paddingLeft + 'px');
        this.r.setElementStyle(self, 'font-size', this.size + 'px');
        let separator = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        let sepWidth = this.getTextWidth(separator);
        let offset = 0;
        for (let i = 0; i < this.text.length-1; i++) {
            var a = document.createElement('a');
            var linkText = document.createTextNode(this.text[i]['title']);
            a.appendChild(linkText);
            a.href = this.text[i]['link'];
            self.appendChild(a);
            offset += this.getTextWidth(this.text[i]['title']);
            if (i != this.text.length-2) {
                self.innerHTML += separator;
                offset += sepWidth;
            }
        }
        this.textWidth = offset;
        return self;
    }

    moveLeft(): void {
        let resetMargin = (this.textWidth + this.paddingLeft) * -1;
        this.interval = setInterval(() => {
            this.r.setElementStyle(this.firstNode, 'margin-left', this.margin-- + 'px');
            if (this.margin < resetMargin) {
                this.margin = 0;
            }
        }, this.speed);
    }

    getTextWidth(text: String): number {
        let t = this.r.createElement(document.getElementById('ghost'), 'div');
        t.innerHTML = text;
        this.r.setElementStyle(t, 'font-size', this.size + 'px');
        let w = t.offsetWidth;
        t.innerHTML = '';
        return w;
    }

    tickerNeeded(): boolean {
        return this.textWidth > this.el.nativeElement.parentElement.offsetWidth - 2;
    }
}