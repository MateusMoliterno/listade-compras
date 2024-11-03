import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../services/shopping-list/shopping-list.service';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl:'./add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itens: Item[] = [];
  itensComprados: Item[] = [];
  addForm: FormGroup;

  constructor(private itemService: ItemService, private formBuilder: FormBuilder) {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.itemService.getItems().subscribe(itens => {
      this.itens = itens;
    });

    this.itemService.getComprados().subscribe(itensComprados => {
      this.itensComprados = itensComprados;
    });
  }

  adicionarItem() {
    if (this.addForm.valid) {
      const novoItem: Item = this.addForm.value;
      this.itemService.addItem(novoItem).subscribe(itemAdicionado => {
        this.itens.push(itemAdicionado);
        this.addForm.reset();
      });
    }
  }

  comprarItem(item: Item) {
    this.itemService.moveItemToComprados(item).subscribe(() => {
      const indice = this.itens.indexOf(item);
      if (indice !== -1) {
        this.itens.splice(indice, 1);
      }

      this.itensComprados.push(item);

      console.log('Item movido para produtos comprados');
    });
  }

  editarItem(item: Item) {
    const novoValor = prompt('Edite o item:', item.name);
    if (novoValor !== null && novoValor.trim()) {
      item.name = novoValor.trim();
      this.itemService.updateItem(item).subscribe(() => {
        console.log('Item atualizado com sucesso');
      });
    }
  }

  removerItem(item: Item) {
    if (item.id) {
      this.itemService.deleteItem(item.id).subscribe(() => {
        const indice = this.itens.indexOf(item);
        if (indice !== -1) {
          this.itens.splice(indice, 1);
        }
      });
    }
  }

  get itensNaoComprados() {
    return this.itens.filter(item => !item.comprado);
  }

  desmarcarItem(item: Item) {
    this.itemService.moveItemToNaoComprados(item).subscribe(() => {
      const indice = this.itensComprados.indexOf(item);
      if (indice !== -1) {
        this.itensComprados.splice(indice, 1);
      }
  
      this.itens.push(item);
  
      console.log('Item movido de produtos comprados para produtos');
    });
  }

  removerItemComprado(item: Item) {
    if (item.id) {
      this.itemService.deleteItemFromComprados(item.id).subscribe(() => {
        const indice = this.itensComprados.indexOf(item);
        if (indice !== -1) {
          this.itensComprados.splice(indice, 1);
        }
        console.log('Item excluído com sucesso da rota produtosComprados');
      });
    }
  }  
}

