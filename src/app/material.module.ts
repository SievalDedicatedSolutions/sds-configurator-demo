import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCommonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';

const MATERIAL_MODULES = [
    MatAutocompleteModule, MatBadgeModule,           MatButtonModule,     MatButtonToggleModule, MatCardModule,       MatCheckboxModule,
    MatChipsModule,        MatCommonModule,          MatDatepickerModule, MatDialogModule,       MatExpansionModule,  MatGridListModule,
    MatIconModule,         MatInputModule,           MatListModule,       MatMenuModule,         MatNativeDateModule, MatPaginatorModule,
    MatProgressBarModule,  MatProgressSpinnerModule, MatRadioModule,      MatRippleModule,       MatSelectModule,     MatSidenavModule,
    MatSlideToggleModule,  MatSliderModule,          MatSnackBarModule,   MatSortModule,         MatTableModule,      MatTabsModule,
    MatToolbarModule,      MatTooltipModule,         MatStepperModule
];

@NgModule({imports: MATERIAL_MODULES, exports: MATERIAL_MODULES})
export class MaterialModule {
}
