import {NgModule} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatPaginatorModule} from '@angular/material';

@NgModule({
    imports: [
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSelectModule,
        MatButtonModule,
        MatListModule,
        MatDividerModule,
        MatRadioModule,
        MatCheckboxModule,
        MatChipsModule,
        MatButtonToggleModule,
        MatProgressBarModule,
        MatTabsModule,
        MatTableModule,
        DragDropModule
    ],
    exports: [
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSelectModule,
        MatButtonModule,
        MatListModule,
        MatDividerModule,
        MatRadioModule,
        MatCheckboxModule,
        MatChipsModule,
        MatButtonToggleModule,
        MatProgressBarModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        DragDropModule
    ]
})
export class AcmaterialModule {
}
