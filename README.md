# appointment service

## Description
This service provides a RESTful API built with ExpressJs and TypeScript for managing appointments. It supports creating, viewing, and canceling appointments with configurable time slots and operational parameters.

## How to run
- Rename .env-example to be .env
- update the configuration if needed (e.g: DB connection)
- npm install
- npm run start:dev

## Configuration Parameters
- SLOT_DURATION: Defines the duration of each appointment slot in minutes.
- NUMBER_OF_SLOTS: Specifies the maximum number of slots available for each appointment.
- OPERATIONAL_SUNDAY: JSON string specifying specific operational hours for Sunday.
- OPERATIONAL_MONDAY: JSON string specifying specific operational hours for Monday.
- OPERATIONAL_TUESDAY: JSON string specifying specific operational hours for Tuesday.
- OPERATIONAL_WEDNESDAY: JSON string specifying specific operational hours for Wednesday.
- OPERATIONAL_THURSDAY: JSON string specifying specific operational hours for Thursday.
- OPERATIONAL_FRIDAY: JSON string specifying specific operational hours for Friday.
- OPERATIONAL_SATURDAY: JSON string specifying specific operational hours for Saturday.

You can customize the configuration using environment variables. I have provided examples.

## Tech
- Framework: Express js
- Language: Typescript
- Database: MongoDB

## Endpoints
```
POST /api/v1/appointment: Books an available slot.
GET /api/v1/appointment?date=YYYY-MM-DD: Retrieves available slots for a specific date, default date is today.
DELETE /api/v1/appointment/:id/cancel: Cancels a booked appointment.
```

## Assumption
- User can't check preview day appoitment
- On non-operational days and configured days off (e.g., public holidays), the system will return an empty array.
- Users cannot retrieve or book appointments for past dates. The system only supports viewing and booking appointments for the current and future dates.
- Users can configure the maximum number of slots per appointment.
- Users can configure different operational hours for each day of the week if needed. During these unavailable hours, the system will not return available slots.
- Basic input validation implemented to prevent invalid data from being processed.
- No authentication or authorization mechanisms are assumed for the initial implementation but can be added if required later.
- Calculate available slots based on operational hours and configured settings.
- To optimize database capacity, only save booked slots in the database.

## Simple Diagram
![Image description](/diagram.png)