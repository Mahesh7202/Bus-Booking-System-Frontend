import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BusAssignDataDTO } from '../modals/DTo/BusAssignDataDTO';
import { Schedule } from '../modals/schedule';
import { Bus } from '../modals/bus';
import { SeatData, SeatInfo } from '../modals/busSeat';

@Injectable({
  providedIn: 'root',
})
export class SeatHelperService {
  private bookingSeatList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  // updateSeaterMinMax(seatData: any[]) {
  //   console.log(seatData);
  //   // Find the index of the "Seater" seat type in the array
  //   const seaterIndex = seatData.findIndex(
  //     (seat) => seat.seatType === 'Semi-Sleeper'
  //   );

  //   const seaterIndex2 = seatData.findIndex(
  //     (seat) => seat.seatType === 'Seater'
  //   );

  //   if (seaterIndex !== -1) {
  //     // Update the min and max values of "Seater" to match "Semi-Seater"

  //     seatData[seaterIndex].maxSeatNumber = seatData.find(
  //       (seat) => seat.seatType === 'Seater'
  //     )?.maxSeatNumber;
  //   }

  //   if (seaterIndex2 !== -1) {
  //     // Update the min and max values of "Seater" to match "Semi-Seater"

  //     seatData[seaterIndex2].minSeatNumber = seatData.find(
  //       (seat) => seat.seatType === 'Semi-Sleeper'
  //     )?.minSeatNumber;
  //   }



  //   return seatData;
  // }

  prepareAndGenerateSeats(data: SeatData[], fareAmount: number, preSeatStaus: any[]){
    let seatData = this.augmentSeatData(data, fareAmount);
    return this.generateLowerUpperLists(seatData, preSeatStaus)
  }


  generateLowerUpperLists(seatData: SeatData[], preSeatStatus: any[]) {
    // Function to shuffle an array in-place
    function shuffleArray<T>(array: T[]) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    // Function to divide an array into chunks of a specified size
    function chunkArray<T>(array: T[], chunkSize: number): T[][] {
      const chunkedArray: T[][] = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        chunkedArray.push(array.slice(i, i + chunkSize));
      }
      return chunkedArray;
    }

    // Create arrays to store seat information for each type
    const seatInfoByType: { [key: string]: SeatInfo[] } = {};

    // Keep track of used seat numbers
    const usedSeatNumbers: Set<number> = new Set();

    // Generate random seat information
    seatData.forEach((seatTypeData) => {
      const { seatType, totalSeats, price, minSeatNumber, maxSeatNumber } =
        seatTypeData;
      seatInfoByType[seatType] = [];


      for (
        let seatNumber = minSeatNumber;
        seatNumber <= maxSeatNumber;
        seatNumber++
      ) {
        // Check if the seat number is already used
        if (!usedSeatNumbers.has(seatNumber)) {
          seatInfoByType[seatType].push({
            seatNumber: seatNumber,
            seatType: seatType,
            price: price,
            status: this.getSeatStatus(seatNumber, seatType ,preSeatStatus)
          });
          usedSeatNumbers.add(seatNumber); // Mark the seat number as used
        }
      }

      // Shuffle the seat numbers for each type
      shuffleArray(seatInfoByType[seatType]);
    });


    // Divide the Semi-Sleeper and Seater into 4 "Lower" lists
    const semiSeaterSeats = seatInfoByType['Semi-Sleeper'].concat(
      seatInfoByType['Seater']
    );
    shuffleArray(semiSeaterSeats);
    const lowerLists = chunkArray(
      semiSeaterSeats,
      Math.ceil(semiSeaterSeats.length / 4)
    );

    // Divide the Sleeper into 3 "Upper" lists
    const upperSeats = seatInfoByType['Sleeper'];
    shuffleArray(upperSeats);
    const upperLists = chunkArray(upperSeats, Math.ceil(upperSeats.length / 3));

    // Return the lower and upper lists in a single object
    return {
      lower: lowerLists,
      upper: upperLists,
    };
  }



  getSeatStatus(seatNumber: number, seatType: string, preSeatStatus: any) {

    console.log(preSeatStatus)
    if(preSeatStatus){
      // Convert seatNumberToFind to a number by removing "S_L" or "S_U" prefix

      for (const seat of preSeatStatus) {
        const numericSeatNumber = parseInt(seat.seatNumber.replace(/[^\d]/g, ''));

        // Check if the numeric seat number and category match
        if (numericSeatNumber === seatNumber && seatType === seat.category) {
          return seat.status;
        }
      }
    }

      return "available"; // If no match is found
    }



  augmentSeatData(seatData: SeatData[], FareAmount: number): SeatData[] {
    console.log(seatData)
    const basePrice = FareAmount;
    const seaterPriceIncrease = 0; // 5%
    const semiSleeperPriceIncrease = 0.1; // 10%
    const sleeperPriceIncrease = 0.15; // 15%

    let currentMaxSeat = 0;
    let minSeatNumber: number;

    return seatData.map((seatTypeData) => {
      const { seatType, totalSeats } = seatTypeData;

      const priceIncrease =
        seatType === 'Seater'
          ? seaterPriceIncrease
          : seatType === 'Semi-sleeper'
          ? seaterPriceIncrease
          : seatType === 'Sleeper'
          ? semiSleeperPriceIncrease
          : sleeperPriceIncrease;

      let maxSeatNumber: number;

      if (seatType === 'Seater' || seatType === 'Semi-Seater') {
        minSeatNumber = currentMaxSeat + 1;
        maxSeatNumber = minSeatNumber + totalSeats - 1;
      } else {
        minSeatNumber = currentMaxSeat + 1;
        maxSeatNumber = minSeatNumber + totalSeats - 1;
      }

      currentMaxSeat = maxSeatNumber;

      return {
        seatType: seatType,
        totalSeats: totalSeats,
        price: basePrice * (1 + priceIncrease),
        minSeatNumber: minSeatNumber,
        maxSeatNumber: maxSeatNumber,
      };
    });
  }
}
