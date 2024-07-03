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

You can customize the configuration using environment variables.

## Tech
- Framework: Express js
- Language: Typescript
- Database: MongoDB