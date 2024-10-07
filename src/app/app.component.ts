import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddItemComponent } from './components/add-item/add-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titulo = 'teste';
}
