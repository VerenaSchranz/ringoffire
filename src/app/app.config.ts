import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: "ringoffire-6ba87",
          appId: "1:162395523823:web:4b3adf5edaae347067691a",
          storageBucket: "ringoffire-6ba87.appspot.com",
          apiKey: "AIzaSyAJyk50BrjyJSC9h82WCKlvhfHYZ63kN9s",
          authDomain: "ringoffire-6ba87.firebaseapp.com",
          messagingSenderId: "162395523823",
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
