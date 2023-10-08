import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PassengerService } from 'src/app/ZSample/services/passenger.service';
import { HelperService } from 'src/app/ZSample/services/helper.service';
import { TicketService } from 'src/app/ZSample/services/ticket.service';
import { Ticket } from 'src/app/ZSample/modals/ticket';
import { BookingService } from 'src/app/ZSample/services/booking.service';
import { CreditCard } from 'src/app/ZSample/modals/creditCard';
import { CreditCardService } from 'src/app/ZSample/services/credit-card.service';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { SeatService } from 'src/app/ZSample/services/seat.service';
import { BusseatService } from 'src/app/ZSample/services/busseat.service';
import { AuthService } from 'src/app/ZSample/services/auth.service';

@Component({
  selector: 'app-booking-process',
  templateUrl: './booking-process.component.html',
  styleUrls: ['./booking-process.component.css']
})
export class BookingProcessComponent {

  passengerForms: FormGroup[] = [];
  creditCardForm!: FormGroup;
  ticketDetailsForm!: FormGroup;


  bookingID!: number;
  isAccordion2Collapsed: boolean = false
  isAccordion1Collapsed: boolean = false

  scheduleID!: number;
  creditCardID!: number;
  busID!: number;
  userId!: number;

  items: number[] = [1, 2, 3]; // Your accordion items
  itemStates: { [key: number]: boolean } = {}; // Object to track open/closed state

  ticketIDs: any[] = [];

  isEditMode = false;

  bookedSeats: any[] = [];

  allDone: boolean = false;


  deleteItem(index: number): void {
    this.items.splice(index, 1);
    delete this.itemStates[index];
  }




  toggleAccordion(index: number): void {
    console.log(this.itemStates)

    this.itemStates[index] = !this.itemStates[index]; // Toggle the item's state
    console.log(this.itemStates)

  }


  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private passengerService: PassengerService,
    private ticketService: TicketService,
    private creditCardService: CreditCardService,
    private bookingService: BookingService,
    private busSeatService: BusseatService,
    private seatService: SeatService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {

  }




  areAllFormsValid() {
    return (
      this.passengerForms.every(form => form.valid) &&
      this.creditCardForm.valid &&
      this.ticketDetailsForm.valid
    );
  }



  ngOnInit(): void {

    let stored = this.authService.getUserId();
    if(stored){
      this.userId = parseInt(stored);
    }


    this.route.params.subscribe((params) => {
      this.scheduleID = params['scheduleID']
      console.log(this.scheduleID)
      this.busID = params['busID']
    });




    this.getBookingSeatsData();



    for (let i = 0; i < this.bookedSeats.length; i++) {
      this.passengerForms[i] = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
        gender: ['male', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        contactNumber: ['', Validators.pattern(/^\d{10}$/)],
      });
    }

    // Initialize the second row form
    this.creditCardForm = this.formBuilder.group({
      cardHolderFullName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expireYear: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      expireMonth: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      balance: [2000, [Validators.required]]
    });

