import {Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: `[appHighlight]`
})
export class HightlightColorDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  @HostListener('mouseenter')onMouseHover(){
    this.el.nativeElement.style.cursor ='pointer';
  }

  @HostListener('document:click', ['$event.target'])

  handleClick(event: Event) {
    if (this.el.nativeElement.contains(event)) {
      this.highlight('#42c0fb');
    }
    else {
     this.nohighlight('#e9e9e9')
    }
  }

  highlight(color:any) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
    this.renderer.setStyle(this.el.nativeElement, 'border', '#42c0fb');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');
  }

  nohighlight(color:any) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
    this.renderer.setStyle(this.el.nativeElement, 'border', '#e9e9e9');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#757575');
  }
}
