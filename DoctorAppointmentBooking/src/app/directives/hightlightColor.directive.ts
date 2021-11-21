import {Directive, ElementRef, HostListener, Input, Renderer2} from "@angular/core";
import {ScheduleTimingModel} from "../interface/IScheduleTimings/ScheduleTiming.model";
import {ScheduleTimingsService} from "../services/schedule-timings.service";

@Directive({
  selector: `[appHighlight]`
})
export class HightlightColorDirective {
  @Input() schedule:ScheduleTimingModel
  constructor(private el: ElementRef, private renderer: Renderer2,
              private scheduleService:ScheduleTimingsService) { }
  @HostListener('mouseenter')onMouseHover(){
    this.el.nativeElement.style.cursor ='pointer';
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if((event.target as Element).className.length ===0  ||
      (event.target as Element).className === 'timing' ||
      (event.target as Element).className ==='submit-section proceed-btn text-right'){
      if (this.el.nativeElement.contains(event.target)) {
        this.highlight('#42c0fb');
        const storageSchedule =  localStorage.getItem("schedule");
        if(storageSchedule){
          const timings:ScheduleTimingModel = JSON.parse(storageSchedule);
          if(timings.scheduleTimingId !== this.schedule.scheduleTimingId){
            localStorage.setItem("schedule",JSON.stringify(this.schedule));
          }
        }else{
          localStorage.setItem("schedule",JSON.stringify(this.schedule));
        }
      }
      else {
        this.nohighlight('#e9e9e9')
      }
    }else{
      this.nohighlight('#e9e9e9')
      localStorage.removeItem("schedule");
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
