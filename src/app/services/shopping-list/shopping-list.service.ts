import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../interfaces/item';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
  })

  export class ItemService {
  private apiUrl = 'http://localhost:3000/produtos';
  private apiUrlComprados = 'http://localhost:3000/produtosComprados';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${item.id}`, item);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
  moveItemToComprados(item: Item): Observable<Item> {
    return new Observable(observer => {
      this.deleteItem(item.id!).subscribe(() => {
        this.http.post<Item>(this.apiUrlComprados, item).subscribe(
          (res) => {
            observer.next(res);
            observer.complete();
          },
          (error) => observer.error(error)
        );
      });
    });
  }

  getComprados(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrlComprados);
  }

  moveItemToNaoComprados(item: Item): Observable<Item> {
    return this.http.delete<void>(`${this.apiUrlComprados}/${item.id}`).pipe(
    switchMap(() => this.http.post<Item>(this.apiUrl, item)));
  }


  deleteItemFromComprados(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlComprados}/${id}`);
  }

}

