import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './ZSample/components/common/signup/signup.component';
import { HomeComponent } from './ZSample/home/home.component';
import { AdminLayoutComponent } from './ZSample/components/admin/admin-layout/admin-layout.component';
import { DriverDetailsComponent } from './ZSample/components/admin/driver-details/driver-details.component';
import { DriverFormComponent } from './ZSample/components/admin/Forms/driver-form/driver-form.component';
import { PassengerDetailsComponent } from './ZSample/components/admin/passenger-details/passenger-details.component';
import { PassengerFormComponent } from './ZSample/components/admin/Forms/passenger-form/passenger-form.component';
import { BuspathDetailsComponent } from './ZSample/components/admin/buspath-details/buspath-details.component';
import { BuspathFormComponent } from './ZSample/components/admin/Forms/buspath-form/buspath-form.component';
import { BusFormComponent } from './ZSample/components/admin/Forms/bus-form/bus-form.component';
import { BusDetailsComponent } from './ZSample/components/admin/bus-details/bus-details.component';
import { SearchLayoutComponent } from './ZSample/components/user/search-layout/search-layout.component';
import { SearchResultComponent } from './ZSample/components/user/search-result/search-result.component';
import { SeatBookingsComponent } from './ZSample/components/user/seat-bookings/seat-bookings.component';
import { BookingProcessComponent } from './ZSample/components/user/Bookings/booking-process/booking-process.component';
import { UserDetailsComponent } from './ZSample/components/admin/user-details/user-details.component';
import { UseraccountFormComponent } from './ZSample/components/admin/Forms/useraccount-form/useraccount-form.component';
import { SeatDetailsComponent } from './ZSample/components/admin/seat-details/seat-details.component';
import { BookingsDetailsComponent } from './ZSample/components/admin/bookings-details/bookings-details.component';
import { TicketLayoutComponent } from './ZSample/components/common/helpers/ticket-layout/ticket-layout.component';
import { LoginComponent } from './ZSample/components/common/login/login.component';
import { ShowBookingsComponent } from './ZSample/components/user/Bookings/show-bookings/show-bookings.component';
import { UserLayoutComponent } from './ZSample/components/user/user-layout/user-layout.component';
import { CancelBookingComponent } from './ZSample/components/user/Bookings/cancel-booking/cancel-booking.component';
import { BookingSuccessComponent } from './ZSample/components/user/Bookings/booking-success/booking-success.component';



const routes: Routes = [

{path: "", component: HomeComponent},

{
  path: 'admin',
  component: AdminLayoutComponent,
  children: [
    {path: 'driver-details', component: DriverDetailsComponent},
    {path: 'driver-details/add', component: DriverFormComponent},
    {path: 'driver-details/edit/:id', component: DriverFormComponent},


    {path: 'passenger-details', component: PassengerDetailsComponent},
    {path: 'passenger-details/add', component: PassengerFormComponent},
    {path: 'passenger-details/edit/:id', component: PassengerFormComponent},


    {path: 'buspath-details', component: BuspathDetailsComponent},
    {path: 'buspath-details/add', component: BuspathFormComponent},
    {path: 'buspath-details/edit/:id', component: BuspathFormComponent},



    {path: 'bus-details', component: BusDetailsComponent},
    {path: 'bus-details/add', component: BusFormComponent},
    {path: 'bus-details/edit/:id/:busID', component: BusFormComponent},

    {path: 'user-details', component: UserDetailsComponent},
    {path: 'user-details/add', component: UseraccountFormComponent},
    {path: 'user-details/edit/:id/:userID', component: UseraccountFormComponent},

    {path: 'seat-details', component: SeatDetailsComponent},
    {path: 'booking-details', component: BookingsDetailsComponent},



  ]
},
{
  path: 'user',
  component: UserLayoutComponent,
  children: [
    {path: 'bus-ticket-book/show-tickets', component: ShowBookingsComponent },
    {path: 'bus-ticket-book/cancel-ticket', component: CancelBookingComponent },

  ]
},

  {path: 'bus-ticket/:source/:destination/:onDate', component: SearchLayoutComponent},
  {path: 'bus-ticket-book/:scheduleID/:busID', component: BookingProcessComponent },
  {path: 'bus-ticket/success/:bookingID', component: BookingSuccessComponent},
  {path:"login",component: LoginComponent},
  {path:"signup",component: SignupComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
