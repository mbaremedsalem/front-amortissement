import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss']
})
export class DossierComponent {
  loginInProgress = false;
  selectedClient: string = '';
  selectedCompte: string = '';
  results: any[] = [];
  noResults: boolean = false;
  token: string | null | undefined;
  
  constructor(private http: HttpClient,private router: Router) {}

  search() {
    if (this.selectedClient && this.selectedCompte) {
      this.loginInProgress = true; 
      const body = {
        cliprt: this.selectedClient,
        nooper: this.selectedCompte
      };
      this.http.post<any[]>('http://127.0.0.1:8000/api/get-pret-cli-compte/', body)
        .subscribe(
          (data) => {
            if (data.length > 0) {
              this.results = data;
              this.noResults = false;
              this.loginInProgress = false;
            } else {
              this.results = [];
              this.noResults = true;
              this.loginInProgress = false;
            }
          },
          (error) => {
            console.error('Erreur lors de la récupération des données:', error);
          }
        );
    } else if(this.selectedClient && this.selectedCompte==='') { 
      const body = {
        cliprt: this.selectedClient,
      };
      this.http.post<any[]>('http://127.0.0.1:8000/api/get-pret-cli/', body)
      .subscribe(
        (data) => {
          if (data.length > 0) {
            this.results = data;
            this.noResults = false;
            this.loginInProgress = false;
          } else {
            this.results = [];
            this.noResults = true;
            this.loginInProgress = false;
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des données:', error);
          this.loginInProgress = false;
        }
      );
    }else {
      console.error('Veuillez remplir les champs client et compte.');
      this.loginInProgress = false;
    }
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('access');
  }
  logout() {
    // Appel de la méthode de déconnexion du service d'authentification
    this.removeToken();

    // Redirigez l'utilisateur vers la page de connexion ou toute autre page appropriée après la déconnexion.
    // Vous pouvez utiliser le routeur Angular pour cela.
    this.router.navigate(['/login']);
  }
  goToDetails(nooper: string,cliprt: string) {
    // Navigation vers la page 'amortissement' avec le paramètre nooper
    this.router.navigate(['/amortissement', nooper,this.selectedClient]);
  }
}
