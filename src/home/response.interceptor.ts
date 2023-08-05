import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Check if the data is an array or a single object
        const isArray = Array.isArray(data);

        // If it's an array, map and transform each item
        if (isArray) {
          return data.map((item) => this.transformItem(item));
        }

        // If it's a single object, transform it directly
        return this.transformItem(data);
      }),
    );
  }

  private transformItem(item: any): any {
    // Include only specific fields (price, landSize, and propertyType)
    const transformedItem = {
      homeId: item.home_id,
      Address: item.address,
      numberOfBedrooms: item.number_of_bedrooms,
      numberOfBathrooms: item.number_of_bathrooms,
      city: item.city,
      listedDate: item.listed_date,
      price: item.price,
      landSize: item.land_size,
      propertyType: item.property_type,
    };

    return transformedItem;
  }
}
