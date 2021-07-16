// import the original type declarations
import 'react-i18next';

//import { buttonResource } from "./translations/en/ButtonResource_en.json";

// react-i18next versions higher than 11.11.0
/* declare module 'react-i18next' {
    // and extend them!
    interface CustomTypeOptions {
        // custom namespace type if you changed it
        defaultNS: 'buttons';
        // custom resources type
        resources: {
            buttons: typeof buttonResource;
        };
    };
};
 */



/* // react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: typeof resources['en'];
    };
}; */