import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../../../shared/components/common/component-card/component-card.component';
// import { AspectRatioVideoComponent } from '../../components/videos/aspect-ratio-video/aspect-ratio-video.component';
import { SixteenIstoNineComponent } from '../../components/videos/sixteen-isto-nine/sixteen-isto-nine.component';
import { FourIstoThreeComponent } from '../../components/videos/four-isto-three/four-isto-three.component';
import { OneIstoOneComponent } from '../../components/videos/one-isto-one/one-isto-one.component';
import { TwentyoneIstoNineComponent } from "../../components/videos/twentyone-isto-nine/twentyone-isto-nine.component";

@Component({
  selector: 'app-videos',
  imports: [
    PageBreadcrumbComponent,
    ComponentCardComponent,
    // AspectRatioVideoComponent,
    SixteenIstoNineComponent,
    FourIstoThreeComponent,
    OneIstoOneComponent,
    TwentyoneIstoNineComponent
],
  templateUrl: './videos.component.html',
  styles: ``
})
export class VideosComponent {

}