    this.ticketDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
      emailID: ['', [Validators.required, Validators.email]],
      sendCopy: [false],
    });


    this.items.forEach((item, index) => {
      this.itemStates[index] = true;
    });

  }

  onCardNumberInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Check if the input exceeds 16 characters
    if (inputValue.length > 16) {
      // Remove the extra characters
      inputElement.value = inputValue.slice(0, 15);
    }
  }

  getBookingSeatsData(){
    this.helperService.getbookingSeatList().subscribe((data) => {
      this.bookedSeats = data;
      console.log(data)
    });

  }


  // onSubmit() {
  //   if (this.passengerForms.valid) {
  //     console.log('Driver updated successfully');

  //     const passengerData = this.passengerForms.value;
  //     if (this.isEditMode) {
  //       // passengerData['passengerID'] = this.passengerID

  //       this.passengerService.updatePassenger(passengerData).subscribe(() => {
  //         console.log('Driver updated successfully');
  //         // Optionally, navigate back to driver list or any other page
  //         this.goBack()
  //       });
  //     } else {
  //       // Add driver data if in add mode
  //       this.passengerService.addPassenger(passengerData).subscribe(() => {
  //         console.log('Driver added successfully');
  //         this.goBack()
  //         // Optionally, navigate back to driver list or any other page

  //       });
  //     }
  //   }
  // }

  toggleSendCopy() {
    // Get the current value of the 'sendCopy' form control
    const currentSendCopyValue = this.ticketDetailsForm.get('sendCopy')?.value;
    this.ticketDetailsForm.get('sendCopy')?.setValue(!currentSendCopyValue);
  }



  onSubmit(): void {
    console.log("sdfdfhsdfhjsdhfkjsdhfkjds")

    // if(this.areAllFormsValid()){
    // Handle form submissions here
    const firstRowFormValues = this.passengerForms.map((form) => form.value);


    const secondRowFormValue = this.creditCardForm.value;
    const thirdRowFormValues = this.ticketDetailsForm.value;

    // this.passengerService.addPassengers(firstRowFormValues).subscribe((data) =>{
    //   console.log("passenger are booked successfully");
    //   console.log(data)
    //   data.forEach((id, index) => {

    //     const ticket: Ticket = {
    //       PassengerID: id,
    //       ScheduleID: this.scheduleID,
    //       SeatNumber: this.bookedSeats[index].seatNumber,
    //       FareAmount: this.bookedSeats[index].seatPrice,
    //       BookingTime: new Date(),
    //       Status: "booked"
    //     }

    //     this.ticketService.createTicket(ticket).subscribe((id) => {
    //       console.log("Ticket are booked",id)
    //       this.ticketIDs.push(id);
    //     });

    //   })

    // });


    // const creditCard: CreditCard = {
    //   userID: 1,
    //   cardNumber: secondRowFormValue.cardNumber,
    //   expireYear: secondRowFormValue.expireYear,
    //   expireMonth: secondRowFormValue.expireMonth,
    //   cvc: secondRowFormValue.cvc,
    //   cardHolderFullName: secondRowFormValue.cardHolderFullName,
    //   balance: secondRowFormValue.balance
    // }

    // this.creditCardService.createCreditCard(creditCard).subscribe((id) =>{

    //   const booking: any ={
    //     userID: 1,
    //     creditCardID: id,
    //     bookingTime: new Date(),
    //     totalAmount: this.getTotalAmount(),
    //     ticketIDs: this.ticketIDs
    //   }

    //   this.bookingService.createBookingWithTickets(booking).subscribe(() => {
    //     console.log("Payment and booking sucessfull")
    //   })


    // })



    // Import switchMap from RxJS

// ...

this.passengerService.addPassengers(firstRowFormValues).pipe(
  switchMap((data) => {
    console.log("Passengers are booked successfully");
    console.log(data);

    // Collect passenger IDs and create tickets
    const ticketObservables = data.map((id, index) => {
      console.log(this.scheduleID);

      const ticket: Ticket = {
        PassengerID: id,
        ScheduleID: this.scheduleID,
        SeatNumber: this.bookedSeats[index].seatNumber,
        FareAmount: this.bookedSeats[index].seatPrice,
        BookingTime: new Date(),
        Status: "booked",
      };

      console.log(ticket)
      return this.ticketService.createTicket(ticket);
    });

    // Use forkJoin to wait for all ticket creations to complete
    return forkJoin(ticketObservables);
  }),
  switchMap((ticketIDs) => {
    // Now that tickets are created, proceed with credit card and booking
    const creditCard: CreditCard = {
      userID: this.userId,
      cardNumber: secondRowFormValue.cardNumber,
      expireYear: secondRowFormValue.expireYear,
      expireMonth: secondRowFormValue.expireMonth,
      cvc: secondRowFormValue.cvc,
      cardHolderFullName: secondRowFormValue.cardHolderFullName,
      balance: secondRowFormValue.balance,
    };

    // Create a credit card and then create a booking with tickets
    return this.creditCardService.createCreditCard(creditCard).pipe(
      switchMap((creditCardId) => {
        const booking: any = {
          userID: this.userId,
          creditCardID: creditCardId,
          bookingTime: new Date(),
          totalAmount: this.getTotalAmount(),
          ticketIDs: ticketIDs,
        };

        console.log(booking)

        // Create a booking with associated tickets
        return this.bookingService.createBookingWithTickets(booking).pipe(
          switchMap((bookingId) => {
            this.bookingID = bookingId;
            return this.bookingService.getBookingWithDetailsByBookingId(bookingId).pipe(
              switchMap((booking) => {


               const res = this.helperService.transformBookingDataForBookingIdForOne(booking);
               let email = res.email;
               console.log(thirdRowFormValues.sendCopy)


               if(thirdRowFormValues.sendCopy){
                email.push(thirdRowFormValues.emailID)
               }else{
                email = []
                email.push(thirdRowFormValues.emailID);
               }

               email = [...new Set(email)];
               return this.bookingService.sendBookingDataForMail(res.bookingDataList, email);              })
            );
          })
        );
      })
    );

  })
).subscribe(() => {
  console.log("Payment and booking successful");
  const seatNumbers = this.bookedSeats.map(item => item.seatNumber);
  const seatTypes = this.bookedSeats.map(item => item.seatType);
  this.seatService.bookSeats(this.scheduleID, this.busID, seatNumbers).subscribe(()=>{
    this.busSeatService.reduceSeats(this.busID, seatTypes).subscribe(() => {
      console.log("completed finally");
      this.allDone = true;

      this.router.navigate(['/bus-ticket-book/success', this.bookingID]);
    })
  })
});







    // Combine and process the form data as needed
    console.log('First Row Form Data:', firstRowFormValues);
    console.log('Second Row Form Data:', secondRowFormValue);
    console.log('third Row Form Data:', thirdRowFormValues);

    // }
    // You can send the combined data to an API or perform other actions here
  }

  getTotalAmount(){
    let totalAmount = 0;

    for (const seat of this.bookedSeats) {
      totalAmount += seat.seatPrice;
    }

    return totalAmount;

  }

  goBack() {
    this.location.back();
  }


  ngOnDestory(){
    if(!this.allDone){
      const seatNumbers = this.bookedSeats.map(item => item.seatNumber);
      const seatTypes = this.bookedSeats.map(item => item.seatType);

      this.seatService.cancelBooking(this.scheduleID, this.busID, seatNumbers).subscribe(() =>{
        this.busSeatService.increaseSeats(this.busID, seatTypes).subscribe(() => {
          console.log("booking failed all the bus seat are realeased which are in hold");
        })
      })
    }
  }


}




