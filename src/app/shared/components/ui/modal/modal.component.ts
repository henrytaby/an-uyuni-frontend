import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output, OnInit, OnDestroy, OnChanges
} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [
    CommonModule,
  ],
  templateUrl: './modal.component.html',
  styles: ``
})
export class ModalComponent implements OnInit, OnDestroy, OnChanges {

  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Input() className = '';
  @Input() showCloseButton = true;
  @Input() isFullscreen = false;

  private el = inject(ElementRef);

  ngOnInit() {
    if (this.isOpen && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  }

  ngOnChanges() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.isOpen ? 'hidden' : 'unset';
    }
  }

  onBackdropClick() {
    if (!this.isFullscreen) {
      this.closeModal.emit();
    }
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }

 @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen) {
      this.closeModal.emit();
    }
  }
}
