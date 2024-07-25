### Tests
Placez-vous dans le répertoire server et lancez la commande "npm run test"

### Lancer le projet en dev ou prod
La configuration actuelle lance le projet en production, il suffit de lancer "docker-compose up --build -d"
Pour lancer en dev, remplacer les lignes "command" des services client et server dans le docker compose :

Prod : 
command: sh -c "npm install && npm run build && npm run start"

Dev :
command: sh -c "npm install && npm run dev"

### Répartition tâches

Gary Neveu :

    Front :
    - Toutes les pages (Design et liaison api et back)
        - Accueil
        - Panier
        - Page Produits
        - Authentification
        - Page 404
        - Pages RGPD
        - ...
    - CRUDS
    - Composants
    - Router
    - Api
    - Panel Administration
    - Stripe

    Back :
    - Gestion des roles et des accès
    - Databases (SQL + Mongo)
    - Config (de la db SQL et Mongo)
    - Denormalization
    - Docker
    - Middlewares
    - Models (SQL et Mongo)
    - Routes
    - Recherche produits et filtres
    - Authentification (Avec JWT)

    - Mise en production

    RGPD :
    - Toutes les pages concernant le RGPD
    - Acquisition nom de domaine
    - Environnement juridique, protection projet
    - Cookie

Mattéo :
- Front authentification
- Recommandation CNIL mot de passe

Huy Hoang :
- Setup du front le projet (la base des pages)
- Setup du back le projet (la base endpoints, mongodb connect, nodejs express)
- Faire des tests du back
