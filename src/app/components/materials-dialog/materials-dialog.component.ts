import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MatTableDataSource} from '@angular/material';
import {Material} from '@sieval/hub-client';

@Component({
  selector: 'sds-materials-dialog',
  templateUrl: './materials-dialog.component.html',
  styleUrls: ['./materials-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MaterialsDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<MaterialsDialogComponent>) {}


  private _materials: Material[] = [];
  set materials(value: Material[]) {
    this._materials = value;
    this.dataSource = new MatTableDataSource(value);
  }
  get materials() {
    return this._materials;
  }

  dataSource: MatTableDataSource<Material> = new MatTableDataSource();

  displayedColumns = [
    'description',
    'color',
    'salePrice',
  ];

  selectedMaterial: Material;


  ngOnInit() {}

  onSelect(material: Material) {
    this.dialogRef.close(material);
  }

  getColor(material: Material) {
    return material.displayProperties
        .find(dp => dp.description.toLowerCase() === 'color')
        .value;
  }
}
