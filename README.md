# Sign-Up Form

A mobile sign-up form built with Expo for CPRG 303. The form validates what the user types, logs the submitted details to the console, and opens a confirmation screen. No accounts are created and no data is stored.

## Tech stack

- [Expo](https://expo.dev) (SDK 58) with TypeScript
- [Expo Router](https://docs.expo.dev/router/introduction/) for navigation
- [React Hook Form](https://react-hook-form.com) for form state
- [Zod](https://zod.dev) for validation, connected through `@hookform/resolvers/zod`

## Running the app

```bash
npm install
npx expo start
```

Then open the app in Expo Go, an Android emulator, an iOS simulator, or a web browser from the menu in the terminal.

## Validation rules

| Field            | Rules                                                              |
| ---------------- | ------------------------------------------------------------------ |
| First name       | Required, 2–30 characters, surrounding spaces trimmed              |
| Last name        | Required, 2–30 characters, surrounding spaces trimmed              |
| Email            | Required, valid email format, surrounding spaces trimmed           |
| Password         | Required, at least 8 characters                                    |
| Confirm password | Required, must match password                                      |

Each error appears under its field, and the field's border turns red. On submit, focus moves to the first invalid field. The "Passwords do not match" check runs as soon as both password fields are valid, even if other fields still have errors.

## How submitting works

1. The user taps **Sign Up**, and the form is checked against the Zod schema.
2. If everything is valid, the first name, last name and email are logged to the console.
3. The app replaces the form with the confirmation screen, which shows "Account created for {first name}!". A **Back to sign up** button returns to a fresh, empty form.

If the confirmation screen is opened without a name (for example, by a web refresh or a deep link), it redirects back to the form.

## Project structure

```
src/
  app/                  Screens (each file is a route)
    _layout.tsx         Stack navigator
    index.tsx           Sign-up form
    confirmation.tsx    Confirmation screen
  components/
    form-field.tsx      Reusable labelled input with error message
    themed-text.tsx     Text that follows light/dark theme
    themed-view.tsx     View that follows light/dark theme
  constants/theme.ts    Colours (light and dark) and spacing
  schemas/
    sign-up-schema.ts   Zod validation rules
```
