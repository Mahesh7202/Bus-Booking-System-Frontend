import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgForm } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { LoginComponent } from './ZSample/components/common/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './ZSample/components/common/signup/signup.component';
import { NavbarComponent } from './ZSample/components/common/navbar/navbar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BusDetailsComponent } from './ZSample/components/admin/bus-details/bus-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutComponent } from './ZSample/components/admin/admin-layout/admin-layout.component';
import { HomeComponent } from './ZSample/home/home.component';
import { DriverFormComponent } from './ZSample/components/admin/Forms/driver-form/driver-form.component';
import { PassengerFormComponent } from './ZSample/components/admin/Forms/passenger-form/passenger-form.component';
import { BuspathFormComponent } from './ZSample/components/admin/Forms/buspath-form/buspath-form.component';
import { UseraccountFormComponent } from './ZSample/components/admin/Forms/useraccount-form/useraccount-form.component';
import { DriverDetailsComponent } from './ZSample/components/admin/driver-details/driver-details.component';
import { PassengerDetailsComponent } from './ZSample/components/admin/passenger-details/passenger-details.component';
import { BuspathDetailsComponent } from './ZSample/components/admin/buspath-details/buspath-details.component';
import { FilterPipe } from './ZSample/pipe/filter.pipe';
import { SortPipe } from './ZSample/pipe/sort.pipe';
import { AdminTableLayoutComponent } from './ZSample/components/admin/admin-table-layout/admin-table-layout.component';
import { BusFormComponent } from './ZSample/components/admin/Forms/bus-form/bus-form.component';
import { SearchLayoutComponent } from './ZSample/components/user/search-layout/search-layout.component';
import { SearchResultComponent } from './ZSample/components/user/search-result/search-result.component';
import { SeatBookingsComponent } from './ZSample/components/user/seat-bookings/seat-bookings.component';
import { BookingProcessComponent } from './ZSample/components/user/Bookings/booking-process/booking-process.component';
import { UserDetailsComponent } from './ZSample/components/admin/user-details/user-details.component';
import { TooltipComponent } from './ZSample/components/common/helpers/tooltip/tooltip.component';
import { ModalFilterPipe } from './ZSample/pipe/modal-filter.pipe';
import { BusTypeFilterPipe } from './ZSample/pipe/bus-type-filter.pipe';
import { DriverNameFilterPipe } from './ZSample/pipe/driver-name-filter.pipe';
import { CombinedFilterPipe } from './ZSample/pipe/combined-filter.pipe';
import { MultiFilterPipe } from './ZSample/pipe/multi-filter.pipe';
import { SeatDetailsComponent } from './ZSample/components/admin/seat-details/seat-details.component';
import { LowerSeatComponent } from './ZSample/components/common/helpers/lower-seat/lower-seat.component';
import { UpperSeatComponent } from './ZSample/components/common/helpers/upper-seat/upper-seat.component';
import { SeatLayoutComponent } from './ZSample/components/common/helpers/seat-layout/seat-layout.component';
import { BookingsDetailsComponent } from './ZSample/components/admin/bookings-details/bookings-details.component';
import { TicketLayoutComponent } from './ZSample/components/common/helpers/ticket-layout/ticket-layout.component';
import { ShowBookingsComponent } from './ZSample/components/user/Bookings/show-bookings/show-bookings.component';
import { UserLayoutComponent } from './ZSample/components/user/user-layout/user-layout.component';
import { CancelBookingComponent } from './ZSample/components/user/Bookings/cancel-booking/cancel-booking.component';
import { BookingSuccessComponent } from './ZSample/components/user/Bookings/booking-success/booking-success.component';
import { TicketComponent } from './ZSample/components/common/helpers/ticket-layout/ticket/ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SeatLayoutComponent,
    BusDetailsComponent,
    AdminLayoutComponent,
    NavbarComponent,
    SeatDetailsComponent,
    HomeComponent,
    DriverFormComponent,
    PassengerFormComponent,
    BuspathFormComponent,
    UseraccountFormComponent,
    DriverDetailsComponent,
    PassengerDetailsComponent,
    BuspathDetailsComponent,
    FilterPipe,
    SortPipe,
    AdminTableLayoutComponent,
    BusFormComponent,
    SearchLayoutComponent,
    SearchResultComponent,
    SeatBookingsComponent,
    BookingProcessComponent,
    UserDetailsComponent,
    ModalFilterPipe,
    BusTypeFilterPipe,
    DriverNameFilterPipe,
    CombinedFilterPipe,
    MultiFilterPipe,

    LowerSeatComponent,
    UpperSeatComponent,
    BookingsDetailsComponent,
    TicketLayoutComponent,
    ShowBookingsComponent,
    UserLayoutComponent,
    CancelBookingComponent,
    BookingSuccessComponent,
    TicketComponent,
  ],


  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
