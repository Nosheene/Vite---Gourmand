import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []),
    new Route("/contact", "contact", "/pages/contact.html", ["disconnected"]),
    new Route("/nos_menus", "nos menus", "/pages/nos_menus.html", ["disconnected"], "/js/filter/m-filter.js"),
    new Route("/menu-noel", "Menu de Noël", "/pages/menu-noel.html", []),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "/js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"], "/js/auth/signup.js"),
    new Route("/account", "Mon compte", "/pages/auth/account.html", ["client","admin"]),
    new Route("/editPassword", "Changer mon mot de passe", "/pages/auth/editPassword.html", ["client","admin"]),
    new Route("/reservations", "Vos réservations", "/pages/reservations/allResa.html", ["client"]),
    new Route("/reserver", "Réserver", "/pages/reservations/reserver.html", ["client"]),
];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Vite & Gourmand";