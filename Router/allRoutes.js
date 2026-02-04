import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/contact", "contact", "/pages/contact.html"),
    new Route("/nos_menus", "nos menus", "/pages/nos_menus.html"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Vite & Gourmand";