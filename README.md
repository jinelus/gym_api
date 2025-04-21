## Requisitions fonctionnelles

[x] - Doit pouvoir creer un compte
[x] - Doit pouvoir se connecter
[x] - Doit pouvoir obtenir son profil
[x] - Doit pouvoir modifier son profil
[x] - Doit pouvoir supprimer son compte
[x] - Doit pouvoir obtenir son historique de check ins
[x] - Doit pouvoir chercher les salles de sports les plus proches 
[x] - Doit pouvoir chercher les salles de sport par nom
[x] - Doit pouvoir realiser un check in
[x] - Doit pouvoir valider un check in
[x] - Doit pouvoir enregistrer une salle de sport

## Requistions de regres d'affaires

[x] - L'utilisateur doit etre authentifier pour faire un check in
[x] - l'utilisateur ne doit pas pouvoir creer un compte avec un email deja utilise
[x] - L'utilisateur ne doit pas pouvoir faire 2 check ins dans la meme journee
[x] - L'utlisateur ne doit pas faire pouvoir faire un check in a plus de 100 m de la salle de sport
[x] - Le check in doit etre validé jusqu'à 20 minutes apres sa creation
[x] - Le check in doit etre validé seulement par l'administrateur
[x] - Une salle de sport doit etre enregistrer par l'administrateur

## Requisition non fonctionnelles

[x] - Le mot de passe de l'utilisateur doit etre cryptographié
[x] - Les données de l'utilisateur doivent etre stocké en base de données PostgreSQL
[x] - Toutes les listes de données doivent etre paginées avec une limite de 20 elements par page
[x] - L'utilisateur doit s'authentifier avec un JWT (JSON Web Token)