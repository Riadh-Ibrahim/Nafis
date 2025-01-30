import { NgModule } from '@angular/core';
import { LucideAngularModule, Bell, Menu, Activity, Thermometer, Heart, Save, AlertCircle, X, Home, Info, Package, Phone, DollarSign, Stethoscope } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({ Bell,Menu,Activity,Thermometer,Heart,Save,AlertCircle,X,Home,Info,Package,Phone,DollarSign,Stethoscope}) // Fournit l'icône Bell
  ],
  exports: [
    LucideAngularModule // Exporte le module pour qu'il soit utilisable ailleurs
  ]
})
export class IconsModule {}