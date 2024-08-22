import { Component } from '@angular/core';
import { AmortissementService } from '../services/amortissement/amortissement.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-amortissement',
  templateUrl: './amortissement.component.html',
  styleUrls: ['./amortissement.component.scss']
})
export class AmortissementComponent {
  pret: any[] = [];
  selectedCompte: string = '';
  results: any[] = [];
  noResults: boolean = false;
  nooper: string | null = null;
  cliprt: string | null = null;
  dataSource = new MatTableDataSource<any>();
  entetCliData: any;
  marge: number| null = null;
  tof: number| null = null;

  constructor(private amortissemntService: AmortissementService,private http: HttpClient,private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Récupérer le paramètre 'nooper' de l'URL
    this.route.paramMap.subscribe(params => {
          this.nooper = params.get('nooper');
          this.cliprt = params.get('cliprt');
          // Utilisez 'this.nooper' comme nécessaire dans votre composant
        });
    this.amortissemntService.fetchEntetCliData(this.cliprt!, this.nooper!).subscribe(
      data => {
        this.entetCliData=data;
        console.log(data); // Affiche les données dans la console
        // Faites ce que vous voulez avec les données
      },
      error => {
        console.error(error); // Gérez les erreurs
      }
    );

    console.log(this.nooper);
    console.log(this.cliprt);
    this.getamortissement();
  }

  getamortissement() {
    
    const body = {

      nooper: this.nooper,
    };

    this.http.post<any[]>('http://127.0.0.1:8000/api/get-amotissement-by-nooper/', body)
      .subscribe(
        (data) => {
          if (data.length > 0) {
            this.results = data;
            this.marge=this.results[0].MNTINT;
            this.tof=this.results[0].MNTTAXE;
            console.log(this.results[0].MNTINT);
            console.log(this.results[0].MNTTAXE);
            this.results = data.map((cheque, index) => ({ ...cheque, id: index + 1 }));
            this.noResults = false;
          } else {
            this.results = [];
            this.noResults = true;
            
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des données:', error);
        }
      );
}

printTable(): void {
  const printContents = this.generatePrintContent();
  const printWindow = window.open('', '_blank');
  printWindow?.document.write('<html><head><title>Tableau d\'Amortissement</title></head><body>');
  printWindow?.document.write(printContents);
  printWindow?.document.write('</body></html>');
  printWindow?.document.close();
  printWindow?.print();
}

generatePrintContent(): string {
  
  let content = `
  
  <div style="text-align: srtart; margin-bottom: 20px; padding-left:30px">
    <img src="/assets/icons/AUB.png" alt="AUB" width="300px" height="200px" style="max-width: 100px;
    height: auto; margin: 0 auto 15px; overflow: hidden; border-radius: 50%;">
  </div>
  <center><h3>Tableau d\'Amortissement</h3></center>
  <table style="border-collapse: collapse; margin: 0 auto; width: 90%; border: 1px padding:100px">
    <tbody>
    <tr style="margin: auto;padding-top: 10px;display: flex; justify-content: space-between;">
    <td style="margin-bottom: 20px; width: 48%; vertical-align: top;">
      <ul style="list-style-type: none; padding-left: 0;">
        <li><span style="font-size: 14px;font-weight: 500; padding-right:18px">Numéro de dossier:</span>${this.entetCliData[0]?.Numero_Dossier}</li>
        <li><span style="font-size: 14px;font-weight: 510; padding-right:18px">Type De Pret:</span>${this.entetCliData[0]?.Type_De_Pret}</li>
        <li><span style="font-size: 14px;font-weight: 510; padding-right:18px">Date Mis En Place:</span> ${ this.formatDate(this.entetCliData[0]?.date_mep)}</li>
        <li><span style="font-size: 14px;font-weight: 510; padding-right:18px">Date 1ère échéance:</span> ${ this.formatDate(this.entetCliData[0]?.date_1ech)}</li>
        <li><span style="font-size: 14px;font-weight: 510; padding-right:18px">Date Derniere échéance:</span> ${ this.formatDate(this.entetCliData[0]?.date_dern_ech) }</li>
      </ul>
    </td>
    
    <td style="margin-bottom: 20px; width: 48%;text-align: start;padding-left:12%; vertical-align: top;">
      <ul style="list-style-type: none; padding-left: 0;">
        <li><span style="font-size: 14px;font-weight: 500; padding-right:18px">Prix d'Achat(Capital):</span> ${this.formatMontant(this.entetCliData[0]?.prix_achat) }  MRU</li>
        <li><span style="font-size: 14px;font-weight: 500; padding-right:18px">Prix de Vente (HT): </span>${this.formatMontant(this.entetCliData[0]?.prix_vente) } MRU</li>
        <li><span style="font-size: 14px;font-weight: 500; padding-right:18px">Prix de Vente (TTC): </span>${this.formatMontant(this.entetCliData[0]?.prix_vente_TTC)} MRU</li>
        <li><span style="font-size: 14px;font-weight: 500; padding-right:18px">Durée de mourabaha:</span> ${this.entetCliData[0]?.duree_mourabaha} Mois</li>
        <li><span style="font-size: 14px;font-weight: 500; padding-right:18px">TOF:</span> ${this.entetCliData[0]?.TOF}%</li>
      </ul>
    </td>
  </tr>
  
    </tbody>
  </table>

  <table style="border-collapse: collapse; margin: 0 auto; width: 90%; border: 1px solid #000; margin-top: 20px;">
    <thead>
      <tr style="border-bottom: 1px solid #000; text-align: center;">
        <th style="border-right: 1px solid #000; padding: 8px;">Numero</th>
        <th style="border-right: 1px solid #000; padding: 8px;">Date</th>
        <th style="border-right: 1px solid #000; padding: 8px;">Capital</th>
        <th style="border-right: 1px solid #000; padding: 8px;">Marge</th>
        <th style="border-right: 1px solid #000; padding: 8px;">TOF</th>
        <th style="border-right: 1px solid #000; padding: 8px;">Echeance</th>
        <th style="padding: 8px;">Capital Restent Dû</th>
      </tr>
    </thead>
    <tbody>
    `;
    //(amortissement.MNTCAP | number: '1.2-2')?.replace(',', ' ')
  this.results.forEach((item: any, index: number) => {
    content += `
      <tr style="text-align: end;">
        <td style="border-right: 1px solid #000; padding: 8px;">${(item.id )}</td>
        <td style="border-right: 1px solid #000; padding: 8px;">${this.formatDate(item.DATRMB)}</td>
        <td style="border-right: 1px solid #000; padding: 8px;">${this.formatMontant(item.MNTCAP)}</td>
        <td style="border-right: 1px solid #000; padding: 8px;">${this.formatMontant(item.MNTINT)}</td>
        <td style="border-right: 1px solid #000; padding: 8px;">${this.formatMontant(item.MNTTAXE)}</td>
        <td style="border-right: 1px solid #000; padding: 8px;">${this.formatMontant(item.MNTRMB)}</td>
        <td style="padding: 8px;">${this.formatMontant(item.SLDAMO)}</td>
      </tr>`;
    // Add separator after each row, except for the last row
    if (index < this.results.length - 1) {
      content += '<tr><td colspan="7" style="border-top: 1px solid #000;"></td></tr>';
    }
  });
  
  content += `
    </tbody>
  </table>`;
  
  return content;
}


formatDate(dateString: string): string {
  // Assuming dateString is in ISO format, you can use Angular's DatePipe to format it
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

formatMontant(montant: number): string {
  const montantFormate = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(montant);
  return montantFormate;
}
  
}
