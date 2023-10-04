import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('circle', { read: ElementRef }) circle!: ElementRef;
  private step: number = 0;
  private started: boolean = false;
  private animation!: Animation;
  circleSize: number = 0.5;

  constructor(private animationCtrl: AnimationController) { }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.circle.nativeElement)
      .duration(2000)
      .easing('ease-in')
      .keyframes([
        { offset: 0, width: '120px', height: '120px' },
        { offset: 0.72, width: '150px', height: '150px' },
        { offset: 1, width: '180px', height: '180px' },
      ]);

    this.animation.progressStart(false);
    this.started = true;
  }

  play() {
    this.animation.play();
  }

  pause() {
    this.animation.pause();
  }

  stop() {
    this.animation.stop();
  }

  progressAnimation() {
    if (!this.started) {
      this.animation.progressStart(false);
      this.started = true;
    }

    this.step += 0.1;
    this.animation.progressStep(this.step);
  }

  endAnimation(playTo: any) {
    this.animation.progressEnd(playTo, this.step, 2000);
    this.started = false;
    this.step = 0;
  }

  setStep(step: any) {
    if (!this.started) {
      this.animation.progressStart(false);
      this.started = true;
    }

    this.step = step;
    this.animation.progressStep(step);

    const circleElement: HTMLElement = this.circle.nativeElement;
    const newSize = 120 + 60 * step; 
    circleElement.style.width = newSize + 'px';
    circleElement.style.height = newSize + 'px';
  }

  onIonChange(ev: any) {
    this.circleSize = ev.detail.value;
    this.setStep(this.circleSize);
  }
}
