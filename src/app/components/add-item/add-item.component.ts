import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Item {
  nome: string;
  comprado: boolean;
}

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  itens: Item[] = [];
  novoItem: string = '';

  adicionarItem() {
    if (this.novoItem.trim()) {
      this.itens.push({ nome: this.novoItem.trim(), comprado: false });
      this.novoItem = '';
    }
  }

  editarItem(item: Item) {
    const novoValor = prompt('Edite o item:', item.nome);
    if (novoValor !== null && novoValor.trim()) {
      item.nome = novoValor.trim();
    }
  }

  removerItem(item: Item) {
    const indice = this.itens.indexOf(item);
    if (indice !== -1) {
      this.itens.splice(indice, 1);
    }
  }

  comprarItem(item: Item) {
    item.comprado = !item.comprado;
  }

  get itensNaoComprados() {
    return this.itens.filter(item => !item.comprado);
  }

  get itensComprados() {
    return this.itens.filter(item => item.comprado);
  }
}

