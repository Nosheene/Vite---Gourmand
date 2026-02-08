import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/contact", "contact", "/pages/contact.html"),
    new Route("/nos_menus", "nos menus", "/pages/nos_menus.html","/filter/js/menu-filter.js"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html","/js/auth/signup.js"),
    new Route("/account", "Mon compte", "/pages/auth/account.html"),
    new Route("/editPassword", "Changer mon mot de passe", "/pages/auth/editPassword.html"),
    new Route("/reservations", "Vos réservations", "/pages/reservations/allResa.html"),
    new Route("/reserver", "Réserver", "/pages/reservations/reserver.html"),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Vite & Gourmand";